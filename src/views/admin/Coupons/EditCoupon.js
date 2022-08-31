import ArrowBackButton from 'components/Buttons/ArrowBackButton';
import LoadingDialog from 'components/Dialogs/LoadingDialog';
import { Messages } from 'primereact/messages';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { onUpdateCoupon } from 'reducers/couponReducer';
import updateCouponRepository from 'repository/coupon/updateCouponRepository';
import FormCoupon from './FormCoupon';

export default function EditCoupon() {
  const [isLoading, setIsLoading] = useState(false);
  const messages = useRef(null);

  const { id } = useParams();
  const dispatch = useDispatch();

  const handlerSubmit = async (event, coupon) => {
    event.preventDefault();
    setIsLoading(true);

    const body = {
      id: coupon.id,
      name: coupon.name,
      shortcut: coupon.shortcut,
      description: coupon.description,
      price: coupon.price,
      period: coupon.periodNumber,
    };

    await updateCouponRepository(body)
      .then((result) => {
        messages.current.show({
          severity: 'success',

          detail: 'Update Coupon Successfully',
          life: 6000,
        });
        dispatch(onUpdateCoupon(result.data.updateCoupon));
      })
      .catch((err) => {
        console.log(err);
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
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg px-3 border-0'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex '>
            <ArrowBackButton />{' '}
            <h6 className='ml-3 text-blueGray-700 text-xl font-bold'>
              Edit Coupon Type
            </h6>
          </div>
        </div>
        <div className='flex-auto px-4 lg:px-10 py-10 mt-8 bg-white'>
          <Messages ref={messages} />
          <LoadingDialog visible={isLoading} />
          <FormCoupon id={id} isEdit={true} handlerSubmit={handlerSubmit} />
        </div>
      </div>
    </>
  );
}
