import React, { useRef, useState } from 'react';
import shortid from 'shortid';

// components
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { useHistory } from 'react-router-dom';
import BreadCrumb from 'components/Navbars/Breadcrumb';
import CustomDataTable from 'components/Datatables/CustomDataTable';
import deleteCouponRepository from 'repository/coupon/deleteCouponRepository';
import { onRemoveCoupon } from 'reducers/couponReducer';
import { ConfirmDialog } from 'primereact/confirmdialog';
import RedirectSmallButton from 'components/Buttons/RedirectSmallButton';
import { Column } from 'primereact/column';
import LoadingDialog from 'components/Dialogs/LoadingDialog';
import { onNextPageCoupons, fetchCoupons } from 'reducers/couponReducer';

export default function Coupons() {
  const coupons = useSelector((state) => state.coupons);
  const history = useHistory();
  const toast = useRef(null);
  const [delCoupon, setDeleteCoupon] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const filter = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    shortcut: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    price: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    period: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  };

  function deleteCoupon(coupon) {
    setDeleteCoupon(coupon);
  }

  async function acceptDelete() {
    setLoading(true);
    dispatch(onRemoveCoupon(delCoupon));
    setDeleteCoupon(null);
    await deleteCouponRepository(delCoupon);
    setLoading(false);
    toast.current.show({
      severity: 'success',
      summary: 'Deleted Successfully',
      sticky: true,
    });
  }

  const priceTemplate = (data) => <span>${data.price.toFixed(2)}</span>;
  const periodTemplate = (data) => (
    <span>{data.period > 0 ? data.period + ' Months' : '-'} </span>
  );

  const loadMoreData = () => {
    dispatch(onNextPageCoupons({}, coupons.nextToken));
  };
  const refreshData = () => {
    dispatch(fetchCoupons());
  };

  return (
    <>
      <div className='flex flex-wrap px-3'>
        <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-sn rounded-lg  border-0'>
          <div className='rounded-t bg-white mb-0 px-6 py-6'>
            <div className='text-center flex justify-between'>
              <BreadCrumb paths={['Coupons ']} />

              <Link to={'/admin/coupons/create'}>
                <RedirectSmallButton text='New Coupon '></RedirectSmallButton>
              </Link>
            </div>
          </div>
        </div>

        <LoadingDialog visible={loading} />

        {/*  Dialog */}
        <ConfirmDialog
          visible={delCoupon === null ? false : true}
          onHide={() => setDeleteCoupon(null)}
          message='Are you sure you want to delete?'
          header='Delete'
          icon='pi pi-trash'
          acceptClassName='p-button-danger text-black'
          accept={() => acceptDelete()}
          reject={() => {}}
        />

        <Toast ref={toast} />
        <div className='w-full mb-12 px-0 h-full'>
          <CustomDataTable
            data={coupons.data}
            loading={coupons.isLoading}
            nextToken={coupons.nextToken}
            onLoadData={loadMoreData}
            onRefresh={refreshData}
            filter={filter}
            dataColumns={[
              {
                header: 'Name',
                field: 'name',
                sortable: true,
                filter: true,
              },
              {
                header: 'Shortcut',
                field: 'shortcut',
                sortable: true,
                filter: true,
              },
            ]}
            moreColumns={[
              <Column
                key={shortid.generate()}
                header={'Price'}
                body={priceTemplate}
                sortable
                filter
                field='price'
                style={{
                  width: '25%',
                }}
              ></Column>,
              <Column
                key={shortid.generate()}
                header={'Periods'}
                body={periodTemplate}
                style={{
                  minWidth: '9rem',
                }}
                filter
                sortable
                field='period'
              ></Column>,
            ]}
            handlerShow={(data) => history.push('/admin/coupons/' + data.id)}
            handlerEdit={(data) => {
              history.push('/admin/coupons/edit/' + data.id);
            }}
            handlerDelete={deleteCoupon}
          />
        </div>
      </div>
    </>
  );
}
