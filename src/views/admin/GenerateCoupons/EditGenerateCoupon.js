import ArrowBackButton from 'components/Buttons/ArrowBackButton';
import LoadingDialog from 'components/Dialogs/LoadingDialog';
import { Messages } from 'primereact/messages';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { onEdit } from 'reducers/saleReducer';
import updatePackageRepository from 'repository/package/updatePackageRepository';
import FormGenerateCoupon from './FormGenerateCoupon';

export default function EditGenerateCoupon() {
  const [isLoading, setIsLoading] = useState(false);
  const messages = useRef(null);

  const { id } = useParams();
  const dispatch = useDispatch();

  const handlerSubmit = async (event, data) => {
    event.preventDefault();
    setIsLoading(true);

    await updatePackageRepository(data)
      .then((result) => {
        messages.current.show({
          severity: 'success',
          // summary: 'Success Message',
          detail: 'Update Package Successfully',
          life: 6000,
        });
        dispatch(onEdit(result.data.getSaleCoupon));
      })
      .catch((err) => {
        messages.current.show({
          severity: 'error',
          // summary: 'Success Message',
          detail: err.errors[0].message,
          sticky: true,
        });
      });
    setIsLoading(false);
  };

  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex '>
            <ArrowBackButton />{' '}
            <h6 className='ml-3 text-blueGray-700 text-xl font-bold'>
              Edit Coupon Type
            </h6>
          </div>
        </div>
        <div className='flex-auto px-4 lg:px-10 py-10 pt-0 mt-8'>
          <Messages ref={messages} />
          <LoadingDialog visible={isLoading} />
          <FormGenerateCoupon
            id={id}
            isLoading={isLoading}
            isEdit={true}
            handlerSubmit={handlerSubmit}
          />
        </div>
      </div>
    </>
  );
}
