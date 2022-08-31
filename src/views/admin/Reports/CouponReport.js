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
  fetchReportSerialCoupon,
  filterReportSerialCoupon,
  onNextPageReportSerialCoupon,
} from 'reducers/serialCouponReportReducer';
import { Dropdown } from 'primereact/dropdown';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Link } from 'react-router-dom';
import CloudButton from 'components/Buttons/CloudButton';

export default function CouponReport() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [filters, setFilters] = useState({});

  const loading = useSelector((state) => state.reportSerialCoupon.isLoading);
  const reports = useSelector((state) => state.reportSerialCoupon);
  const coupons = useSelector((state) => state.coupons);
  const dispatch = useDispatch();

  useEffect(() => {
    async function init() {
      dispatch(fetchReportSerialCoupon(filters));
    }
    if (loading) init();
  }, []);

  //
  const filter = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    couponSerialCodeCouponId: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    createdAt: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    dateValidEnd: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    deletedAt: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
  };

  const dateExpiredStart = (rowData) => {
    return formatDate(new Date(rowData.createdAt));
  };

  const dateExpiredDate = (rowData, data) => {
    return rowData.dateValidEnd === null
      ? '-'
      : formatDate(new Date(rowData.dateValidEnd));
  };

  const dateIssueDateTemplate = (rowData, data) => {
    return rowData.deletedAt === null
      ? '-'
      : formatDate(new Date(rowData.deletedAt));
  };

  const formatDate = (value) => {
    return value.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const onCustomPage = (event) => {
    if (event.rows !== rows) {
      dispatch(fetchReportSerialCoupon());
    }

    if (event.pageCount - event.page === 1) {
      dispatch(onNextPageReportSerialCoupon(filters, rows, reports.nextToken));
    }
    setFirst(event.first);
    setRows(event.rows);
  };

  const couponDataCell = (rowData) => {
    return rowData?.coupon?.name;
  };

  const onFilterDataTable = (data) => {
    setFilters(data);
    dispatch(filterReportSerialCoupon(data));
  };

  const couponCodeBodyTemplate = (rowData) => {
    return (
      <>
        <div>
          <Link to={'/admin/qrcode/' + rowData.code}>
            <span
              onClick={() => {}}
              className={`${
                rowData?.deletedAt
                  ? 'bg-red-200'
                  : 'hover:underline underline-offset-1'
              } text-center hover:cursor-pointer `}
            >
              {rowData?.code}
            </span>
          </Link>

          <div
            className='tooltip ml-3 pi pi-clone text-gray-500 hover:cursor-pointer'
            onClick={() => navigator.clipboard.writeText(rowData?.code)}
          >
            <span className='tooltiptext'>Copy</span>
          </div>
        </div>
      </>
    );
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

  const totalRemaining = () => {
    let total = 0;
    for (let serialCoupon of reports.data) {
      if (
        serialCoupon.deletedAt === null ||
        serialCoupon.deletedAt === undefined
      ) {
        ++total;
      }
    }

    return total;
  };

  const totalUsed = () => {
    let total = 0;
    for (let serialCoupon of reports.data) {
      if (serialCoupon.deletedAt !== null) {
        ++total;
      }
    }
    return total;
  };

  let footerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer='Total Used:'
          colSpan={5}
          footerStyle={{ textAlign: 'right' }}
        />
        <Column footer={totalUsed} />
      </Row>
      <Row>
        <Column
          footer='Total Remaining:'
          colSpan={5}
          footerStyle={{ textAlign: 'right' }}
        />
        <Column footer={totalRemaining} />
      </Row>
    </ColumnGroup>
  );

  const exportExcel = () => {
    import('xlsx').then((xlsx) => {
      const data = reports.data.map((value) => {
        return {
          Code: value.code,
          'Coupon Type': value.coupon.name,
          'Expired Date':
            value.dateValidEnd === null
              ? '-'
              : value.dateValidEnd.split('T')[0],
          'Issue Date':
            value.deletedAt === null ? '-' : value.deletedAt.split('T')[0],
          'Created At': value.createdAt.split('T')[0],
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

  const header = (
    <div className='table-header-container'>
      <div className='flex flex-wrap w-full'>
        <div className='w-full lg:w-6/12 px-4'> Coupon Reports</div>
        <div className='w-full lg:w-6/12 px-4 text-right'>
          <CloudButton
            icon='pi-refresh'
            onClick={() => {
              dispatch(fetchReportSerialCoupon());
            }}
          />
          <CloudButton
            disabled={reports.nextToken === null ? true : false}
            onClick={() => {
              dispatch(
                onNextPageReportSerialCoupon(filters, null, reports.nextToken)
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

  const rowClass = (data) => {
    return {
      'row-accessories': data.deletedAt !== null,
    };
  };

  return (
    <>
      <div className='flex flex-wrap'>
        <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-sn rounded-lg bg-blueGray-100 border-0'>
          <div className='rounded-t bg-white mb-0 px-6 py-6'>
            <div className='text-center flex justify-between'>
              <BreadCrumb paths={['Reports', 'Serial Coupon']} />
            </div>
          </div>
        </div>

        <div className='w-full mb-12 px-0'>
          <DataTable
            value={reports.data}
            responsiveLayout='scroll'
            dataKey='id'
            header={header}
            rowClassName={rowClass}
            filters={filter}
            filterDisplay='menu'
            paginator
            paginatorTemplate={PaginatorTemplate}
            first={first}
            rows={rows}
            onPage={onCustomPage}
            paginatorClassName='justify-content-end'
            loading={loading}
            onFilter={onFilterDataTable}
            footerColumnGroup={footerGroup}
          >
            <Column style={{ width: '3em' }} />
            <Column field='code' body={couponCodeBodyTemplate} header='Code' />
            <Column
              header='Coupon'
              body={couponDataCell}
              filterField='couponSerialCodeCouponId'
              sortField='coupon.name'
              filter
              sortable
              filterElement={couponFilterTemplate}
            />
            <Column
              header='Expired Date'
              filterField='dateValidEnd'
              dataType='date'
              body={dateExpiredDate}
              filterElement={DateFilterTemplate}
              filter
              sortField='dateValidEnd'
              sortable
              field='date'
            />

            <Column
              header='Used Date'
              filterField='deletedAt'
              dataType='date'
              sortField='deletedAt'
              body={dateIssueDateTemplate}
              filterElement={DateFilterTemplate}
              filter
              sortable
              field='date'
            />
            <Column
              header='Issued Date'
              filterField='createdAt'
              dataType='date'
              sortField='createdAt'
              body={dateExpiredStart}
              filterElement={DateFilterTemplate}
              filter
              sortable
              field='date'
            />
          </DataTable>
        </div>
      </div>
    </>
  );
}
