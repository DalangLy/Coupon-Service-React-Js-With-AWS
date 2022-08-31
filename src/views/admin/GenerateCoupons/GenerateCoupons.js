import React from 'react';

import { onNextPageSales, fetchSales } from 'reducers/saleReducer';
// components
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { useHistory } from 'react-router-dom';
import BreadCrumb from 'components/Navbars/Breadcrumb';
import CustomDataTable from 'components/Datatables/CustomDataTable';
import { Column } from 'primereact/column';
import DateFilterTemplate from 'components/Datatables/DateFilterTemplate';
import RedirectSmallButton from 'components/Buttons/RedirectSmallButton';
import shortid from 'shortid';
import ShowButton from 'components/Datatables/ShowButton';
import { GenerateCouponStatus } from 'config/constants/';

export default function GenerateCoupons() {
  let sales = useSelector((state) => state.sales);
  const history = useHistory();
  const dispatch = useDispatch();

  const filter = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    customer: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    'coupons.name': {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    remaining: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    createdAt: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
  };

  const actionViewSaleTemplate = (rowData) => {
    return (
      <ShowButton
        onClick={() => {
          history.push('/admin/sales/' + rowData.id);
        }}
      />
    );
  };

  const remainingCouponTemplate = (rowData) => {
    return rowData?.remaining;
  };

  const bodyApproved = (rowData) => {
    const color =
      rowData.status === GenerateCouponStatus.APPROVED
        ? 'green'
        : rowData.status === GenerateCouponStatus.PENDING
        ? 'orange'
        : 'red';
    return (
      <React.Fragment>
        <span
          className={`bg-${color}-100 text-${color}-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-${color}-200 dark:text-${color}-900`}
        >
          {rowData.status}
        </span>
      </React.Fragment>
    );
  };

  const bodyDateTemplate = (data) => {
    return data?.createdAt?.split('T')[0];
  };

  const loadMoreData = () => {
    dispatch(onNextPageSales(sales.nextToken));
  };

  const refreshData = () => {
    dispatch(fetchSales());
  };

  return (
    <>
      <div className='flex flex-wrap px-3'>
        <div className='relative flex flex-col min-w-0 break-words w-full shadow-sn rounded-lg bg-blueGray-100 border-0'>
          <div className='rounded-t bg-white mb-0 px-6 py-6'>
            <div className='text-center flex justify-between'>
              <BreadCrumb paths={['Generate Coupon']} />
              <Link to={'/admin/generate-coupon/create'}>
                <RedirectSmallButton text='new Generate Coupon'></RedirectSmallButton>
              </Link>
            </div>
          </div>
        </div>
        <div className='w-full mt-6  px-0'>
          <CustomDataTable
            moreColumns={[
              <Column
                key={shortid()}
                header='Customer'
                field='customer'
                sortable
              />,
              <Column
                key={shortid()}
                header='Remaining'
                field='remaining'
                filterField='remaining'
                sortable
                body={remainingCouponTemplate}
              />,

              <Column
                key={'Approval'}
                header='Approval'
                style={{ minWidth: '10rem' }}
                body={bodyApproved}
                filterElement={DateFilterTemplate}
              />,
              <Column
                key={'createdAt'}
                header='Created At'
                style={{ minWidth: '10rem' }}
                body={bodyDateTemplate}
                sortable
                sortField='createdAt'
                filterElement={DateFilterTemplate}
              />,
              <Column
                key={shortid()}
                header='Action'
                dataType='date'
                style={{ minWidth: '10rem' }}
                body={actionViewSaleTemplate}
              />,
            ]}
            loading={sales.isLoading}
            data={sales.data}
            filter={filter}
            nextToken={sales.nextToken}
            onLoadData={loadMoreData}
            onRefresh={refreshData}
          />
        </div>
      </div>
    </>
  );
}
