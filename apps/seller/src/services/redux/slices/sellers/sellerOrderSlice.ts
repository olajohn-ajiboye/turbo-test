import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import BASE_URL from '@/services/api/api';

// Define the initial state
interface Order {
  id: string;
  booking_id: string;
  ordered_at: string;
  total_price: string;
  status: string;
  product: {
    id: string;
    name: string;
    thumbnail: string;
    total_sold: number;
    price: string;
    discount: string;
    ratings: string;
    reviews: number;
    shop_name: string;
  };
  variation: string | null;
  quantity: number;
  price: string;
  sub_total: string;
}

interface TopProduct {
  name: string;
  total_sold: number;
}

interface TopLocation {
  country: string;
  total_bought: number;
}

interface SellerOrderState {
  id: string | null;
  total_orders: number;
  total_products_sold: number;
  top_5_products: TopProduct[];
  top_5_locations: TopLocation[];
  total_sales: number;
  total_pending_orders: number;
  total_completed_orders: number;
  total_visitors: number;
  new_customers: number;
  total_inventory_value: number;
  total_out_of_stock_products: number;
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: SellerOrderState = {
  id: null,
  total_orders: 0,
  total_products_sold: 0,
  top_5_products: [],
  top_5_locations: [],
  total_sales: 0,
  total_pending_orders: 0,
  total_completed_orders: 0,
  total_visitors: 0,
  new_customers: 0,
  total_inventory_value: 0,
  total_out_of_stock_products: 0,
  orders: [],
  loading: false,
  error: null,
};

// Async thunk to fetch seller orders
export const fetchSellerOrders = createAsyncThunk(
  'sellerOrders/fetchSellerOrders',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const accessToken = state.sellerAuth.tokens.access;

    try {
      const response = await axios.get(
        `${BASE_URL}/profiles/seller/dashboard/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || error.message);
    }
  }
);

// Create the slice
const sellerOrderSlice = createSlice({
  name: 'sellerOrders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSellerOrders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.id = action.payload.id;
        state.total_orders = action.payload.total_orders;
        state.total_products_sold = action.payload.total_products_sold;
        state.top_5_products = action.payload.top_5_products;
        state.total_sales = action.payload.total_sales;
        state.total_visitors = action.payload.total_visitors;
        state.total_completed_orders = action.payload.total_completed_orders;
        state.total_pending_orders = action.payload.total_pending_orders;
        state.total_inventory_value = action.payload.total_inventory_value;

        state.new_customers = action.payload.new_customers;
        state.orders = action.payload.orders;
      })
      .addCase(fetchSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Selector to get seller orders state
export const selectSellerOrders = (state: RootState) => state.sellerOrders;
export const selectSellerOrdersLoading = (state: RootState) =>
  state.sellerOrders.loading;
export const selectSellerOrdersError = (state: RootState) =>
  state.sellerOrders.error;

export default sellerOrderSlice.reducer;
