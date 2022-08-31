import GroupStatement from 'config/constants/GroupStatement';
import React from 'react';
import MenuSideBar from './Components/MenuSideBar';

export default function CouponSideBar({ userType }) {
  return (
    <>
      <h6 className='md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline'>
        Coupon Management
      </h6>
      <ul className='md:flex-col md:min-w-full flex flex-col list-none'>
        <MenuSideBar
          route={'/admin/sales'}
          location={'/admin/sales'}
          icon={'fa fa-list-alt'}
        >
          Generate Coupon
        </MenuSideBar>

        {userType.includes(GroupStatement.SALES) ||
        userType.includes(GroupStatement.ADMINISTRATORS) ? (
          <>
            <MenuSideBar
              route={'/admin/coupon-types'}
              location={'/admin/coupon-types'}
              icon={'fa fa-list-alt'}
            >
              Coupon Type
            </MenuSideBar>
            <MenuSideBar
              route={'/admin/packages'}
              location={'/admin/packages'}
              icon={'pi pi-box'}
            >
              Package
            </MenuSideBar>
          </>
        ) : null}
      </ul>
      <hr className='my-2 md:min-w-full' />
    </>
  );
}
