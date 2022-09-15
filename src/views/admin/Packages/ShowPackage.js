import ArrowBackButton from 'components/Buttons/ArrowBackButton';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ShowCoupon() {
  const packages = useSelector((state) => state.packages.data);
  const coupons = useSelector((state) => state.coupons.data);
  const [dpackage, setPackage] = useState({});

  //take id param from url
  const { id: idFromUrl } = useParams();

  useEffect(() => {
    const data = packages.filter((e) => e.id === idFromUrl);
    if (data.length > 0) {
      setPackage(data[0]);
    }
  }, [packages, idFromUrl]);

  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 px-3 rounded-lg border-0'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex '>
            <ArrowBackButton />
            <h6 className='ml-3 text-blueGray-700 text-xl font-bold'>
              Package
            </h6>
          </div>
        </div>
        <div className='flex-auto pb-5  mt-8'>
          <div className='w-full bg-white py-10'>
            <div className='flex flex-wrap'>
              <div className='w-40 px-4'>
                <div className='relative w-full mb-3 text-right font-bold'>
                  Name
                </div>
              </div>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>{dpackage.name}</div>
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='w-40 px-4'>
                <div className='relative w-full mb-3 text-right font-bold'>
                  Price
                </div>
              </div>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>{dpackage.price} $</div>
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='w-40 px-4'>
                <div className='relative w-full mb-3 text-right font-bold'>
                  Quantity
                </div>
              </div>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>{dpackage.quantity}</div>
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='w-40 px-4'>
                <div className='relative w-full mb-3 text-right font-bold'>
                  Discount
                </div>
              </div>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>{dpackage.discount} %</div>
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='w-40 px-4'>
                <div className='relative w-full mb-3 text-right font-bold'>
                  Description
                </div>
              </div>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  {dpackage?.description === '' ? '-' : dpackage?.description}
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-10'>
            <table className='w-full text-sm text-left'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 bg-gray-100 text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Coupon name
                  </th>

                  <th scope='col' className='px-6 py-3'>
                    Price
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Period
                  </th>
                  <th
                    scope='col'
                    style={{ width: '60%' }}
                    className='px-6 py-3'
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className='bg-white  dark:border-gray-700'>
                  <th scope='row' className='px-6 py-4 font-medium text-black'>
                    {dpackage?.coupons?.name}
                  </th>
                  <td className='px-6 py-4 font-medium text-black'>
                    {dpackage?.coupons?.price} $
                  </td>

                  <td className='px-6 py-4 font-medium text-black'>
                    {dpackage?.coupons?.period} Months
                  </td>
                  <td className='px-6 py-4 font-medium text-black'>
                    {dpackage?.coupons?.description}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr />
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-10'>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 bg-gray-100 text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Coupon name
                  </th>

                  <th scope='col' className='px-6 py-3'>
                    Price
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Quantity
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Discount
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Description
                  </th>
                </tr>
              </thead>

              <tbody>
                {dpackage?.couponDiscountPackage !== undefined
                    ? (
                  dpackage?.couponDiscountPackage?.items?.map((e, index) => {
                    const coupon = coupons.filter(
                      (filter) => filter.id === e.couponDiscountPackageCouponId
                    );
                    return (
                      <tr
                        className='bg-white dark:bg-gray-800 dark:border-gray-700'
                        key={index}
                      >
                        <th
                          scope='row'
                          className='px-6 py-4 font-medium text-black'
                        >
                          {coupon.length > 0 ? coupon[0].name : '-'}
                        </th>
                        <td className='px-6 py-4 font-medium text-black'>
                          {e.price} $
                        </td>
                        <td className='px-6 py-4 font-medium text-black'>
                          {e.quantity}
                        </td>
                        <td className='px-6 py-4 font-medium text-black'>
                          {e.discount} %
                        </td>
                        <td className='px-6 py-4 font-medium text-black'>-</td>
                      </tr>
                    );
                  })
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
