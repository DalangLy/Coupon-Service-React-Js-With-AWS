import { createSlice } from '@reduxjs/toolkit';

export const groupReducer = createSlice({
  name: 'group',
  initialState: {
    data: [
      {
        name: 'Administrators',
        precedence: 1,
        description: 'Administrators full access',
      },
      {
        name: 'Sales',
        precedence: 2,
        description: 'Administrators full access',
      },
      {
        name: 'Finances',
        precedence: 4,
        description: 'View Reports',
      },
      {
        name: 'Supports',
        precedence: 3,
        description: 'View own Reports and Ticket Operation',
      },
      {
        name: 'Guests',
        precedence: 5,
        description: 'Request Generate Coupon and View own reports',
      },
    ],
  },
  reducers: {
    set: (state, actions) => {},
  },
});

// Action creators are generated for each case reducer function
export const { set } = groupReducer.actions;

export default groupReducer.reducer;
