import React from 'react';

export default function CustomButton({ className, children, onClick, color }) {
  return (
    <button
      className={`${className} bg-${
        color === undefined ? 'sky' : color
      }-600 text-white active:bg-${
        color === undefined ? 'sky' : color
      }-200 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  ease-linear transition-all duration-150`}
      type='submit'
      onClick={onClick}
    >
      {children}
    </button>
  );
}
