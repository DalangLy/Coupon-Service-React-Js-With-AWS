import React from 'react';

export default function ActionButton({ color, children }) {
  let className =
    'text-customColor-700 hover:text-white border border-customColor-700 hover:bg-customColor-800  focus:outline-none focus:ring-customColor-300 font-medium rounded-lg text-sm px-2 py-1 text-center mr-2 mb-2 dark:border-customColor-500 dark:text-customColor-500 dark:hover:text-white dark:hover:bg-customColor-600 dark:focus:ring-customColor-800';
  return (
    <button type='button' className={className.replace('customColor', color)}>
      {children}
    </button>
  );
}
