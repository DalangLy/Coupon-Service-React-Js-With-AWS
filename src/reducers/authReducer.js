import { createSlice } from '@reduxjs/toolkit';
import findUserRepository from 'repository/user/findUserRepository';

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    loading: true,
    user: {},
    roles: {},
    userType: [],
  },
  reducers: {
    login: (state, actions) => {
      state.userType =
        actions.payload.groups === undefined ? [] : actions.payload.groups;
      state.user = actions.payload.user;
    },
    logout: (state) => {
      state.value = false;
    },
    userAuth: (state, actions) => {
      state.user = actions.payload;
      state.loading = false;
    },
  },
});

export const authGetUser = (payload) => (dispatch) => {
  const groups =
    payload.signInUserSession.accessToken.payload['cognito:groups'];
  const user = payload.attributes;
  dispatch(login({ groups, user }));
  findUserRepository(payload.username).then((res) => {
    dispatch(userAuth(res));
  });
};

export const authProfile = (payload) => (dispatch) => {
  findUserRepository(payload).then((res) => {
    dispatch(userAuth(res));
  });
};

// Action creators are generated for each case reducer function
export const { login, logout, userAuth } = authReducer.actions;

export default authReducer.reducer;
