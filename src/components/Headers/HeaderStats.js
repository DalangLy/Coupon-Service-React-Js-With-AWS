import React from 'react';

// components

import CardStats from 'components/Cards/CardStats.js';

export default function HeaderStats({ generateCoupon, user, closeTicket }) {
  return (
    <>
      {/* Header */}
      <div className='relative bg-sky-600 pt-16 pb-16 p-4 rounded'>
        <div className='px-4 md:px-10 mx-auto w-full'>
          <div>
            {/* Card stats */}
            <div className='flex flex-wrap'>
              <div className='w-full lg:w-6/12 xl:w-4/12 px-4'>
                <CardStats
                  statSubtitle='Generate Coupons'
                  statTitle={generateCoupon.count}
                  statArrow={
                    generateCoupon.percentage > 0
                      ? 'up'
                      : generateCoupon.percentage < 0
                      ? 'down'
                      : ''
                  }
                  statPercent={generateCoupon.percentage}
                  statPercentColor={
                    generateCoupon.percentage > 0
                      ? 'text-emerald-500'
                      : generateCoupon.percentage === '0.00'
                      ? ''
                      : 'text-red-500 '
                  }
                  statDescription='Since last month'
                  statIconName='far fa-chart-bar'
                  statIconColor='bg-red-500'
                />
              </div>
              <div className='w-full lg:w-6/12 xl:w-4/12 px-4'>
                <CardStats
                  statSubtitle='NEW USERS'
                  statTitle={user.count}
                  statArrow={
                    user.percentage > 0
                      ? 'up'
                      : user.percentage < 0
                      ? 'down'
                      : ''
                  }
                  statPercent={user.percentage}
                  statPercentColor={
                    user.percentage > 0
                      ? 'text-emerald-500'
                      : user.percentage === '0.00'
                      ? ''
                      : 'text-red-500 '
                  }
                  statDescription='Since last week'
                  statIconName='fas fa-chart-pie'
                  statIconColor='bg-orange-500'
                />
              </div>
              <div className='w-full lg:w-6/12 xl:w-4/12 px-4'>
                <CardStats
                  statSubtitle='Close Tickets'
                  statTitle={closeTicket.count}
                  statArrow={
                    closeTicket.percentage > 0
                      ? 'up'
                      : closeTicket.percentage < 0
                      ? 'down'
                      : ''
                  }
                  statPercent={closeTicket.percentage}
                  statPercentColor={
                    closeTicket.percentage > 0
                      ? 'text-emerald-500'
                      : closeTicket.percentage === '0.00'
                      ? ''
                      : 'text-red-500 '
                  }
                  statDescription='Since yesterday'
                  statIconName='fas fa-users'
                  statIconColor='bg-pink-500'
                />
              </div>
              {/* <div className='w-full lg:w-6/12 xl:w-3/12 px-4'>
                <CardStats
                  statSubtitle='PERFORMANCE'
                  statTitle='49,65%'
                  statArrow='up'
                  statPercent='12'
                  statPercentColor='text-emerald-500'
                  statDescription='Since last month'
                  statIconName='fas fa-percent'
                  statIconColor='bg-sky-500'
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
