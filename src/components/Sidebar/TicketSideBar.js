import React from 'react';
import MenuSideBar from './Components/MenuSideBar';

export default function TicketSideBar() {
  return (
    <>
      <h6 className='md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline'>
        Tickets
      </h6>
      <ul className='md:flex-col md:min-w-full flex flex-col list-none'>
        <MenuSideBar
          route={'/admin/ticket/verify'}
          location={'/admin/ticket/verify'}
          icon={'pi pi-users'}
        >
          Verify Ticket
        </MenuSideBar>
        <MenuSideBar
          route={'/admin/close-ticket'}
          location={'/admin/close-ticket'}
          icon={'pi pi-user'}
        >
          Close Ticket
        </MenuSideBar>
      </ul>
      <hr className='my-2 md:min-w-full' />
    </>
  );
}
