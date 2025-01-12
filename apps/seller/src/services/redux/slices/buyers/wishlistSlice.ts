import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { RootState } from '../../store';
import BASE_URL from '@/services/api/api';

// Define the structure for Wishlist Items and State
export interface WishlistItem {
  id: string; // Wishlist entry ID
  productId: string; // Actual product ID
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

export interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
}

// Initial state for the Wishlist slice
const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};

// Fetch all wishlist items
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get('buyerAccessToken');
      if (!token) {
        throw new Error('Authorization token is missing.');
      }

      const response = await axios.get(
        `${BASE_URL}/products/wishlist/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data.results || !Array.isArray(response.data.results)) {
        console.error('Unexpected API Response:', response.data);
        throw new Error('API returned an unexpected response.');
      }

      // Map and handle the actual structure
      return response.data.results.map((item: any) => ({
        id: item.id,
        productId: item.product.id,
        name: item.product.name,
        thumbnail: item.product.thumbnail,
        totalSold: item.product.total_sold || 0,
        price: item.product.price || '0.00',
        discount: item.product.discount || '0.00',
        ratings: item.product.ratings || '0.0',
        reviews: item.product.reviews || 0,
        shopName: item.product.shop_name || 'Unknown Shop',
        createdAt: item.created_at,
      }));
    } catch (error: any) {
      console.error(
        'Error Fetching Wishlist:',
        error.response?.data || error.message
      ); // Log error details
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch wishlist'
      );
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productId: string, { rejectWithValue }) => {
    try {
      const token = Cookies.get('buyerAccessToken');
      if (!token) {
        throw new Error('Authorization token is missing.');
      }

      const response = await axios.post(
        `${BASE_URL}/products/wishlist/create/`,
        { product: productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Response Data:', response.data);

      // Return structured wishlist item
      return {
        id: response.data.id,
        productId: productId,
        name: response.data.product,
        thumbnail: '',
        totalSold: 0,
        price: '0.00',
        discount: '0.00',
        ratings: '0.0',
        reviews: 0,
        shopName: '',
        createdAt: response.data.created_at,
      };
    } catch (error: any) {
      console.error('Error details:', error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to add to wishlist'
      );
    }
  }
);

// Remove an item from the wishlist
export const deleteFromWishlist = createAsyncThunk(
  'wishlist/deleteFromWishlist',
  async (wishlistId: string, { rejectWithValue }) => {
    try {
      console.log('Deleting Wishlist Item with ID:', wishlistId); // Debug the ID
      const token = Cookies.get('buyerAccessToken');
      if (!token) {
        throw new Error('Authorization token is missing.');
      }

      const response = await axios.delete(
        `${BASE_URL}/products/wishlist/${wishlistId}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Delete Response Status:', response.status);
      return wishlistId;
    } catch (error: any) {
      console.error(
        'Error Deleting Wishlist Item:',
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to delete from wishlist'
      );
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Replace items with the fetched data
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add to Wishlist
      .addCase(addToWishlist.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload); // Add the new item to the wishlist
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete from Wishlist
      .addCase(deleteFromWishlist.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload); // Remove the item from the wishlist
      })
      .addCase(deleteFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Selectors for accessing wishlist state
export const selectWishlistItems = (state: RootState) => state.wishlist.items;
export const selectWishlistLoading = (state: RootState) =>
  state.wishlist.loading;
export const selectWishlistError = (state: RootState) => state.wishlist.error;

export default wishlistSlice.reducer;
