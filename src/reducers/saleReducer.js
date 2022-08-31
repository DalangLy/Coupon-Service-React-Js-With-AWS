import { createSlice } from '@reduxjs/toolkit';
import getSaleRepository from 'repository/sale/getSaleRepository';

export const saleReducer = createSlice({
  name: 'sales',
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

    onInit: (state, actions) => {
      try {
        const items = actions.payload?.items?.map((item) => {
          return {
            customer: item?.owner?.firstName + ' ' + item?.owner?.lastName,
            remaining:
              item?.totalCouponSerialCodeAmount -
              item?.totalCouponSerialCodeUsed,
            ...item,
          };
        });
        state.data = items;
        state.nextToken = actions.payload.nextToken;
        state.count = actions.payload.length;
        state.isLoading = false;
      } catch (e) {
        console.log(e);
      }
    },
    onRefresh: (state, actions) => {
      state.isLoading = true;
      state.data = [];
    },
    onAddOneItem: (state, actions) => {
      const item = {
        customer:
          actions.payload?.owner?.firstName +
          ' ' +
          actions?.payload?.owner?.lastName,
        remaining:
          actions?.payload?.totalCouponSerialCodeAmount -
          actions?.payload?.totalCouponSerialCodeUsed,
        ...actions?.payload,
      };
      state.data = [item, ...state.data];
    },
    onEdit: (state, actions) => {
      for (let index = 0; index < state.data.length; index++) {
        if (state.data[index].id === actions.payload.id) {
          const sale = {
            ...actions.payload,
            customer:
              actions.payload.owner.firstName +
              ' ' +
              actions.payload.owner.lastName,
            remaining:
              actions.payload.totalCouponSerialCodeAmount -
              actions.payload.totalCouponSerialCodeUsed,
          };
          state.isLoading = false;
          state.data[index] = sale;
        }
      }
    },
    onRemove: (state, actions) => {
      let data = state.data.filter((e) => e.id !== actions.payload.id);
      state.data = data;
    },
    onNextPage: (state, actions) => {
      const items = actions.payload?.items?.map((item) => {
        return {
          customer: item.owner.firstName + ' ' + item.owner.lastName,
          remaining:
            item.totalCouponSerialCodeAmount - item.totalCouponSerialCodeUsed,
          ...item,
        };
      });
      state.isLoading = false;
      state.data = [...state.data, ...items];
      state.nextToken = actions.payload?.nextToken;
    },
  },
});

export const fetchSales =
  (nextToken = null) =>
  (dispatch) => {
    dispatch(onRefresh());
    getSaleRepository()
      .then((result) => {
        dispatch(onInit(result.data.listSaleCoupons));
      })
      .catch((e) => {
        dispatch(onLoading());
      });
  };

export const onNextPageSales = (nextToken) => (dispatch) => {
  dispatch(onLoading());
  getSaleRepository({}, 10, nextToken)
    .then((result) => {
      dispatch(onNextPage(result.data.listSaleCoupons));
    })
    .catch((e) => {
      console.log(e);
      dispatch(onLoading());
    });
};

// Action creators are generated for each case reducer function
export const {
  onInit,
  onAddOneItem,
  onRemove,
  onEdit,
  onNextPage,
  onLoading,
  onRefresh,
} = saleReducer.actions;

export default saleReducer.reducer;
