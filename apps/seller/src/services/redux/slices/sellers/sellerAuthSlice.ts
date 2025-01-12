import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { RootState } from '../../store';
import BASE_URL from '@/services/api/api';

export interface Tokens {
  access: string | null;
  refresh: string | null;
}

export interface SellerAuthState {
  user: any;
  tokens: Tokens;
  loading: boolean;
  error: string | null;
  is_verified: boolean | null;
  is_new_user: boolean | null;
  is_seller: boolean | null;
  is_onboarded: boolean | null;
}

const initialState: SellerAuthState = {
  user: null,
  tokens: {
    access: Cookies.get('sellerAccessToken') || null,
    refresh: Cookies.get('sellerRefreshToken') || null,
  },
  loading: false,
  error: null,
  is_verified: Cookies.get('sellerIsVerified') === 'true' ? true : null,
  is_new_user: Cookies.get('sellerIsNewUser') === 'true' ? true : null,
  is_seller: Cookies.get('isSeller') === 'true' ? true : null,
  is_onboarded: Cookies.get('isOnboarded') === 'true' ? true : null,
};

// Login and store cookies with 7-day expiration
export const sellerSocialAuthLogin = createAsyncThunk(
  'sellerAuth/sellerSocialAuthLogin',
  async (payload: {
    email: string;
    first_name: string;
    last_name: string;
    provider: string;
    provider_id: string;
  }) => {
    const response = await axios.post(
      `${BASE_URL}/users/seller_social_auth/`,
      payload
    );

    const {
      access,
      refresh,
      is_verified,
      is_new_user,
      is_seller,
      is_onboarded,
    } = response.data.tokens;
    Cookies.set('sellerAccessToken', access, { expires: 7 });
    Cookies.set('sellerRefreshToken', refresh, { expires: 7 });
    Cookies.set('sellerIsVerified', String(is_verified), { expires: 7 });
    Cookies.set('sellerIsNewUser', String(is_new_user), { expires: 7 });
    Cookies.set('isSeller', String(is_seller), { expires: 7 });
    Cookies.set('isOnboarded', String(is_onboarded), { expires: 7 });

    return response.data;
  }
);

export const registerSeller = createAsyncThunk(
  'sellerAuth/registerSeller',
  async (
    payload: {
      email: string;
      first_name: string;
      last_name: string;
      password: string;
      phone_number: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/register_seller/`,
        payload
      );

      // Check if the response indicates email verification is required
      if (!response.data.is_verified) {
        return {
          email: payload.email,
          is_verified: false,
        };
      }

      // If verified, set tokens
      const { access, refresh } = response.data.tokens || {};
      if (access && refresh) {
        Cookies.set('sellerAccessToken', access, { expires: 7 });
        Cookies.set('sellerRefreshToken', refresh, { expires: 7 });
      }

      return response.data;
    } catch (error: any) {
      console.error('Error details:', error.response?.data);
      return rejectWithValue(error.response?.data || 'Registration failed');
    }
  }
);

export const loginSeller = createAsyncThunk(
  'auth/loginSeller',
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/login/seller/`,
        payload
      );

      const {
        access,
        refresh,
        is_verified,
        is_new_user,
        is_seller,
        is_onboarded,
      } = response.data;

      // Save tokens and other states in cookies
      Cookies.set('sellerAccessToken', access, { expires: 7 });
      Cookies.set('sellerRefreshToken', refresh, { expires: 7 });
      Cookies.set('sellerIsVerified', String(is_verified), { expires: 7 });
      Cookies.set('sellerIsNewUser', String(is_new_user), { expires: 7 });
      Cookies.set('isSeller', String(is_seller), { expires: 7 });
      Cookies.set('isOnboarded', String(is_onboarded), { expires: 7 });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || 'Invalid credentials, try again'
      );
    }
  }
);

export const sellerVerifyEmailOtp = createAsyncThunk(
  'auth/verifyEmailOtp',
  async (payload: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/verify_email/`,
        payload
      );
      return response.data; // Return the entire response (which contains "detail")
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || 'OTP verification failed'
      );
    }
  }
);

const sellerAuthSlice = createSlice({
  name: 'sellerAuth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.tokens = { access: null, refresh: null };
      state.is_verified = null;
      state.is_new_user = null;
      state.is_seller = null;
      state.is_onboarded = null;

      // Remove cookies on logout
      Cookies.remove('sellerAccessToken');
      Cookies.remove('sellerRefreshToken');
      Cookies.remove('sellerIsVerified');
      Cookies.remove('sellerIsNewUser');
      Cookies.remove('isSeller');
      Cookies.remove('isOnboarded');
    },

    syncAuthStateFromCookies: state => {
      state.tokens = {
        access: Cookies.get('sellerAccessToken') || null,
        refresh: Cookies.get('sellerRefreshToken') || null,
      };
      state.is_verified =
        Cookies.get('sellerIsVerified') === 'true' ? true : null;
      state.is_new_user =
        Cookies.get('sellerIsNewUser') === 'true' ? true : null;
      state.is_seller = Cookies.get('isSeller') === 'true' ? true : null;
      state.is_onboarded = Cookies.get('isOnboarded') === 'true' ? true : null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sellerSocialAuthLogin.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sellerSocialAuthLogin.fulfilled, (state, action) => {
        const { is_verified, is_new_user, is_seller, is_onboarded, tokens } =
          action.payload;
        state.loading = false;
        state.user = action.payload;
        state.tokens = {
          access: tokens.access,
          refresh: tokens.refresh,
        };
        state.is_verified = is_verified;
        state.is_new_user = is_new_user;
        state.is_seller = is_seller;
        state.is_onboarded = is_onboarded;
      })
      .addCase(sellerSocialAuthLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Seller authentication failed';
      })
      .addCase(registerSeller.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerSeller.fulfilled, (state, action) => {
        if (action.payload.is_verified === false) {
          state.loading = false;
          state.error = null;
          state.user = { email: action.payload.email }; // Store email for OTP verification
          return; // Exit without setting tokens
        }

        const { is_verified, is_new_user, is_seller, is_onboarded, tokens } =
          action.payload;
        state.loading = false;
        state.user = action.payload;
        state.tokens = {
          access: tokens.access,
          refresh: tokens.refresh,
        };
        state.is_verified = is_verified;
        state.is_new_user = is_new_user;
        state.is_seller = is_seller;
        state.is_onboarded = is_onboarded;
      })
      .addCase(registerSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // seller Login
      .addCase(loginSeller.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginSeller.fulfilled, (state, action) => {
        const {
          is_verified,
          is_new_user,
          is_seller,
          is_onboarded,
          tokens,
          user,
        } = action.payload;

        // Save tokens and other states in cookies
        Cookies.set('sellerAccessToken', tokens.access, { expires: 7 });
        Cookies.set('sellerRefreshToken', tokens.refresh, { expires: 7 });
        Cookies.set('sellerIsVerified', String(is_verified), { expires: 7 });
        Cookies.set('sellerIsOnboarded', String(is_onboarded), { expires: 7 });
        Cookies.set('sellerIsNewUser', String(is_new_user), { expires: 7 });
        Cookies.set('isSeller', String(is_seller), { expires: 7 });
        Cookies.set('sellerUser', JSON.stringify(user), { expires: 7 }); // Save user details

        state.loading = false;
        state.user = user;
        state.tokens = {
          access: tokens.access,
          refresh: tokens.refresh,
        };
        state.is_verified = is_verified;
        state.is_new_user = is_new_user;
        state.is_seller = is_seller;
        state.is_onboarded = is_onboarded;
      })
      .addCase(loginSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // OTP Verification
      .addCase(sellerVerifyEmailOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sellerVerifyEmailOtp.fulfilled, (state, action) => {
        const { is_verified, is_new_user, is_seller, is_onboarded, tokens } =
          action.payload;
        state.loading = false;
        state.user = action.payload;
        state.tokens = {
          access: tokens.access,
          refresh: tokens.refresh,
        };
        state.is_verified = is_verified;
        state.is_new_user = is_new_user;
        state.is_seller = is_seller;
        state.is_onboarded = is_onboarded;
      })
      .addCase(sellerVerifyEmailOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectIsSellerAuthenticated = (state: RootState) =>
  !!state.sellerAuth.tokens.access;
export const selectSellerUser = (state: RootState) => state.sellerAuth.user;
export const selectIsVerified = (state: RootState) =>
  state.sellerAuth.is_verified;
export const selectIsNewUser = (state: RootState) =>
  state.sellerAuth.is_new_user;
export const selectIsSeller = (state: RootState) => state.sellerAuth.is_seller;
export const selectIsOnboarded = (state: RootState) =>
  state.sellerAuth.is_onboarded;

export const { logout, syncAuthStateFromCookies } = sellerAuthSlice.actions;

export default sellerAuthSlice.reducer;
