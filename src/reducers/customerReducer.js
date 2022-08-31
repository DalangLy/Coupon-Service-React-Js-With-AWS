import { createSlice } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';

export const customerReducer = createSlice({
  name: 'customers',
  initialState: {
    isLoading: true,
    data: [],
    count: 0,
  },
  reducers: {
    onInitUsers: (state, actions) => {
      state.data = [];
      state.data = actions.payload.Items;
      state.count = actions.payload.count;
      state.isLoading = false;
    },
    onAddOneCustomer: (state, actions) => {
      state.data = [actions.payload, ...state.data];
    },
    onUpdateCustomer: (state, actions) => {
      for (let index = 0; index < state.data.length; index++) {
        if (state.data[index].id === actions.payload.id) {
          state.data[index] = actions.payload;
        }
      }
    },
    onRemoveCustomer: (state, actions) => {
      let users = state.data.filter((e) => e.id !== actions.payload.id);
      state.data = users;
    },
  },
});

export const addOneCustomer = (item) => (dispatch) => {
  dispatch(onAddOneCustomer(item));
};

export const fetchCustomer = () => (dispatch) => {
  const apiName = 'customers';
  const path = '/customers';
  const myInit = {
    headers: {}, // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {
      // OPTIONAL
      name: '',
    },
  };

  API.get(apiName, path, myInit)
    .then((response) => {
      const data = response.data.data;
      dispatch(onInitUsers(data));
    })
    .catch((error) => {});
};

// Action creators are generated for each case reducer function
export const {
  onInitUsers,
  onAddOneCustomer,
  onRemoveCustomer,
  onUpdateCustomer,
} = customerReducer.actions;

export default customerReducer.reducer;
