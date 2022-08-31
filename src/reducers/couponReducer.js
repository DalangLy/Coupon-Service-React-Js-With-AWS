import { createSlice } from '@reduxjs/toolkit';
import getCouponRepository from 'repository/coupon/getCouponRepository';

export const couponReducer = createSlice({
  name: 'coupons',
  initialState: {
    isLoading: true,
    data: [],
    count: 0,
    nextToken: null,
  },
  reducers: {
    onLoading: (state, actions) => {
      state.isLoading = !state.isLoading;
    },
    onRefresh: (state, actions) => {
      state.data = [];
      state.isLoading = true;
    },
    onInitCoupon: (state, actions) => {
      state.data = actions.payload.items;
      state.nextToken = actions.payload.nextToken;
      state.isLoading = false;
    },
    onNextPage: (state, actions) => {
      state.isLoading = false;
      state.data = [...state.data, ...actions.payload.items];
      state.nextToken = actions.payload.nextToken;
    },
    onAddOneItem: (state, actions) => {
      state.data = [actions.payload, ...state.data];
    },
    onUpdateCoupon: (state, actions) => {
      for (let index = 0; index < state.data.length; index++) {
        if (state.data[index].id === actions.payload.id) {
          state.data[index] = actions.payload;
        }
      }
    },
    onRemoveCoupon: (state, actions) => {
      let coupon = state.data.filter((e) => e.id !== actions.payload.id);
      state.data = coupon;
    },
  },
});

export const fetchCoupons = () => (dispatch) => {
  dispatch(onRefresh());
  getCouponRepository()
    .then((result) => {
      dispatch(onInitCoupon(result.data.listCoupons));
    })
    .catch((e) => {});
};

export const onNextPageCoupons = (filter, nextToken) => (dispatch) => {
  dispatch(onLoading());
  getCouponRepository(filter, 100, nextToken)
    .then((result) => {
      dispatch(onNextPage(result.data.listCoupons));
    })
    .catch((e) => {
      dispatch(onLoading());
    });
};

// Action creators are generated for each case reducer function
export const {
  onInitCoupon,
  onAddOneItem,
  onRemoveCoupon,
  onUpdateCoupon,
  onNextPage,
  onLoading,
  onRefresh,
} = couponReducer.actions;

export default couponReducer.reducer;
