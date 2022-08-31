import React from 'react';

export default function CustomTextAreaInput({
  label,
  value,
  onChange,
  placeholder,
  disable = false,
  required = true,
  defaultValue,
  rows,
}) {
  return (
    <>
      <div className='relative w-full mb-3'>
        <label
          className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
          htmlFor={`grid-${label}`}
        >
          {label}{' '}
          {required ? (
            label !== undefined ? (
              <span className='text-red-600'>*</span>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </label>
        <textarea
          className={`input-text bg-grey-600 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`}
          value={value}
          onChange={(e) => (onChange ? onChange(e) : {})}
          placeholder={placeholder === undefined ? label : placeholder}
          disabled={disable}
          required={required}
          defaultValue={defaultValue}
          rows={rows !== undefined && rows === null ? rows : 8}
        >
          {value}
        </textarea>
      </div>
    </>
  );
}
