import React from 'react';

export default function CloudButton({ disabled, onClick, icon }) {
  return (
    <button
      disabled={disabled}
      className={`${
        disabled
          ? 'border border-gray-300 text-gray-300'
          : 'text-sky-600 hover:bg-sky-600 border hover:text-white border-sky-400'
      }   rounded-lg text-md px-5 py-2 text-center mr-2 mb-2 ease-in duration-100 mr-0 mb-0`}
      type='button'
      onClick={onClick}
    >
      <i className={`pi ${icon ?? 'pi-cloud'}`}></i>
    </button>
  );
}
