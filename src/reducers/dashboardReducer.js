import { createSlice } from '@reduxjs/toolkit';
import getCloseTicketStatisticRepository from 'repository/dashbaord/getCloseTicketStatisticRepository';
import getGenerateCouponStatisticRepository from 'repository/dashbaord/getGenerateCouponStatisticRepository';
import getUserStatisticRepository from 'repository/dashbaord/getUserStatisticRepostiory';
import getSaleRepository from 'repository/sale/getSaleRepository';

export const dashboardReducer = createSlice({
  name: 'dashboard',
  loading: true,
  initialState: {
    notificationsCount: 0,
    generateCoupon: {
      loading: true,
      count: 0,
      percentage: 0,
    },
    user: {
      loading: true,
      count: 0,
      percentage: 0,
    },
    closeTicket: {
      loading: true,
      count: 0,
      percentage: 0,
    },
  },
  reducers: {
    setLoading: (state, actions) => {
      state.loading = actions.payload;
    },
    onInitGenerateCoupon: (state, actions) => {
      state.generateCoupon = {
        loading: false,
        count: actions.payload.count,
        percentage: actions.payload.percentage,
      };
    },
    onInitUser: (state, actions) => {
      state.user = {
        loading: false,
        count: actions.payload.count,
        percentage: actions.payload.percentage,
      };
    },
    onInitCloseTicket: (state, actions) => {
      state.closeTicket = {
        loading: false,
        count: actions.payload.count,
        percentage: actions.payload.percentage,
      };
    },
    onNotificationCount: (state, actions) => {
      state.notificationsCount = actions.payload;
      console.log(state.notificationsCount);
    },
  },
});

export const fetchDashboardReport = (filter) => (dispatch) => {
  dispatch(setLoading(true));
  const date = new Date();
  getGenerateCouponStatisticRepository(date).then((response) => {
    dispatch(onInitGenerateCoupon(response));
  });

  getUserStatisticRepository(date).then((res) => {
    dispatch(onInitUser(res));
  });

  getCloseTicketStatisticRepository(date).then((res) => {
    dispatch(onInitCloseTicket(res));
  });

  const filter = { saleCouponApproverId: { eq: null } };
  getSaleRepository(filter).then((res) => {
    dispatch(onNotificationCount(res.data.listSaleCoupons.items.length));
  });
  dispatch(setLoading(false));
};
// Action creators are generated for each case reducer function
export const {
  onInitGenerateCoupon,
  setLoading,
  onInitUser,
  onInitCloseTicket,
  onNotificationCount,
} = dashboardReducer.actions;

export default dashboardReducer.reducer;
