import React from 'react';

export default function DeleteButton({ onClick, text, icon }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='text-red-700 hover:text-white border border-red-700 hover:bg-red-800  focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800'
    >
      <i
        className={icon !== undefined ? icon : 'fa fa-trash'}
        aria-hidden='true'
      ></i>{' '}
      {text !== undefined ? text : 'Delete'}
    </button>
  );
}
