// import { couponRoute } from './couponRoute';
import couponRoute from './couponRoute';
import userRoute from './userRoute';
import groupRoute from './groupRoute';
import packageRoute from './packageRoute';
import generateCouponRoute from './generateCouponRoute';

// component
import CloseTicketReport from 'views/admin/Reports/CloseTicketReport';
import CouponReport from 'views/admin/Reports/CouponReport';
import GenerateCouponReport from 'views/admin/Reports/GenerateCouponReports';
import Profile from 'views/Profile';
import SettingView from 'views/admin/Setting/SettingView';
import NotFound from 'views/NotFound';
import VerifyTicketPage from 'views/admin/VerifyTickets/VerifyTicketPage';
import CloseTicketPage from 'views/admin/CloseTickets/CloseTicketPage';
import Dashboard from 'views/admin/Dashboard';

const appRoutes = (group) => {
  return [
    ...userRoute(group),
    ...couponRoute(group),
    ...groupRoute(group),
    ...packageRoute(group),
    ...generateCouponRoute(group),
    {
      path: '/admin/dashboard',
      component:
        group.includes('Sales') || group.includes('Administrators')
          ? Dashboard
          : NotFound,
    },
    {
      path: '/admin/profile/:id',
      component: Profile,
    },
    {
      path: '/admin/ticket/verify',
      component:
        group.includes('Sales') ||
        group.includes('Supports') ||
        group.includes('Administrators')
          ? VerifyTicketPage
          : NotFound,
    },
    {
      path: '/admin/ticket/close',
      component:
        group.includes('Sales') ||
        group.includes('Supports') ||
        group.includes('Administrators')
          ? CloseTicketPage
          : NotFound,
    },
    {
      path: '/admin/reports/generate-coupon',
      component:
        group.includes('Sales') ||
        group.includes('Administrators') ||
        group.includes('Finances') ||
        group.includes('Guests')
          ? GenerateCouponReport
          : NotFound,
    },
    {
      path: '/admin/reports/close-ticket',
      component:
        group.includes('Sales') ||
        group.includes('Administrators') ||
        group.includes('Finances') ||
        group.includes('Supports')
          ? CloseTicketReport
          : NotFound,
    },
    {
      path: '/admin/reports/coupon-reports',
      component:
        group.includes('Sales') ||
        group.includes('Administrators') ||
        group.includes('Guests')
          ? CouponReport
          : NotFound,
    },
    {
      path: '/admin/settings',
      component: group.includes('Administrators') ? SettingView : NotFound,
    },
  ];
};

export default appRoutes;
