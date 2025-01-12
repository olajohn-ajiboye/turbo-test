import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { selectIsSellerAuthenticated } from './sellerAuthSlice';
import BASE_URL from '@/services/api/api';

export interface SellerProfile {
  id: string;
  user: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  gender: string | null;
  birth_date: string | null;
  country: string | null;
  city: string | null;
  nationality: string | null;
  state: string | null;
  zip_code: string | null;
  address_1: string | null;
  address_2: string | null;
}

export interface SellerProfileState {
  sellerProfile: SellerProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: SellerProfileState = {
  sellerProfile: null,
  loading: false,
  error: null,
};

// Fetch seller profile only if the user is authenticated
export const fetchSellerProfile = createAsyncThunk(
  'sellerProfile/fetchSellerProfile',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const isAuthenticated = selectIsSellerAuthenticated(state);

    // Only proceed if the user is authenticated
    if (!isAuthenticated) {
      console.log('User is not authenticated, skipping profile fetch.');
      return rejectWithValue('User is not authenticated');
    }

    const accessToken = state.sellerAuth.tokens.access;
    if (!accessToken) {
      return rejectWithValue('No access token found');
    }

    try {
      const response = await axios.get(
        `${BASE_URL}/profiles/seller_profile/`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch seller profile'
      );
    }
  }
);

// Update seller profile data
export const updateSellerProfile = createAsyncThunk(
  'sellerProfile/updateSellerProfile',
  async (
    updatedData: Partial<SellerProfile>,
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const accessToken = state.sellerAuth.tokens.access;

    try {
      const response = await axios.put(
        `${BASE_URL}/profiles/seller_profile/`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Failed to update seller profile'
      );
    }
  }
);

const sellerProfileSlice = createSlice({
  name: 'sellerProfile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSellerProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerProfile = action.payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateSellerProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerProfile = action.payload;
      })
      .addCase(updateSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectSellerProfile = (state: RootState) =>
  state.sellerProfile.sellerProfile;

export default sellerProfileSlice.reducer;
