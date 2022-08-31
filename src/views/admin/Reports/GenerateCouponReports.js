import React, { useEffect, useState } from 'react';

// components
import { useDispatch, useSelector } from 'react-redux';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import BreadCrumb from 'components/Navbars/Breadcrumb';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { DataTable } from 'primereact/datatable';
import PaginatorTemplate from 'components/Datatables/PaginatorTemplate';
import DateFilterTemplate from 'components/Datatables/DateFilterTemplate';
import { Dropdown } from 'primereact/dropdown';
import {
  fetchSalesReport,
  filterSalesReport,
  nextPageSalesReport,
} from 'reducers/saleReportReducer';
import CloudButton from 'components/Buttons/CloudButton';

export default function GenerateCouponReport() {
  const [customers, setCustomers] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [generateCouponDetail, setGenerateCouponDetail] = useState(null);
  const [filters, setFilters] = useState({});

  const sales = useSelector((state) => state.generateCouponReport);
  const couponPackages = useSelector((state) => state.packages.data);
  const users = useSelector((state) => state.users.data);

  const dispatch = useDispatch();

  useEffect(() => {
    if (sales.loading) dispatch(fetchSalesReport(filters));
    if (users.length > 0) {
      const userCustomers = users.filter((e) => e.groups.includes('Guests'));
      setCustomers(userCustomers);
    }
  }, [users]);

  const filter = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    saleCouponPackageId: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    saleCouponOwnerId: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    price: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },

    createdAt: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
  };

  const dateBodyTemplate = (rowData) => {
    return formatDate(new Date(rowData.createdAt));
  };

  const formatDate = (value) => {
    return value.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };
  const header = (
    <div className='table-header-container'>
      <div className='flex flex-wrap w-full'>
        <div className='w-full lg:w-6/12 px-4'> Generate Coupon Reports</div>
        <div className='w-full lg:w-6/12 px-4 text-right'>
          <CloudButton
            icon='pi-refresh'
            onClick={() => {
              dispatch(fetchSalesReport({}));
            }}
          />
          <CloudButton
            disabled={sales.nextToken === null ? true : false}
            onClick={() => {
              dispatch(nextPageSalesReport(filters, null, sales.nextToken));
            }}
          />

          <button
            type='button'
            onClick={() => {
              exportExcel();
            }}
            className='text-green-400 border border-green-400 hover:bg-green-600 hover:text-white rounded-lg text-md px-5 py-2 text-center mr-2 mb-2 ease-in duration-100'
          >
            Export As Excel
          </button>
        </div>
      </div>
    </div>
  );

  const total = () => {
    let total = 0;
    for (let sale of sales.data) {
      const subTotal = sale.price * sale.quantity;
      total += subTotal - (sale.discount * subTotal) / 100;
    }

    return formatCurrency(total);
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  let footerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer='Totals:'
          colSpan={6}
          footerStyle={{ textAlign: 'right' }}
        />
        <Column footer={total} />
      </Row>
    </ColumnGroup>
  );

  const onCustomPage = async (event) => {
    if (event.rows !== rows) {
      dispatch(fetchSalesReport(null, event.rows));
    } else if (event.pageCount - event.page === 1) {
      dispatch(nextPageSalesReport(filters, rows, sales.nextToken));
    }

    setFirst(event.first);
    setRows(event.rows);
  };

  const priceTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const totalTemplate = (rowData) => {
    return formatCurrency(rowData.price * rowData.quantity);
  };

  const discountTemplate = (rowData) => {
    return rowData.discount === 0 ? '-' : rowData.discount;
  };

  const couponPackageFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={couponPackages}
        onChange={(e) => {
          options.filterCallback(e.value);
        }}
        // itemTemplate={statusItemTemplate}
        placeholder='Select a Coupon'
        className='p-column-filter'
        optionLabel='name'
        optionValue='id'
      />
    );
  };

  const customerFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={customers}
        onChange={(e) => {
          options.filterCallback(e.value);
        }}
        // itemTemplate={statusItemTemplate}
        placeholder='Select Customer'
        className='p-column-filter'
        optionLabel='name'
        optionValue='id'
      />
    );
  };

  const exportExcel = () => {
    import('xlsx').then((xlsx) => {
      let data = {};
      let totalRows = 0;
      let index = 3;
      data['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }];

      for (let saleIndex = 0; saleIndex < sales.data.length; saleIndex++) {
        const sale = sales.data[saleIndex];
        const serials = sale.serialCoupons.items;
        totalRows += sale.serialCoupons.items.length;
        const customer = sale?.owner?.firstName + ' ' + sale?.owner?.lastName;
        const accountInformation = `Name : ${customer} \nPhone : ${sale.owner.phone} \nCompany : ${sale.owner.company}  \nAddress : ${sale.owner.companyAddress}`;

        //
        data['!merges'] = [
          ...data['!merges'],
          // column B3
          { s: { r: index, c: 1 }, e: { r: totalRows + 2, c: 1 } },
          // column D3
          { s: { r: index, c: 5 }, e: { r: totalRows + 2, c: 5 } },
          { s: { r: index, c: 6 }, e: { r: totalRows + 2, c: 6 } },
        ];
        data['B' + (index + 1)] = { t: 's', v: sale.package.name };
        data['F' + (index + 1)] = { t: 's', v: sale.createdAt.split('T')[0] };
        data['G' + (index + 1)] = { t: 's', v: accountInformation };
        for (let serialIndex = 0; serialIndex < serials.length; serialIndex++) {
          const i = ++index;
          data['A' + i] = { t: 's', v: i - 3 };
          data['C' + i] = { t: 's', v: serials[serialIndex].code };
          data['D' + i] = { t: 's', v: serials[serialIndex].coupon.name };
          data['E' + i] = {
            t: 's',
            v:
              serials[serialIndex].dateValidEnd === null
                ? ''
                : serials[serialIndex].dateValidEnd.split('T')[0],
          };
        }
      }

      data['!ref'] = 'A1:G' + totalRows + 3;
      data['A1'] = { t: 's', v: 'Coupon Support Digital Serial Code' };
      data['A3'] = { t: 's', v: 'No' };
      data['B3'] = { t: 's', v: 'Package' };
      data['C3'] = { t: 's', v: 'Coupon Serial Number' };
      data['D3'] = { t: 's', v: 'Coupon Type' };
      data['E3'] = { t: 's', v: 'Expired Date' };
      data['F3'] = { t: 's', v: 'Issue Date' };
      data['G3'] = { t: 's', v: 'Account Information' };

      const workbook = { Sheets: { data: data }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });

      saveAsExcelFile(excelBuffer, 'generate-coupon-report');
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const onRowSelect = (event) => {
    setGenerateCouponDetail(event.data);
  };

  const onRowUnselect = (event) => {
    setGenerateCouponDetail(null);
  };

  const customerBodyTemplate = (row) => {
    return row?.owner?.firstName + ' ' + row?.owner?.lastName;
  };

  const packageBodyTemplate = (row) => {
    return row?.package?.name;
  };

  console.log(sales)
  return (
    <>
      <div className='flex flex-wrap'>
        <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-sn rounded-lg bg-blueGray-100 border-0'>
          <div className='rounded-t bg-white mb-0 px-6 py-6'>
            <div className='text-center flex justify-between'>
              <BreadCrumb paths={['Reports', 'Generate Coupon']} />
            </div>
          </div>
        </div>
        {/*  Dialog */}

        <div className='w-full mb-12 px-0'>
          <div className='flex flex-wrap w-full'>
            <div className='w-full lg:w-9/12'>
              <DataTable
                value={sales.data}
                responsiveLayout='scroll'
                dataKey='id'
                header={header}
                filters={filter}
                filterDisplay='menu'
                footerColumnGroup={footerGroup}
                paginator
                paginatorTemplate={PaginatorTemplate}
                first={first}
                rows={rows}
                onPage={onCustomPage}
                selectionMode='single'
                selection={generateCouponDetail}
                onSelectionChange={(e) => {}}
                onRowSelect={onRowSelect}
                onRowUnselect={onRowUnselect}
                loading={sales.loading}
                paginatorClassName='justify-content-end'
                onFilter={(dataFilters) => {
                  setFilters(dataFilters);
                  dispatch(filterSalesReport(dataFilters, rows, null));
                }}
              >
                <Column style={{ width: '3em' }} />
                <Column
                  header='Coupon Package'
                  filterField='saleCouponPackageId'
                  filterElement={couponPackageFilterTemplate}
                  // field='couponPackage'
                  body={packageBodyTemplate}
                  filter
                />
                <Column
                  header='Customer'
                  body={customerBodyTemplate}
                  filter
                  filterField='saleCouponOwnerId'
                  filterElement={customerFilterTemplate}
                />
                <Column
                  // field='price'
                  body={priceTemplate}
                  header='Price'
                  sortable
                  filterField='price'
                  filter
                />
                <Column body={discountTemplate} header='Discount' sortable />
                <Column body={totalTemplate} header='Total' sortable />

                <Column
                  body={dateBodyTemplate}
                  header='Issued Date'
                  dataType='date'
                  filterField='createdAt'
                  sortable
                  filter
                  sortField='createdAt'
                  filterElement={DateFilterTemplate}
                />
              </DataTable>
            </div>
            <div className='w-full lg:w-3/12 '>
              <div className='w-full mx-3 px-4 py-8 bg-white rounded h-full'>
                <div className='fex flex-wrap'>
                  <div className='w-10/12 font-medium'>
                    Generate Coupon Report Detail
                  </div>
                  <div className='w-2/12 font-medium'>
                    {generateCouponDetail?.saleCouponApproverId
                      ? 'Approved'
                      : 'Pending'}
                  </div>
                </div>
                <hr className='border-dashed border-b border-gray-200 my-3' />
                <div className='h-4/5 flex'>
                  {generateCouponDetail !== null ? (
                    <div className='w-full'>
                      <div className='flex flex-wrap'>
                        <div className='w-6/12 my-1'>Total Serial Coupon</div>
                        <div className='w-6/12  my-1 truncate '>
                          : {generateCouponDetail?.totalCouponSerialCodeAmount}
                        </div>
                        <div className='w-6/12 my-1'>
                          Remaining Serial Coupon
                        </div>
                        <div className='w-6/12  my-1 truncate '>
                          :{' '}
                          {generateCouponDetail?.totalCouponSerialCodeAmount -
                            generateCouponDetail?.totalCouponSerialCodeUsed}
                        </div>
                      </div>
                      <hr className='border-dashed border-b border-gray-200 my-3' />
                      <div className='w-full lg:w-12/12 font-medium my-1'>
                        Account Detail
                      </div>
                      <div className='flex flex-wrap'>
                        <div className='w-3/12 my-1 text-medium'>Name</div>
                        <div className='w-9/12  my-1 truncate '>
                          :{' '}
                          {generateCouponDetail?.owner?.firstName +
                            ' ' +
                            generateCouponDetail?.owner?.lastName}
                        </div>
                        <div className='w-3/12 my-1'>Job Title</div>
                        <div className='w-9/12  my-1 truncate '>
                          : {generateCouponDetail?.owner?.jobTitle}
                        </div>
                        <div className='w-3/12 my-1'>Tel</div>
                        <div className='w-9/12  my-1 truncate '>
                          : {generateCouponDetail?.owner?.phone}
                        </div>
                        <div className='w-3/12 my-1'>Company</div>
                        <div className='w-9/12  my-1 truncate '>
                          : {generateCouponDetail?.owner?.company}
                        </div>
                        <div className='w-3/12 my-1'>Address</div>
                        <div className='w-9/12  my-1 truncate '>
                          : {generateCouponDetail?.owner?.companyAddress}
                        </div>
                      </div>
                      <hr className='border-dashed border-b border-gray-200 my-3' />
                      <div className='w-full lg:w-12/12 font-medium'>
                        Package Detail
                      </div>
                      <div className='flex flex-wrap'>
                        <div className='w-3/12 my-1 text-medium'>Name</div>
                        <div className='w-9/12  my-1 truncate '>
                          : {generateCouponDetail?.package?.name}
                        </div>
                        <div className='w-3/12 my-1'>Coupon</div>
                        <div className='w-9/12  my-1 truncate '>
                          : {generateCouponDetail?.package?.coupons?.name}
                        </div>
                        <div className='w-3/12 my-1'>Quantity</div>
                        <div className='w-9/12  my-1 truncate '>
                          : {generateCouponDetail?.package?.quantity}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='self-center text-center w-full'>
                      No Data
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
