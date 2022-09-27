import { createSlice } from '@reduxjs/toolkit';
import graphqlFilterModelWithDataTable from 'config/graphqlFilterModelWithDataTable';
import getSaleRepository from 'repository/sale/getSaleRepository';

export const saleReportReducer = createSlice({
  name: 'sales-report',
  initialState: {
    loading: true,
    data: [],
    count: 0,
    nextToken: '',
  },
  reducers: {
    onInit: (state, actions) => {
      state.data = actions.payload.items;
      state.nextToken = actions.payload.nextToken;
      state.loading = false;
    },
    setLoading: (state, actions) => {
      state.loading = actions.payload;
    },
    onNextPage: (state, actions) => {
      state.data = [...state.data, ...actions.payload.items];
      state.nextToken = actions.payload.nextToken;
      state.loading = false;
    },
  },
});

export const fetchSalesReport =
  (filters, limit = 100) =>
  (dispatch) => {
    dispatch(setLoading(true));
    filters['saleCouponApproverId'] = { ne: null };
    getSaleRepository(filters, limit + 1)
      .then((result) => {
        let sortedGeneratedCouponReports = result.data.listSaleCoupons.items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        result.data.listSaleCoupons.items = sortedGeneratedCouponReports
        dispatch(onInit(result.data.listSaleCoupons));
      })
      .catch((e) => {});
  };

export const nextPageSalesReport =
  (filters, limit = 100, nextToken) =>
  (dispatch) => {
    if (nextToken !== null) {
      dispatch(setLoading(true));
      filters['saleCouponApproverId'] = { ne: null };
      filters['deletedAt'] = { attributeExists: false };
      const dataFilters = graphqlFilterModelWithDataTable(filters);
      getSaleRepository(dataFilters, limit + 1, nextToken)
        .then((result) => {
          dispatch(onNextPage(result.data.listSaleCoupons));
        })
        .catch((e) => {});
    }
  };

export const filterSalesReport = (filters) => (dispatch) => {
  let dataFilters = graphqlFilterModelWithDataTable(filters);
  dataFilters['saleCouponApproverId'] = { ne: null };
  dispatch(setLoading(true));
  getSaleRepository(dataFilters)
    .then((result) => {
      dispatch(onInit(result.data.listSaleCoupons));
    })
    .catch((e) => {});
};

// Action creators are generated for each case reducer function
export const { onInit, onNextPage, setLoading } = saleReportReducer.actions;
export default saleReportReducer.reducer;
