import { createSlice } from '@reduxjs/toolkit';
import getPackageRepository from 'repository/package/getPackageRepository';

export const packageReducer = createSlice({
  name: 'package',
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
    onInit: (state, actions) => {
      state.data = actions.payload.items;
      state.nextToken = actions.payload.nextToken;
      state.count = actions.payload.length;
      state.isLoading = false;
    },
    onAddOneItem: (state, actions) => {
      state.data = [actions.payload, ...state.data];
    },
    onEdit: (state, actions) => {
      for (let index = 0; index < state.data.length; index++) {
        if (state.data[index].id === actions.payload.id) {
          state.data[index] = actions.payload;
        }
      }
    },
    onRemove: (state, actions) => {
      let data = state.data.filter((e) => e.id !== actions.payload.id);
      state.data = data;
    },
    onNextPage: (state, actions) => {
      state.isLoading = false;
      state.data = [...state.data, ...actions.payload.items];
      state.nextToken = actions.payload.nextToken;
      state.count = actions.payload.length;
    },
  },
});

export const fetchPackages = () => (dispatch) => {
  dispatch(onRefresh());
  getPackageRepository()
    .then((result) => {
      dispatch(onInit(result.data.listPackages));
    })
    .catch((e) => {
      dispatch(onLoading());
    });
};

export const onNextPagePackages = (filter, nextToken) => (dispatch) => {
  dispatch(onLoading());
  getPackageRepository(filter, 100, nextToken)
    .then((result) => {
      dispatch(onNextPage(result.data.listPackages));
    })
    .catch((e) => {
      dispatch(onLoading());
    });
};

// Action creators are generated for each case reducer function
export const {
  onInit,
  onAddOneItem,
  onRemove,
  onEdit,
  onLoading,
  onNextPage,
  onRefresh,
} = packageReducer.actions;

export default packageReducer.reducer;
