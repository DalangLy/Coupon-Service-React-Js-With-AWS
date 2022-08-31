import ArrowBackButton from 'components/Buttons/ArrowBackButton';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Messages } from 'primereact/messages';
import { onAddOneItem } from 'reducers/packageReducer';
import FormPackage from './FormPackage';
import createPackageRepository from 'repository/package/createPackageRepository';
import LoadingDialog from 'components/Dialogs/LoadingDialog';

export default function CreateCoupon() {
  const [isLoading, setIsLoading] = useState(false);
  const messages = useRef(null);
  const dispatch = useDispatch();

  const handlerSubmit = async (event, data) => {
    event.preventDefault();
    setIsLoading(true);
    await createPackageRepository(data)
      .then((result) => {
        messages.current.show({
          severity: 'success',
          detail: 'Create Coupon Successfully',
          sticky: true,
        });
        dispatch(onAddOneItem(result.data.getPackage));
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
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6  rounded-lg  border-0 px-3'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex '>
            <ArrowBackButton />
            <h6 className='ml-3 text-blueGray-700 text-xl font-bold'>
              Create Package
            </h6>
          </div>
        </div>
        <div className='flex-auto px-4 lg:px-10 py-10  mt-8 bg-white'>
          <div className='px-4'>
            <Messages ref={messages}></Messages>
          </div>

          <LoadingDialog visible={isLoading} />

          <FormPackage handlerSubmit={handlerSubmit} />
        </div>
      </div>
    </>
  );
}
