import ArrowBackButton from 'components/Buttons/ArrowBackButton';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import FormCoupon from './FormCoupon';
import { Messages } from 'primereact/messages';
import createCouponRepository from 'repository/coupon/createCouponRepository';
import { onAddOneItem } from 'reducers/couponReducer';
import LoadingDialog from 'components/Dialogs/LoadingDialog';

export default function CreateCoupon() {
  const [isLoading, setIsLoading] = useState(false);
  const messages = useRef(null);
  const dispatch = useDispatch();

  const handlerSubmit = async (event, coupon) => {
    event.preventDefault();
    setIsLoading(true);
    const body = {
      name: coupon.name,
      shortcut: coupon.shortcut,
      description: coupon.description,
      price: coupon.price,
      period: coupon.periodNumber,
    };

    await createCouponRepository(body)
      .then((result) => {
        messages.current.show({
          severity: 'success',
          // summary: 'Success Message',
          detail: 'Create Coupon Successfully',
          life: 6000,
        });
        dispatch(onAddOneItem(result.data.createCoupon));
      })
      .catch((err) => {
        console.log(err);
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
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6  rounded-lg  border-0 px-3'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex '>
            <ArrowBackButton />{' '}
            <h6 className='ml-3 text-blueGray-700 text-xl font-bold'>
              Create Coupon Type
            </h6>
          </div>
        </div>
        <div className='flex-auto bg-white lg:px-10 py-10  mt-8'>
          <div className='px-4'>
            <Messages ref={messages}></Messages>
          </div>

          <LoadingDialog visible={isLoading} />

          <FormCoupon handlerSubmit={handlerSubmit} />
        </div>
      </div>
    </>
  );
}
