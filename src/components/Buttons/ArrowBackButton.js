import React from 'react';
import { useHistory } from 'react-router-dom';

export default function ArrowBackButton() {
  const history = useHistory();

  return (
    <div
      className='cursor-pointer'
      onClick={() => {
        history.goBack();
      }}
    >
      <h6 className='mr-3  text-blueGray-700 text-xl font-bold'>
        <i className='fa fa-arrow-left' aria-hidden='true'></i>
      </h6>
    </div>
  );
}
