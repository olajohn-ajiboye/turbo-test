import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import BASE_URL from '@/services/api/api';

export interface ShopState {
  id: string | null;
  shop_name: string | null;
  shop_type: string | null;
  tagline: string | null;
  shop_currency: string | null;
  shop_about: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  description: string | null;
  main_category: { id: string; name: string } | null;
  main_category_id: string | null;
  sub_category_id: string | null;
  facebook: string | null;
  instagram: string | null;
  tiktok: string | null;
  twitter: string | null;
  logo: string | null;
  cover_photo: string | null;
  shop_phone_number: string | null;
  shop_email: string | null;
  zip_code: string | null;
  address_1: string | null;
  address_2: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ShopState = {
  id: null,
  shop_name: null,
  shop_type: null,
  shop_about: null,
  tagline: null,
  country: null,
  state: null,
  city: null,
  description: null,
  main_category: null,
  main_category_id: null,
  sub_category_id: null,
  shop_currency: null,
  shop_phone_number: null,
  zip_code: null,
  address_1: null,
  address_2: null,
  shop_email: null,
  facebook: null,
  instagram: null,
  tiktok: null,
  twitter: null,
  logo: null,
  cover_photo: null,
  loading: false,
  error: null,
};

// Thunk to fetch shop details
export const fetchShopDetails = createAsyncThunk(
  'shop/fetchShopDetails',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const accessToken = state.sellerAuth.tokens.access;

    try {
      const response = await axios.get(
        `${BASE_URL}/products/shop/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || error.message);
    }
  }
);

// Thunk to update shop details
export const updateShopDetails = createAsyncThunk(
  'shop/updateShopDetails',
  async (
    updatedData: Partial<ShopState> | FormData,
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const accessToken = state.sellerAuth.tokens.access;

    try {
      const response = await axios.put(
        `${BASE_URL}/products/shop/`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type':
              updatedData instanceof FormData
                ? 'multipart/form-data'
                : 'application/json',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || error.message);
    }
  }
);

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch shop details
      .addCase(fetchShopDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        Object.assign(state, action.payload);
      })
      .addCase(fetchShopDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update shop details
      .addCase(updateShopDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShopDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        Object.assign(state, action.payload);
      })
      .addCase(updateShopDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectShopDetails = (state: RootState) => state.shop;
export const selectShopLoading = (state: RootState) => state.shop.loading;
export const selectShopError = (state: RootState) => state.shop.error;

export default shopSlice.reducer;
