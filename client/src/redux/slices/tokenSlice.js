import { createSlice } from '@reduxjs/toolkit';

const initialState = { token: null };
const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    saveToken: (state, { payload: token }) => {
      state.token = token;
    },
    resetToken: (state) => {
      state.token = null;
    },
  },
});
export const { saveToken, resetToken } = tokenSlice.actions;
export default tokenSlice.reducer;
