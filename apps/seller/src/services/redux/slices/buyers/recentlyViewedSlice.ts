import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { RootState } from '../../store';
import BASE_URL from '@/services/api/api';

export interface RecentlyViewedProduct {
  id: string; // Recently viewed entry ID
  productId: string; // Product ID
  name: string;
  thumbnail: string;
  totalSold: number;
  price: string;
  discount: string;
  ratings: string;
  reviews: number;
  shopName: string;
  createdAt: string;
}

export interface RecentlyViewedState {
  items: RecentlyViewedProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: RecentlyViewedState = {
  items: [],
  loading: false,
  error: null,
};
export const createRecentlyViewed = createAsyncThunk(
  'recentlyViewed/createRecentlyViewed',
  async (productId: string, { rejectWithValue }) => {
    try {
      const token = Cookies.get('buyerAccessToken'); // Get the token
      const response = await axios.post(
        `${BASE_URL}/products/recently_viewed/create/`,
        { product: productId }, // Only send the product ID
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header
          },
        }
      );

      // Return the structured recently viewed product
      return {
        id: response.data.id,
        productId: response.data.product,
        name: response.data.product_details.name,
        thumbnail: response.data.product_details.thumbnail,
        totalSold: response.data.product_details.total_sold,
        price: response.data.product_details.price,
        discount: response.data.product_details.discount,
        ratings: response.data.product_details.ratings,
        reviews: response.data.product_details.reviews,
        shopName: response.data.product_details.shop_name,
        createdAt: response.data.created_at,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail ||
          'Failed to create recently viewed product'
      );
    }
  }
);
export const fetchRecentlyViewed = createAsyncThunk(
  'recentlyViewed/fetchRecentlyViewed',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get('buyerAccessToken');
      const response = await axios.get(
        `${BASE_URL}/products/recently_viewed/`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header
          },
        }
      );

      // Map the response to the correct structure
      const recentlyViewedItems = response.data.results.map((item: any) => ({
        id: item.id,
        productId: item.product.id,
        name: item.product.name,
        thumbnail: item.product.thumbnail,
        totalSold: item.product.total_sold,
        price: item.product.price,
        discount: item.product.discount,
        ratings: item.product.ratings,
        reviews: item.product.reviews,
        shopName: item.product.shop_name,
        createdAt: item.created_at,
      }));

      return recentlyViewedItems;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail ||
          'Failed to fetch recently viewed products'
      );
    }
  }
);
const recentlyViewedSlice = createSlice({
  name: 'recentlyViewed',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch Recently Viewed
      .addCase(fetchRecentlyViewed.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentlyViewed.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecentlyViewed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Recently Viewed
      .addCase(createRecentlyViewed.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRecentlyViewed.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload); // Add the new item
      })
      .addCase(createRecentlyViewed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const selectRecentlyViewedItems = (state: RootState) =>
  state.recentlyViewed.items;
export const selectRecentlyViewedLoading = (state: RootState) =>
  state.recentlyViewed.loading;
export const selectRecentlyViewedError = (state: RootState) =>
  state.recentlyViewed.error;
export default recentlyViewedSlice.reducer;
