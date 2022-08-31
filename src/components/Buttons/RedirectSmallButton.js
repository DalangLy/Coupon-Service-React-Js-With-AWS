import React from 'react';

export default function RedirectSmallButton({ text, type, children, onClick }) {
  return (
    <button
      className='bg-sky-600 mt-2 text-white active:bg-sky-200 text-xs font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'
      type={type === undefined ? 'button' : type}
      onClick={onClick}
    >
      {text === undefined ? children : text}
    </button>
  );
}
