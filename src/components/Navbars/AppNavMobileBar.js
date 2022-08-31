import React from 'react';
import NavBarItem from './NavBarItem';

export default function AppNavMobileBar({ className, groups }) {
  return (
    <aside className={`min-h-screen-90 bg-white px-5 py-3  ${className}`}>
      {groups?.length > 0 && !groups?.includes('Guests') ? (
        <>
          {groups?.includes('Sales') || groups?.includes('Administrators') ? (
            <div className='mb-6'>
              <div className='font-medium mb-2  text-gray-400 '>Dashboard</div>
              <NavBarItem route='/admin/dashboard'>
                <i className='pi pi-chart-line mr-4'></i>
                Dashboard
              </NavBarItem>
              {groups?.includes('Administrators') ? (
                <NavBarItem route='/admin/settings'>
                  <i className='pi pi-cog mr-4'></i>
                  Setting
                </NavBarItem>
              ) : null}
            </div>
          ) : null}

          <div className='mb-6'>
            <div className='font-medium mb-2  text-gray-400 '>
              User Management
            </div>
            {groups?.includes('Sales') || groups?.includes('Administrators') ? (
              <NavBarItem route='/admin/groups'>
                <i className='pi pi-users mr-4'></i>
                Group
              </NavBarItem>
            ) : null}

            <NavBarItem route='/admin/users'>
              <i className='pi pi-user mr-4'></i>
              User
            </NavBarItem>
          </div>
        </>
      ) : null}

      <div className='mb-6'>
        {groups?.includes('Administrators') || groups?.includes('Sales') ? (
          <>
            <div className='font-medium mb-2  text-gray-400 '>
              Coupon Management
            </div>

            <NavBarItem route='/admin/coupons'>
              <i className='pi pi-ticket mr-4'></i>
              Coupon
            </NavBarItem>
            <NavBarItem route='/admin/packages'>
              <i className='pi pi-box mr-4'></i>
              Packages
            </NavBarItem>
          </>
        ) : null}

        {groups?.includes('Administrators') ||
        groups?.includes('Sales') ||
        groups?.includes('Guests') ? (
          <>
            <NavBarItem route='/admin/generate-coupon'>
              <i className='pi pi-ticket mr-4'></i>
              Generate Coupon
            </NavBarItem>
          </>
        ) : null}
      </div>
      {groups?.includes('Administrators') ||
      groups?.includes('Sales') ||
      groups?.includes('Supports') ? (
        <div className='mb-6'>
          <div className='font-medium mb-2  text-gray-400 '>
            Operation Management
          </div>
          <NavBarItem route='/admin/ticket/verify'>
            <i className='pi pi-ticket mr-4'></i>
            Coupon Ticket
          </NavBarItem>
          <NavBarItem route='/admin/ticket/close'>
            <i className='pi pi-box mr-4'></i>
            Close Coupon
          </NavBarItem>
        </div>
      ) : null}
      <div className='mb-6'>
        <div className='font-medium mb-2  text-gray-400 '>Reports</div>
        {groups?.includes('Administrators') ||
        groups?.includes('Sales') ||
        groups?.includes('Supports') ? (
          <NavBarItem route='/admin/reports/close-ticket'>
            <i className='pi pi-ticket mr-4'></i>
            Close Coupon Reports
          </NavBarItem>
        ) : null}

        {groups?.includes('Administrators') ||
        groups?.includes('Sales') ||
        groups?.includes('Guests') ||
        groups?.includes('Finances') ? (
          <NavBarItem route='/admin/reports/generate-coupon'>
            <i className='pi pi-box mr-4'></i>
            Generate Coupon Reports
          </NavBarItem>
        ) : null}

        {groups?.includes('Administrators') ||
        groups?.includes('Sales') ||
        groups?.includes('Guests') ? (
          <NavBarItem route='/admin/reports/coupon-reports'>
            <i className='pi pi-ticket mr-4 '></i>
            Serial Coupon Reports
          </NavBarItem>
        ) : null}
      </div>
    </aside>
  );
}
