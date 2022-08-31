import React from 'react';

export default function EditButton({ onClick }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800'
    >
      <i className='pi pi-pencil' aria-hidden='true'></i> Edit
    </button>
  );
}
