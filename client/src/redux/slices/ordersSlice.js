import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getOrders from '../../api/getOrders';

const initialState = { orders: [], isFetching: false, isFetched: false };
export const fetchOrders = createAsyncThunk(
  'fetchOrders',
  (_, { getState }) => {
    const { token } = getState().token;
    return getOrders({ token });
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.isFetched = true;
      state.isFetching = true;
      state.orders = action.orders;
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      console.log('rejected');
      state.isFetched = false;
      state.isFetching = false;
    });
  },
});
export default ordersSlice.reducer;
