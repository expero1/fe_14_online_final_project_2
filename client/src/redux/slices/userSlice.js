import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getUser from '../../api/getUser';
import { setErrorMessage } from './errorsSlice';

export const fetchUserInfo = createAsyncThunk(
  'user-info/fetch',
  async (_, { dispatch, getState }) => {
    const { token } = getState().token;
    // return getUser({ token });
    try {
      return await getUser({ token });
    } catch (error) {
      dispatch(setErrorMessage(error.message));
      throw error;
    }
  }
);
const initialState = { isFetching: true, isFetched: true, user: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserInfo: (state) => {
      state.isFetching = false;
      state.isFetched = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isFetching = false;
      state.isFetched = true;
    });
    builder.addCase(fetchUserInfo.rejected, (state) => {
      state.isFetching = false;
      state.isFetched = false;
    });
  },
});
export const { resetUserInfo } = userSlice.actions;
export default userSlice.reducer;
