import { createSlice } from '@reduxjs/toolkit';
import graphqlFilterModelWithDataTable from 'config/graphqlFilterModelWithDataTable';
import SerialCouponReportRepository from 'repository/reports/SerialCouponReportRepository';

export const closeTicketReportReducer = createSlice({
  name: 'serial-coupon-reports',
  initialState: {
    isLoading: true,
    data: [],
    nextToken: null,
  },
  reducers: {
    setLoading: (state, actions) => {
      state.isLoading = actions.payload;
    },
    onInit: (state, actions) => {
      state.data = actions.payload.items;
      state.nextToken = actions.payload.nextToken;
    },
    onNextPage: (state, actions) => {
      state.data = [...state.data, ...actions.payload.items];
      state.nextToken = actions.payload.nextToken;
    },
  },
});

export const fetchReportSerialCoupon =
  (filter, limit = 100) =>
  (dispatch) => {
    dispatch(setLoading(true));
    const filters = graphqlFilterModelWithDataTable(filter);
    SerialCouponReportRepository(filters, limit + 1)
      .then((result) => {
        dispatch(setLoading(false));
        dispatch(onInit(result));
      })
      .catch((e) => {
        console.log(e);
      });
  };

export const onNextPageReportSerialCoupon =
  (filter, limit = 10, nextToken) =>
  (dispatch) => {
    if (nextToken !== null) {
      dispatch(setLoading(true));
      const filters = graphqlFilterModelWithDataTable(filter);
      SerialCouponReportRepository(filters, 100, nextToken)
        .then((result) => {
          dispatch(setLoading(false));
          dispatch(onNextPage(result));
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

export const filterReportSerialCoupon = (filter) => (dispatch) => {
  dispatch(setLoading(true));
  const filters = graphqlFilterModelWithDataTable(filter);
  SerialCouponReportRepository(filters)
    .then((result) => {
      dispatch(setLoading(false));
      dispatch(onInit(result));
    })
    .catch((e) => {
      console.log(e);
    });
};

// Action creators are generated for each case reducer function
export const { onInit, setLoading, onNextPage } =
  closeTicketReportReducer.actions;

export default closeTicketReportReducer.reducer;
