import React from 'react';
import MenuSideBar from './Components/MenuSideBar';

export default function MenuAdminSideBar() {
  return (
    <>
      <div className='flex justify-between  cursor-pointer'>
        <h6 className=' text-blueGray-500 text-xs uppercase font-bold block pt-1 no-underline pb-4'>
          User Management
        </h6>
        <div className='pt-1'></div>
      </div>
      <ul className={`md:flex-col md:min-w-full flex flex-col list-none  `}>
        {/* <MenuSideBar
          route={'/admin/roles'}
          location={'/admin/roles'}
          icon={'fa fa-list-alt'}
        >
          Roles
        </MenuSideBar> */}
        <MenuSideBar
          route={'/admin/groups'}
          location={'/admin/groups'}
          icon={'pi pi-users'}
        >
          Groups
        </MenuSideBar>
        <MenuSideBar
          route={'/admin/users'}
          location={'/admin/users'}
          icon={'pi pi-user'}
        >
          Users
        </MenuSideBar>
      </ul>
      <hr className='my-2 md:min-w-full' />
    </>
  );
}
