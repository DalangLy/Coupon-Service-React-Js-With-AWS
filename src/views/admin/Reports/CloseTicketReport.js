import React, { useEffect, useState } from 'react';

// components
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import BreadCrumb from 'components/Navbars/Breadcrumb';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import PaginatorTemplate from 'components/Datatables/PaginatorTemplate';
import DateFilterTemplate from 'components/Datatables/DateFilterTemplate';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCloseTicketReports,
  filterCloseTicketReports,
  onNextPageCloseTicketReports,
} from 'reducers/closeTicketReportReducer';
import { Dropdown } from 'primereact/dropdown';
import CloudButton from 'components/Buttons/CloudButton';

export default function CloseTicketReport() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [filters, setFilters] = useState({});
  const [resolvers, setResolvers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [closeTicketReportDetail, setCloseTicketReportDetail] = useState(null);
  const [toggleDetail, setToggleDetail] = useState(true);
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.reportCloseTicket.isLoading);
  const coupons = useSelector((state) => state.coupons);
  const reportCloseTickets = useSelector((state) => state.reportCloseTicket);
  const auth = useSelector((state) => state.auth.userType);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (isLoading) dispatch(fetchCloseTicketReports());
    if (users.data.length > 0) {
      const userResolvers = users.data.filter(
        (e) => e.groups.includes('Sales') || e.groups.includes('Supports')
      );
      const userCustomers = users.data.filter((e) =>
        e.groups.includes('Guests')
      );
      setResolvers(userResolvers);
      setCustomers(userCustomers);
    }
  }, [users]);
  //

  //
  const filter = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    couponAppliedCouponId: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    couponAppliedApplierId: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },

    coupon: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    owner: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    couponAppliedResolverId: {
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
        <div className='w-full lg:w-6/12 px-4'> Close Coupon Reports</div>
        <div className='w-full lg:w-6/12 px-4 text-right'>
          <CloudButton
            icon='pi-refresh'
            onClick={() => {
              dispatch(fetchCloseTicketReports());
            }}
          />
          <CloudButton
            disabled={reportCloseTickets.nextToken === null ? true : false}
            onClick={() => {
              dispatch(
                onNextPageCloseTicketReports(
                  filters,
                  null,
                  reportCloseTickets.nextToken
                )
              );
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

  const onCustomPage = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const couponFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={coupons.data}
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

  const resolverFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={resolvers}
        onChange={(e) => {
          options.filterCallback(e.value);
        }}
        // itemTemplate={statusItemTemplate}
        placeholder='Select a Resolver'
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
        placeholder='Select customer'
        className='p-column-filter'
        optionLabel='name'
        optionValue='id'
      />
    );
  };

  const exportExcel = () => {
    import('xlsx').then((xlsx) => {
      const data = reportCloseTickets.data.map((value) => {
        return {
          Code: value?.serialCoupon?.code,
          'Coupon Type': value.coupon?.name,
          Owner:
            value.serialCoupon?.owner?.firstName +
            ' ' +
            value?.serialCoupon?.owner?.lastName,
          Customer: value.applier?.firstName + ' ' + value?.applier?.lastName,
          Resolver: value.resolver?.firstName + ' ' + value?.resolver?.lastName,
          Note: value.note,
          IssueDate:
            value.issueDate !== undefined || value.issueDate !== null
              ? value.issueDate.split('T')[0]
              : '-',
        };
      });

      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });

      saveAsExcelFile(excelBuffer, 'serial-coupon-report');
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
    setCloseTicketReportDetail(event.data);
  };

  const onRowUnselect = (event) => {
    setCloseTicketReportDetail(null);
  };

  const resolverDataTemplate = (data) =>
    data?.resolver?.firstName + ' ' + data?.resolver?.lastName;

  const customerDataTemplate = (data) => data?.applier?.firstName + ' ' + data?.applier?.lastName;

  return (
    <>
      <div className='flex flex-wrap'>
        <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-sn rounded-lg bg-blueGray-100 border-0'>
          <div className='rounded-t bg-white mb-0 px-6 py-6'>
            <div className='text-center flex justify-between'>
              <BreadCrumb paths={['Reports', 'Close Coupon']} />
            </div>
          </div>
        </div>

        <div className='w-full mb-12 px-0 flex flex-wrap'>
          <div className='w-full lg:w-9/12'>
            <DataTable
              value={reportCloseTickets.data}
              responsiveLayout='scroll'
              dataKey='id'
              header={header}
              filters={filter}
              filterDisplay='menu'
              paginator
              paginatorTemplate={PaginatorTemplate}
              first={first}
              rows={rows}
              onPage={onCustomPage}
              paginatorClassName='justify-content-end'
              loading={isLoading}
              selectionMode='single'
              selection={closeTicketReportDetail}
              onSelectionChange={(e) => {}}
              onRowSelect={onRowSelect}
              onRowUnselect={onRowUnselect}
              onFilter={(dataFilters) => {
                setFilters(dataFilters);
                dispatch(filterCloseTicketReports(dataFilters));
              }}
            >
              <Column style={{ width: '3em' }} />
              <Column field='serialCoupon.code' header='Code' />

              {auth.includes('Supports') ? null : (
                <Column
                  body={resolverDataTemplate}
                  header='Resolver'
                  filterField='couponAppliedResolverId'
                  sortField='resolver'
                  filter
                  sortable
                  filterElement={resolverFilterTemplate}
                />
              )}

              <Column
                body={customerDataTemplate}
                header='Customer'
                filter
                sortable
                filterField='couponAppliedApplierId'
                sortField='couponAppliedApplierId'
                filterElement={customerFilterTemplate}
              />

              <Column
                body={dateBodyTemplate}
                header='Used Date'
                dataType='date'
                filterField='createdAt'
                filter
                sortable
                sortField='createdAt'
                filterElement={DateFilterTemplate}
              />
            </DataTable>
          </div>
          <div className={`w-full lg:w-3/12 transition-width`}>
            <div className='w-full mx-3 px-4 py-8 bg-white rounded h-full'>
              <div className='flex '>
                <h3 className='font-medium'>Close Ticket Report Detail</h3>
              </div>

              <hr className='border-dashed border-b border-gray-200 my-3' />
              <div className='h-4/5 flex'>
                {closeTicketReportDetail !== null ? (
                  <div className='w-full'>
                    <div className='flex flex-wrap'>
                      <div className='w-4/12 my-1'>Serial Code</div>
                      <div className='w-8/12  my-1 truncate '>
                        : {closeTicketReportDetail?.serialCoupon.code}
                      </div>
                      <div className='w-4/12 my-1'>Coupon</div>
                      <div className='w-8/12  my-1 truncate '>
                        : {closeTicketReportDetail?.coupon?.name}
                      </div>
                      <div className='w-4/12 my-1'>Used Date</div>
                      <div className='w-8/12  my-1 truncate '>
                        : {closeTicketReportDetail?.createdAt.split('T')[0]}
                      </div>
                      <div className='w-4/12 my-1'>Description :</div>
                    </div>
                    <div className='w-12/12  my-1 truncate '>
                      {closeTicketReportDetail?.note}
                    </div>
                    <hr className='border-dashed border-b border-gray-200 my-3' />
                    <div className='w-full lg:w-12/12 font-medium my-1'>
                      Account Detail
                    </div>
                    <div className='flex flex-wrap'>
                      <div className='w-3/12 my-1 text-medium'>Name</div>
                      <div className='w-9/12  my-1 truncate '>
                        :{' '}
                        {closeTicketReportDetail?.applier?.firstName +
                          ' ' +
                          closeTicketReportDetail?.applier?.lastName}
                      </div>
                      <div className='w-3/12 my-1'>Job Title</div>
                      <div className='w-9/12  my-1 truncate '>
                        : {closeTicketReportDetail?.applier?.jobTitle}
                      </div>
                      <div className='w-3/12 my-1'>Tel</div>
                      <div className='w-9/12  my-1 truncate '>
                        : {closeTicketReportDetail?.applier?.phone}
                      </div>
                      <div className='w-3/12 my-1'>Company</div>
                      <div className='w-9/12  my-1 truncate '>
                        : {closeTicketReportDetail?.applier?.company}
                      </div>
                      <div className='w-3/12 my-1'>Address</div>
                      <div className='w-9/12  my-1 truncate '>
                        : {closeTicketReportDetail?.applier?.companyAddress}
                      </div>
                    </div>
                    <hr className='border-dashed border-b border-gray-200 my-3' />
                    <div className='w-full lg:w-12/12 font-medium'>
                      Resolver Detail
                    </div>
                    <div className='flex flex-wrap'>
                      <div className='w-3/12 my-1 text-medium'>Name</div>
                      <div className='w-9/12  my-1 truncate '>
                        :{' '}
                        {closeTicketReportDetail?.resolver?.firstName +
                          ' ' +
                          closeTicketReportDetail?.resolver?.lastName}
                      </div>
                      <div className='w-3/12 my-1'>Name</div>
                      <div className='w-9/12  my-1 truncate '>
                        : {closeTicketReportDetail?.resolver?.phone}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='self-center text-center w-full'>No Data</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
