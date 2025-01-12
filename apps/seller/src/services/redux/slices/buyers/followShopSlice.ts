import BASE_URL from '@/services/api/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Define the structure for a FollowedShop and state
export interface FollowedShop {
  id: string;
  shop_name: string;
  shop_logo?: string | null;
  shop_tagline: string;
  total_products: number;
  total_followers: number;
  shop_location?: string | null;
  reviews_percentage?: number | null;
  top_products?: Array<{
    name: string;
    thumbnail: string | null;
    price: string;
    price_in_usd?: string | null;
    price_in_gbp?: string | null;
    price_in_eur?: string | null;
  }>;
}

export interface FollowShopState {
  followedShops: FollowedShop[];
  loading: boolean;
  error: string | null;
}

const initialState: FollowShopState = {
  followedShops: [],
  loading: false,
  error: null,
};

// Follow a shop
export const followShop = createAsyncThunk(
  'followShop/follow',
  async (shopId: string, { rejectWithValue }) => {
    try {
      const token = Cookies.get('buyerAccessToken');
      if (!token) throw new Error('User not authenticated.');

      const response = await axios.post(
        `${BASE_URL}/products/shops/${shopId}/follow/`,
        { shop: shopId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to follow the shop'
      );
    }
  }
);

// Unfollow a shop
export const unfollowShop = createAsyncThunk(
  'followShop/unfollow',
  async (shopId: string, { rejectWithValue }) => {
    try {
      const token = Cookies.get('buyerAccessToken');
      if (!token) throw new Error('User not authenticated.');

      await axios.delete(
        `${BASE_URL}/products/shops/${shopId}/unfollow/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return shopId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to unfollow the shop'
      );
    }
  }
);

// Fetch list of followed shops
export const getFollowedShops = createAsyncThunk(
  'followShop/getFollowedShops',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get('buyerAccessToken');
      if (!token) throw new Error('User not authenticated.');

      const response = await axios.get(
        `${BASE_URL}/profiles/followed_shops/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.results; // Return the list of followed shops
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch followed shops'
      );
    }
  }
);

// Slice
const followShopSlice = createSlice({
  name: 'followShop',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Follow Shop
      .addCase(followShop.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(followShop.fulfilled, (state, action) => {
        state.loading = false;
        state.followedShops.push(action.payload); // Add the followed shop to the state
      })
      .addCase(followShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Unfollow Shop
      .addCase(unfollowShop.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unfollowShop.fulfilled, (state, action) => {
        state.loading = false;
        state.followedShops = state.followedShops.filter(
          shop => shop.id !== action.payload
        ); // Remove the unfollowed shop from the state
      })
      .addCase(unfollowShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get Followed Shops
      .addCase(getFollowedShops.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFollowedShops.fulfilled, (state, action) => {
        state.loading = false;
        state.followedShops = action.payload; // Set the fetched followed shops
      })
      .addCase(getFollowedShops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectFollowedShops = (state: { followShop: FollowShopState }) =>
  state.followShop.followedShops;
export const selectFollowShopLoading = (state: {
  followShop: FollowShopState;
}) => state.followShop.loading;
export const selectFollowShopError = (state: { followShop: FollowShopState }) =>
  state.followShop.error;

// Reducer
export default followShopSlice.reducer;
