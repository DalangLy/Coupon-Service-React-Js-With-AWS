import { createSlice } from '@reduxjs/toolkit';
import getCurrentUserGroup from 'repository/group/getCurrentUserGroup';
import userRepository from 'repository/user/userRepository';

export const userRoleReducer = createSlice({
  name: 'users',
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
    onInitUsers: (state, actions) => {
      let users = actions.payload?.items?.map((e) => {
        return {
          ...e,
          name: e.firstName + ' ' + e.lastName,
          status:
            e.deletedAt === undefined ||
            e.deletedAt === '' ||
            e.deletedAt === null
              ? 'Disable'
              : 'Enable',
        };
      });

      state.data = users;
      state.nextToken = actions.payload.nextToken;
      state.isLoading = false;
    },
    onAddOneRole: (state, actions) => {
      const user = {
        ...actions.payload,
        name: actions.payload.firstName + ' ' + actions.payload.lastName,
        status:
          actions.payload.deletedAt === undefined ||
          actions.payload.deletedAt === '' ||
          actions.payload.deletedAt === null
            ? 'Disable'
            : 'Enable',
      };
      state.data = [user, ...state.data];
    },
    onUpdateUserReducer: (state, actions) => {
      const findItemById = (element) => element.id === actions.payload.id;
      const index = state.data.findIndex(findItemById);
      const user = {
        ...actions.payload,
        name: actions.payload.firstName + ' ' + actions.payload.lastName,
        status:
          actions.payload.deletedAt === undefined ||
          actions.payload.deletedAt === '' ||
          actions.payload.deletedAt === null
            ? 'Disable'
            : 'Enable',
      };
      state.data[index] = user;
    },
    onRemoveUser: (state, actions) => {
      let users = state.data.filter((e) => e.id !== actions.payload.id);
      state.data = users;
    },
    nextPage: (state, actions) => {
      let users = actions.payload?.items.map((e) => {
        return {
          ...e,
          name: e.firstName + ' ' + e.lastName,
          status:
            e.deletedAt === undefined ||
            e.deletedAt === '' ||
            e.deletedAt === null
              ? 'Disabled'
              : 'Enabled',
        };
      });

      state.isLoading = false;
      state.data = [...state.data, ...users];
      state.nextToken = actions.payload.nextToken;
    },
  },
});

export const addOneItem = (item) => (dispatch) => {
  dispatch(onAddOneRole(item));
};

export const fetchUsers = () => async (dispatch) => {
  let data = await userRepository();
  dispatch(onInitUsers(data));
};

export const onNextPageUser = (filter, nextToken) => async (dispatch) => {
  dispatch(onLoading());
  await userRepository(filter, 50, nextToken)
    .then((res) => {
      dispatch(nextPage(res));
    })
    .catch((e) => {
      dispatch(onLoading());
    });
};

// Action creators are generated for each case reducer function
export const {
  onInitUsers,
  onAddOneRole,
  onRemoveUser,
  onUpdateUserReducer,
  onLoading,
  nextPage,
} = userRoleReducer.actions;

export default userRoleReducer.reducer;
