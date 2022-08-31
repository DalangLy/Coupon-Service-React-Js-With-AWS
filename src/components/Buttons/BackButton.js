import React from 'react';
import { useHistory } from 'react-router-dom';

export default function BackButton() {
  const history = useHistory();

  return (
    <div
      onClick={() => {
        history.goBack();
      }}
      className='bg-white-800 text-sky-600 active:bg-white-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer'
    >
      Back
    </div>
  );
}
