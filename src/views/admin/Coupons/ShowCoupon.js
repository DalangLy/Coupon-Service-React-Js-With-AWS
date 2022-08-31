import ArrowBackButton from 'components/Buttons/ArrowBackButton';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ShowCoupon() {
  const coupons = useSelector((state) => state.coupons.data);
  const [coupon, setCoupon] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const data = coupons.filter((e) => e.id === id);
    if (data.length > 0) {
      setCoupon(data[0]);
    }
  }, [coupons, id]);

  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 g rounded-lg border-0 px-3'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex '>
            <ArrowBackButton />{' '}
            <h6 className='ml-3 text-blueGray-700 text-xl font-bold'>
              {coupon.name}
            </h6>
          </div>
        </div>
        <div className='flex-auto px-4 lg:px-10 py-10 mt-8 bg-white mt-8'>
          <div className='w-full  py-3'>
            <div className='flex flex-wrap'>
              <div className='w-40 px-4'>
                <div className='relative w-full mb-3 text-right font-bold'>
                  Name
                </div>
              </div>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>{coupon.name}</div>
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='w-40 px-4'>
                <div className='relative w-full mb-3 text-right font-bold'>
                  Price
                </div>
              </div>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>{coupon.price}</div>
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='w-40 px-4'>
                <div className='relative w-full mb-3 text-right font-bold'>
                  Shortcut
                </div>
              </div>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>{coupon.shortcut}</div>
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='w-40 px-4'>
                <div className='relative w-full mb-3 text-right font-bold'>
                  Period
                </div>
              </div>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  {coupon.period} Months
                </div>
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='w-40 px-4'>
                <div className='relative w-full mb-3 text-right font-bold'>
                  Created At
                </div>
              </div>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  {coupon.createdAt === undefined
                    ? '-'
                    : coupon.createdAt.split('T')[0]}
                </div>
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='w-40 px-4'>
                <div className='relative w-full mb-3 text-right font-bold'>
                  Description
                </div>
              </div>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>{coupon.description}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
