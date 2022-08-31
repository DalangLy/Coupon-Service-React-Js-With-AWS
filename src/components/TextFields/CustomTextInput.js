import React from 'react';

export default function CustomTextInput({
  label,
  type,
  value,
  onChange,
  placeholder,
  disable = false,
  required = true,
  minLength,
  maxLength,
  defaultValue,
  errorMessage,
  hint,
}) {
  return (
    <>
      <div className='relative w-full mb-3'>
        <label className='block mb-1' htmlFor={`grid-${label}`}>
          <span className=' uppercase text-blueGray-600 text-xs font-bold mb-2'>
            {label}
            {required ? (
              label !== undefined ? (
                <span className='text-red-600'>*</span>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </span>
          {errorMessage !== undefined && errorMessage !== null ? (
            <span className='ml-2 text-red-400'>{errorMessage}</span>
          ) : null}
          <span className='ml-2 text-sm'>{hint}</span>
        </label>
        <input
          type={type ?? 'text'}
          className={`${
            errorMessage !== undefined &&
            errorMessage !== '' &&
            errorMessage !== null
              ? 'border-2 border-red ring-offset-2'
              : 'focus:outline-none focus:ring'
          } bg-grey-600 border-0 px-3 input-text py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm  w-full ease-linear transition-all duration-150`}
          value={value}
          onChange={(e) => (onChange ? onChange(e) : {})}
          placeholder={placeholder === undefined ? label : placeholder}
          disabled={disable}
          required={required}
          maxLength={maxLength}
          minLength={minLength}
          defaultValue={defaultValue}
          autoComplete={type === 'password' ? 'new-password' : 'off'}
        />
      </div>
    </>
  );
}
