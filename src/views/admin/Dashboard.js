import React from 'react';

// components

import CardLineChart from 'components/Cards/CardLineChart.js';
// import CardBarChart from 'components/Cards/CardBarChart.js';
import HeaderStats from 'components/Headers/HeaderStats.js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardReport } from './../../reducers/dashboardReducer';
import CardBarChart from 'components/Cards/CardBarChart';

export default function Dashboard() {
  const generateCoupon = useSelector((state) => state.dashboard.generateCoupon);
  const userThisWeek = useSelector((state) => state.dashboard.user);
  const closeTickets = useSelector((state) => state.dashboard.closeTicket);

  useEffect(() => {
    // if (generateCoupon.loading) dispatch(fetchDashboardReport());
  }, []);

  return (
    <>
      <HeaderStats
        generateCoupon={generateCoupon}
        user={userThisWeek}
        closeTicket={closeTickets}
      />
      <div className='my-6'></div>
      <div className='flex flex-wrap'>
        <div className='w-full xl:w-12/12 mb-12 xl:mb-0'>
          <CardLineChart />
        </div>
      </div>
      {/* <div className='flex flex-wrap mt-4'>
        <div className='w-full xl:w-8/12 mb-12 xl:mb-0 px-4'>
          <CardPageVisits />
        </div>
        <div className='w-full xl:w-4/12 px-4'>
          <CardSocialTraffic />
        </div>
      </div> */}
    </>
  );
}
