import ArrowBackButton from 'components/Buttons/ArrowBackButton';
import React from 'react';

export default function PermissionDeniedPage() {
  return (
    <div className='bg-white p-4'>
      <ArrowBackButton />
      <div className='flex items-center justify-center '>
        <div className='px-4 lg:py-12'>
          <div className='lg:gap-4 lg:flex'>
            <div className='flex flex-col items-center justify-center md:py-24 lg:py-32'>
              <h1 className='font-bold text-blue-600 text-3xl'>
                Permission Denied
              </h1>
              <p className='mb-2 text-1xl font-bold text-center text-gray-800 mt-3'>
                <span className='text-sky-600'>Oops!</span> Page not allowed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
