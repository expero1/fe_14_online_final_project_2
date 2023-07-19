import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getLogin from '../../api/getLogin';
import { setErrorMessage } from './errorsSlice';
import { resetToken, saveToken } from './tokenSlice';

const initialState = {
  isFetching: false,
  isFetched: false,
  token: null,
};
export const login = createAsyncThunk(
  'login/fetch',
  async ({ loginOrEmail, password }, { dispatch }) => {
    try {
      const { token } = await getLogin(loginOrEmail, password);
      dispatch(saveToken(token));
      return token;
    } catch (error) {
      setErrorMessage(error.message);
      throw error;
    }
  }
);
export const logout = createAsyncThunk('logout', (_, { dispatch }) => {
  dispatch(resetToken());
});

const loginSlice = createSlice({
  name: 'login',
  initialState,
  //   reducers: {
  //     logout: (state) => {
  //       state.token = null;
  //       state.isLoading = false;
  //       state.isLoaded = false;
  //     },
  //   },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isLoaded = true;
      //   state.token = payload;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.isLoaded = false;
    });
  },
});
// export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
