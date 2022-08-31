import { createSlice } from '@reduxjs/toolkit';
import graphqlFilterModelWithDataTable from 'config/graphqlFilterModelWithDataTable';
import getCloseTicketReportRepository from 'repository/reports/getCloseTicketReportRepository';

export const serialCouponReportReducer = createSlice({
  name: 'close-ticket-reports',
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
      state.isLoading = false;
      state.nextToken = actions.payload.nextToken;
    },
    onNextPage: (state, actions) => {
      state.data = [...state.data, ...actions.payload.items];
      state.isLoading = false;
      state.nextToken = actions.payload.nextToken;
    },
  },
});

export const fetchCloseTicketReports = (filter) => (dispatch) => {
  dispatch(setLoading(true));
  const filters = graphqlFilterModelWithDataTable(filter);
  getCloseTicketReportRepository(filters)
    .then((result) => {
      dispatch(onInit(result));
    })
    .catch((e) => {});
};

export const onNextPageCloseTicketReports =
  (filter, limit, nextToken) => (dispatch) => {
    if (nextToken !== null) {
      dispatch(setLoading(true));
      const filters = graphqlFilterModelWithDataTable(filter);
      getCloseTicketReportRepository(filters)
        .then((result) => {
          dispatch(onNextPage(result));
        })
        .catch((e) => {});
    }
  };

export const filterCloseTicketReports = (filter) => (dispatch) => {
  dispatch(setLoading(true));
  const filters = graphqlFilterModelWithDataTable(filter);
  getCloseTicketReportRepository(filters)
    .then((result) => {
      dispatch(setLoading(false));
      dispatch(onInit(result));
    })
    .catch((e) => {});
};

// Action creators are generated for each case reducer function
export const { onInit, setLoading, onNextPage } =
  serialCouponReportReducer.actions;

export default serialCouponReportReducer.reducer;
