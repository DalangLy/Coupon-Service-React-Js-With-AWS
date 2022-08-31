import { createSlice } from '@reduxjs/toolkit';
import settingRepository from 'repository/settings/settingRepository';

export const settingReducer = createSlice({
  name: 'settings',
  initialState: {
    loading: true,
    data: [],
  },
  reducers: {
    init: (state, actions) => {
      state.loading = false;
      const payloads = actions.payload.map((val) => {
        return {
          name: val.name,
          body: JSON.parse(JSON.parse(val.body)),
        };
      });
      state.data = payloads;
    },

    updateAppSetting: (state, actions) => {
      if (state.data.length > 0) {
        const payload = { name: state.data[0].name, body: actions.payload };
        state.data = [payload];
      }
    },
  },
});

export const fetchSettings = (payload) => (dispatch) => {
  settingRepository()
    .then((res) => {
      dispatch(init(res));
    })
    .catch((e) => {
      console.log(e);
    });
};

// Action creators are generated for each case reducer function
export const { init, updateAppSetting } = settingReducer.actions;

export default settingReducer.reducer;
