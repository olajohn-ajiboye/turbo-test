import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { RootState } from '../../store';
import { BuyerOrder } from '../../../../types/types';
import BASE_URL from '@/services/api/api';

// Orders state
interface OrdersState {
  orders: BuyerOrder[];
  count: number;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: OrdersState = {
  orders: [],
  count: 0,
  loading: false,
  error: null,
};

// Fetch orders
export const fetchBuyerOrders = createAsyncThunk(
  'orders/fetchBuyerOrders',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get('buyerAccessToken');
      const response = await axios.get(
        `${BASE_URL}/profiles/buyer/orders/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        orders: response.data.results,
        count: response.data.count,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch buyer orders'
      );
    }
  }
);

// Orders slice
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBuyerOrders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.count = action.payload.count;
      })
      .addCase(fetchBuyerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectBuyerOrders = (state: RootState) => state.orders.orders;
export const selectOrdersCount = (state: RootState) => state.orders.count;
export const selectOrdersLoading = (state: RootState) => state.orders.loading;
export const selectOrdersError = (state: RootState) => state.orders.error;

export default ordersSlice.reducer;
