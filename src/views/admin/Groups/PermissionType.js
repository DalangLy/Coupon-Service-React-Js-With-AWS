import React from 'react';

export default function PermissionType({ label, children }) {
  return (
    <div className='w-12/12 flex flex-wrap my-3'>
      <div className='w-3/12'>{label}</div>
      <div className='w-9/12 flex flex-wrap'>:{children}</div>
    </div>
  );
}
