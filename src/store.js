import { configureStore } from '@reduxjs/toolkit';
import {
  authReducer,
  userRoleReducer,
  userReducer,
  couponReducer,
  customerReducer,
  groupReducer,
  packageReducer,
  saleReducer,
  serialCouponReportReducer,
  closeTicketReportReducer,
  dashboardReducer,
  settingReducer,
  saleReportReducer,
} from 'reducers/';

export default configureStore({
  reducer: {
    auth: authReducer,
    userRole: userRoleReducer,
    users: userReducer,
    coupons: couponReducer,
    customers: customerReducer,
    groups: groupReducer,
    packages: packageReducer,
    sales: saleReducer,
    reportSerialCoupon: serialCouponReportReducer,
    reportCloseTicket: closeTicketReportReducer,
    dashboard: dashboardReducer,
    setting: settingReducer,
    generateCouponReport: saleReportReducer,
  },
});
