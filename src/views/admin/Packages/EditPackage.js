import ArrowBackButton from 'components/Buttons/ArrowBackButton';
import LoadingDialog from 'components/Dialogs/LoadingDialog';
import { Messages } from 'primereact/messages';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { onEdit } from 'reducers/packageReducer';
import updatePackageRepository from 'repository/package/updatePackageRepository';
import FormPackage from './FormPackage';

export default function EditPackage() {
  const [isLoading, setIsLoading] = useState(false);
  const messages = useRef(null);

  const { id } = useParams();
  const couponPackages = useSelector((state) => state.packages.data);
  const dispatch = useDispatch();

  const handlerSubmit = async (event, data) => {
    event.preventDefault();//prevent screen loading
    setIsLoading(true);
    let packages = structuredClone(couponPackages);
    let items = packages.filter((filter) => filter.id === id);

    items[0].couponDiscountPackage.items = data.packageDiscounts;
    await updatePackageRepository(data)
      .then((result) => {
        messages.current.show({
          severity: 'success',
          detail: 'Update Package Successfully',
          life: 6000,
        });

        dispatch(onEdit(items[0]));
      })
      .catch((err) => {
        messages.current.show({
          severity: 'error',
          detail: err.errors[0].message,
          sticky: true,
        });
      });
    setIsLoading(false);
  };

  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg border-0 px-3'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex '>
            <ArrowBackButton />{' '}
            <h6 className='ml-3 text-blueGray-700 text-xl font-bold'>
              Edit Package
            </h6>
          </div>
        </div>
        <div className='flex-auto px-4 lg:px-10 py-10 bg-white mt-8'>
          <Messages ref={messages} />
          <LoadingDialog visible={isLoading} />
          <FormPackage id={id} isEdit={true} handlerSubmit={handlerSubmit} />
        </div>
      </div>
    </>
  );
}
