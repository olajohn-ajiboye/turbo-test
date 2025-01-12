import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { selectIsAuthenticated } from './authSlice';
import BASE_URL from '@/services/api/api';

export interface UserProfile {
  id: string;
  user: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  gender: string | null;
  birth_date: string | null;
  country: string | null;
  total_orders: string | null;
  pending_orders: string | null;
}

export interface ProfileState {
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  userProfile: null,
  loading: false,
  error: null,
};

// Thunk to fetch user profile data if the user is authenticated
export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const isAuthenticated = selectIsAuthenticated(state);

    // Only proceed if the user is authenticated
    if (!isAuthenticated) {
      console.log('User is not authenticated, skipping profile fetch.');
      return rejectWithValue('User is not authenticated');
    }

    const accessToken = state.auth.tokens.access;
    if (!accessToken) {
      return rejectWithValue('No access token found');
    }

    try {
      const response = await axios.get(
        `${BASE_URL}/profiles/buyer_profile/`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch profile');
    }
  }
);

// Thunk to update user profile data
export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async (updatedData: Partial<UserProfile>, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const accessToken = state.auth.tokens.access;
    try {
      const response = await axios.put(
        `${BASE_URL}/profiles/buyer_profile/`,
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
        error.response?.data || 'Failed to update profile'
      );
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectUserProfile = (state: RootState) =>
  state.profile.userProfile;

export default profileSlice.reducer;
