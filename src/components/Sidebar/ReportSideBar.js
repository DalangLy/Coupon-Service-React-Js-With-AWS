import React from 'react';
import MenuSideBar from './Components/MenuSideBar';

export default function ReportSideBar({ userType }) {
  return (
    <>
      <h6 className='md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline'>
        Reports
      </h6>
      <ul className='md:flex-col md:min-w-full flex flex-col list-none'>
        {userType.includes('Finances') ||
        userType.includes('Sales') ||
        userType.includes('Administrators') ? (
          <>
            <MenuSideBar
              route={'/admin/reports/generate-coupon'}
              location={'/admin/reports/generate-coupon'}
              icon={'pi pi-file'}
            >
              Generate Coupon Report
            </MenuSideBar>
          </>
        ) : null}

        {userType.includes('Supports') ||
        userType.includes('Finances') ||
        userType.includes('Sales') ||
        userType.includes('Administrators') ? (
          <>
            <MenuSideBar
              route={'/admin/reports/close-ticket'}
              location={'/admin/reports/close-ticket'}
              icon={'pi pi-file'}
            >
              Close Ticket Reports
            </MenuSideBar>
          </>
        ) : null}

        {userType.includes('Sales') ||
        userType.includes('Administrators') ||
        userType.includes('Guests') ? (
          <MenuSideBar
            route={'/admin/reports/coupon-reports'}
            location={'/admin/reports/coupon-reports'}
            icon={'pi pi-file'}
          >
            Serial Coupon
          </MenuSideBar>
        ) : null}
      </ul>
      <hr className='my-2 md:min-w-full' />
    </>
  );
}
