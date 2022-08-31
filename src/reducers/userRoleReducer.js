import { createSlice } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';

export const userRoleReducer = createSlice({
  name: 'user-role',
  initialState: {
    isLoading: true,
    roles: [],
    count: 0,
    value: [],
  },
  reducers: {
    onInitRole: (state, actions) => {
      state.roles = [];
      state.roles = actions.payload.Items;
      state.count = actions.payload.count;
      state.isLoading = false;
    },
    onAddOneRole: (state, actions) => {
      state.roles = [actions.payload, ...state.roles];
    },
    onDeleteRole: (state, actions) => {
      const data = state.roles.filter((e) => e.id !== actions.payload.id);
      state.roles = data;
    },
    onUpdateRole: (state, actions) => {
      for (let index = 0; index < state.roles.length; index++) {
        if (state.roles[index].id === actions.payload.id) {
          state.roles[index] = actions.payload;
        }
      }
    },
  },
});

export const addOneItem = (item) => (dispatch) => {
  dispatch(onAddOneRole(item));
};

export const fetchUserRole = () => (dispatch) => {
  const apiName = 'roles';
  const path = '/roles';
  const myInit = {
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {
      // OPTIONAL
      name: '',
    },
  };

  API.get(apiName, path, myInit)
    .then((response) => {
      const data = response.data.data;
      dispatch(onInitRole(data));
    })
    .catch((error) => {});
};

// Action creators are generated for each case reducer function
export const { onInitRole, onAddOneRole, onDeleteRole, onUpdateRole } =
  userRoleReducer.actions;

export default userRoleReducer.reducer;
