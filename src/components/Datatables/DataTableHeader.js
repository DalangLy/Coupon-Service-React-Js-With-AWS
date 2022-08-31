import React from 'react';
import { InputText } from 'primereact/inputtext';

export default function DataTableHeader({
  globalFilter,
  onChange,
  onClear,
  nextToken,
  onLoadData,
  onRefresh,
}) {
  return (
    <div className='flex justify-content-end'>
      <div>
        <div className='ml-5 self-center md:w-64'>
          <span className='p-input-icon-left w-full'>
            <i className='pi pi-search' />
            <InputText
              value={globalFilter}
              onChange={onChange}
              className='w-full'
              placeholder='Keyword Search'
            />
          </span>
        </div>
      </div>
      <div className='ml-3'>
        <button
          className={`text-sky-600 hover:bg-sky-600 border hover:text-white border-sky-400
           rounded-lg text-md px-5 py-2 text-center h-full ease-in duration-100 mr-0 mb-0 cursor-pointer`}
          type='button'
          onClick={onRefresh}
        >
          <i className='pi pi-refresh'></i>
        </button>
      </div>
      <div className='ml-3'>
        <button
          disabled={nextToken === null ? true : false}
          className={`${
            nextToken === null
              ? 'border border-gray-300 text-gray-300'
              : 'text-sky-600 hover:bg-sky-600 border hover:text-white border-sky-400'
          }   rounded-lg text-md px-5 py-2 text-center h-full ease-in duration-100 mr-0 mb-0  cursor-pointer`}
          type='button'
          onClick={onLoadData}
        >
          <i className='pi pi-cloud'></i>
        </button>
      </div>
      <div className='ml-3'>
        <button
          className='text-sky-600 h-full hover:bg-sky-600 border hover:text-white border-sky-400 rounded-lg text-md px-5 py-2 text-center ease-in duration-100'
          type='button'
          onClick={onClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
