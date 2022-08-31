import React from 'react';

export default function Checkbox({
  id,
  onChange,
  checked,
  disable = false,
  children,
}) {
  return (
    <div className='relative lg:w-4/12 mb-3'>
      <label className='inline-flex items-center cursor-pointer'>
        <input
          id={id ?? ''}
          type='checkbox'
          onChange={(e) => onChange(e)}
          checked={checked}
          disabled={disable}
          className='form-checkbox border-1 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150'
        />
        <span className='ml-2 text-sm font-semibold text-blueGray-600'>
          {children}
        </span>
      </label>
    </div>
  );
}
