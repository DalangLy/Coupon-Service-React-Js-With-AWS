import React from 'react';

export default function SelectBox({
  value,
  placeholder,
  children,
  onChange,
  required = true,
}) {
  return (
    <>
      <label
        className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
        htmlFor='grid-password'
      >
        {placeholder}
      </label>
      <select
        className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
        id='grid-state'
        // value={value}
        onChange={onChange}
        required={required}
        defaultValue={value}
      >
        <option disabled value={''}>
          {placeholder}
        </option>
        {children}
      </select>
    </>
  );
}
