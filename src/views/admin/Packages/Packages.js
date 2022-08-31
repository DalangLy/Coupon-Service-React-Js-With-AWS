import React, { useRef, useState } from 'react';

import { onNextPagePackages, fetchPackages } from 'reducers/packageReducer';

// components
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { useHistory } from 'react-router-dom';
import BreadCrumb from 'components/Navbars/Breadcrumb';
import CustomDataTable from 'components/Datatables/CustomDataTable';
import { onRemove } from 'reducers/packageReducer';
import { ConfirmDialog } from 'primereact/confirmdialog';
import deletePackageRepository from 'repository/package/deletePackageRepository';
import RedirectSmallButton from 'components/Buttons/RedirectSmallButton';
import LoadingDialog from 'components/Dialogs/LoadingDialog';

export default function Coupons() {
  const packages = useSelector((state) => state.packages);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const toast = useRef(null);
  const [delCoupon, setDeleteCoupon] = useState(null);
  const dispatch = useDispatch();

  const filter = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    'coupons.name': {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    quantity: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    createdAt: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
  };

  function deleteCoupon(coupon) {
    setDeleteCoupon(coupon);
  }

  async function acceptDelete() {
    dispatch(onRemove(delCoupon));
    setDeleteCoupon(null);
    setIsLoading(true);
    await deletePackageRepository(delCoupon);
    setIsLoading(false);
    toast.current.show({
      severity: 'success',
      summary: 'Deleted Successfully',
      // detail: response.message,
      life: 6000,
    });
  }

  const loadMoreData = () => {
    dispatch(onNextPagePackages({}, packages.nextToken));
  };
  const refreshData = () => {
    dispatch(fetchPackages());
  };

  return (
    <>
      <div className='flex flex-wrap px-3'>
        <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-sn rounded-lg  border-0'>
          <div className='rounded-t bg-white mb-0 px-6 py-6'>
            <div className='text-center flex justify-between'>
              <BreadCrumb paths={['Package']} />

              <Link to={'/admin/packages/create'}>
                <RedirectSmallButton text='Create Package' />
              </Link>
            </div>
          </div>
        </div>

        <LoadingDialog visible={isLoading} />
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
        <div className='w-full mb-12 px-0'>
          <CustomDataTable
            dataColumns={[
              {
                header: 'Name',
                field: 'name',
                sortable: true,
              },
              {
                header: 'Coupon',
                field: 'coupons.name',
                sortable: true,
              },
              {
                header: 'Quantity',
                field: 'quantity',
                sortable: true,
                dataType: 'numeric',
              },
            ]}
            loading={packages.isLoading}
            data={packages.data}
            filter={filter}
            nextToken={packages.nextToken}
            onLoadData={loadMoreData}
            onRefresh={refreshData}
            handlerShow={(data) => {
              history.push('/admin/packages/' + data.id);
            }}
            handlerEdit={(data) => {
              history.push('/admin/packages/edit/' + data.id);
            }}
            handlerDelete={(data) => {
              deleteCoupon(data);
            }}
          />
        </div>
      </div>
    </>
  );
}
