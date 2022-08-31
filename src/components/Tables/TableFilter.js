import React from 'react';

export default function TableFilter() {
  return (
    <div className='relative flex flex-col min-w-0 break-words w-full shadow-sn rounded-lg bg-blueGray-100 border-0'>
      <div className='rounded-t bg-white mb-0 px-6 py-6 flex justify-between'>
        <div className='relative flex sm:w-2/12 flex-wrap items-stretch'>
          <div className='relative flex sm:w-4/12 flex-wrap items-stretch content-center'>
            <span>Page</span>
          </div>
          <div className='relative flex sm:w-6/12 flex-wrap items-stretch'>
            <input
              type='text'
              placeholder='10'
              value={10}
              onChange={() => {}}
              className='text-blueGray-500 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full'
            />
          </div>
        </div>
        <div className='relative flex w-full lg:w-3/12 flex-wrap items-stretch'>
          <span className='z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3'>
            <i className='fas fa-search'></i>
          </span>
          <input
            type='text'
            placeholder='Search here...'
            className='text-blueGray-500 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10'
          />
        </div>
      </div>
    </div>
  );
}
