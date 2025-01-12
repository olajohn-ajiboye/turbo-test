import BASE_URL from '@/services/api/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface BuyerShopState {
  shop: {
    id: string;
    shop_name: string;
    shop_type: string;
    logo: string;
    cover_photo: string;
    tagline: string;
    description: string;
    main_category: string;
    products: Array<{
      id: string;
      name: string;
      thumbnail: string;
      total_sold: number;
      price: string;
      discount: string;
      ratings: string;
      reviews: number;
      shop_name: string;
    }>;
    featured_products: Array<{
      id: string;
      name: string;
      thumbnail: string;
      total_sold: number;
      price: string;
      discount: string;
      ratings: string;
      reviews: number;
      shop_name: string;
    }>;
    country: string;
    state: string;
    total_products_sold: number;
    total_followers: number;
    total_reviews: number;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: BuyerShopState = {
  shop: null,
  loading: false,
  error: null,
};

// Async thunk to fetch buyer shop details
export const fetchBuyerShopDetails = createAsyncThunk(
  'buyerShop/fetchBuyerShopDetails',
  async (shopId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/products/shops/${shopId}/`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch buyer shop details'
      );
    }
  }
);

// Create the buyer shop slice
const buyerShopSlice = createSlice({
  name: 'buyerShop',
  initialState,
  reducers: {
    clearBuyerShopState: state => {
      state.shop = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBuyerShopDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyerShopDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.shop = action.payload;
      })
      .addCase(fetchBuyerShopDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearBuyerShopState } = buyerShopSlice.actions;

export const selectBuyerShopDetails = (state: { buyerShop: BuyerShopState }) =>
  state.buyerShop.shop;
export const selectBuyerShopLoading = (state: { buyerShop: BuyerShopState }) =>
  state.buyerShop.loading;
export const selectBuyerShopError = (state: { buyerShop: BuyerShopState }) =>
  state.buyerShop.error;

export default buyerShopSlice.reducer;
