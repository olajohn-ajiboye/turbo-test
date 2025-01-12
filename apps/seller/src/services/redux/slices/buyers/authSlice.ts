import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { RootState } from '../../store';
import BASE_URL from '@/services/api/api';

export interface Tokens {
  access: string | null;
  refresh: string | null;
}

export interface AuthState {
  user: any;
  tokens: Tokens;
  loading: boolean;
  error: string | null;
  is_verified: boolean | null;
  is_new_user: boolean | null;
  is_buyer: boolean | null;
}

const initialState: AuthState = {
  user: null,
  tokens: {
    access: Cookies.get('buyerAccessToken') || null,
    refresh: Cookies.get('buyerRefreshToken') || null,
  },
  loading: false,
  error: null,
  is_verified: Cookies.get('buyerIsVerified') === 'true' ? true : null,
  is_new_user: Cookies.get('buyerIsNewUser') === 'true' ? true : null,
  is_buyer: Cookies.get('isBuyer') === 'true' ? true : null,
};

// Social auth login
export const socialAuthLogin = createAsyncThunk(
  'auth/socialAuthLogin',
  async (payload: {
    email: string;
    first_name: string;
    last_name: string;
    provider: string;
    provider_id: string;
  }) => {
    const response = await axios.post(
      `${BASE_URL}/users/buyer_social_auth/`,
      payload
    );

    const { access, refresh, is_verified, is_new_user, is_buyer } =
      response.data.tokens;

    // Set cookies with a 7-day expiration
    Cookies.set('buyerAccessToken', access, { expires: 7 });
    Cookies.set('buyerRefreshToken', refresh, { expires: 7 });
    Cookies.set('buyerIsVerified', String(is_verified), { expires: 7 });
    Cookies.set('buyerIsNewUser', String(is_new_user), { expires: 7 });
    Cookies.set('isBuyer', String(is_buyer), { expires: 7 });

    return response.data;
  }
);

export const registerBuyer = createAsyncThunk(
  'auth/registerBuyer',
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
        `${BASE_URL}/users/register_buyer/`,
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
        Cookies.set('buyerAccessToken', access, { expires: 7 });
        Cookies.set('buyerRefreshToken', refresh, { expires: 7 });
      }

      return response.data;
    } catch (error: any) {
      console.error('Error details:', error.response?.data);
      return rejectWithValue(error.response?.data || 'Registration failed');
    }
  }
);

export const sendResetPasswordEmail = createAsyncThunk(
  'auth/sendResetPasswordEmail',
  async (payload: { email: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/send_reset_password_email/`,
        payload
      );
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to send reset email'
      );
    }
  }
);

export const verifyEmailOtp = createAsyncThunk(
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

export const loginBuyer = createAsyncThunk(
  'auth/loginBuyer',
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/login/buyer/`,
        payload
      );

      const { access, refresh, is_verified, is_new_user, is_buyer } =
        response.data;

      // Save tokens and other states in cookies
      Cookies.set('buyerAccessToken', access, { expires: 7 });
      Cookies.set('buyerRefreshToken', refresh, { expires: 7 });
      Cookies.set('buyerIsVerified', String(is_verified), { expires: 7 });
      Cookies.set('buyerIsNewUser', String(is_new_user), { expires: 7 });
      Cookies.set('isBuyer', String(is_buyer), { expires: 7 });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || 'Invalid credentials, try again'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.tokens = { access: null, refresh: null };
      state.is_verified = null;
      state.is_new_user = null;
      state.is_buyer = null;

      // Remove cookies on logout
      Cookies.remove('buyerAccessToken');
      Cookies.remove('buyerRefreshToken');
      Cookies.remove('buyerIsVerified');
      Cookies.remove('buyerIsNewUser');
      Cookies.remove('isBuyer');
    },

    // Sync auth state with cookie data on load
    syncAuthStateFromCookies: state => {
      state.tokens = {
        access: Cookies.get('buyerAccessToken') || null,
        refresh: Cookies.get('buyerRefreshToken') || null,
      };
      state.is_verified =
        Cookies.get('buyerIsVerified') === 'true' ? true : null;
      state.is_new_user =
        Cookies.get('buyerIsNewUser') === 'true' ? true : null;
      state.is_buyer = Cookies.get('isBuyer') === 'true' ? true : null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(socialAuthLogin.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(socialAuthLogin.fulfilled, (state, action) => {
        const { is_verified, is_new_user, is_buyer, tokens } = action.payload;
        state.loading = false;
        state.user = action.payload;
        state.tokens = {
          access: tokens.access,
          refresh: tokens.refresh,
        };
        state.is_verified = is_verified;
        state.is_new_user = is_new_user;
        state.is_buyer = is_buyer;
      })
      .addCase(socialAuthLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Authentication failed';
      })
      .addCase(registerBuyer.pending, state => {
        state.loading = true;
        state.error = null; // Reset errors on new signup attempt
      })
      .addCase(registerBuyer.fulfilled, (state, action) => {
        if (action.payload.is_verified === false) {
          state.loading = false;
          state.error = null;
          state.user = { email: action.payload.email }; // Store email for OTP verification
          return; // Exit without setting tokens
        }

        const { is_verified, is_new_user, is_buyer, tokens } = action.payload;
        state.loading = false;
        state.user = action.payload;
        state.tokens = {
          access: tokens.access,
          refresh: tokens.refresh,
        };
        state.is_verified = is_verified;
        state.is_new_user = is_new_user;
        state.is_buyer = is_buyer;
      })
      // Buyer Login
      .addCase(loginBuyer.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginBuyer.fulfilled, (state, action) => {
        const { is_verified, is_new_user, is_buyer, tokens, user } =
          action.payload;

        // Save tokens and other states in cookies
        Cookies.set('buyerAccessToken', tokens.access, { expires: 7 });
        Cookies.set('buyerRefreshToken', tokens.refresh, { expires: 7 });
        Cookies.set('buyerIsVerified', String(is_verified), { expires: 7 });
        Cookies.set('buyerIsNewUser', String(is_new_user), { expires: 7 });
        Cookies.set('isBuyer', String(is_buyer), { expires: 7 });
        Cookies.set('buyerUser', JSON.stringify(user), { expires: 7 }); // Save user details

        state.loading = false;
        state.user = user;
        state.tokens = {
          access: tokens.access,
          refresh: tokens.refresh,
        };
        state.is_verified = is_verified;
        state.is_new_user = is_new_user;
        state.is_buyer = is_buyer;
      })
      .addCase(loginBuyer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // OTP Verification
      .addCase(verifyEmailOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmailOtp.fulfilled, (state, action) => {
        const { is_verified, is_new_user, is_buyer, tokens } = action.payload;
        state.loading = false;
        state.user = action.payload;
        state.tokens = {
          access: tokens.access,
          refresh: tokens.refresh,
        };
        state.is_verified = is_verified;
        state.is_new_user = is_new_user;
        state.is_buyer = is_buyer;
      })
      .addCase(verifyEmailOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendResetPasswordEmail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendResetPasswordEmail.fulfilled, state => {
        state.loading = false;
        state.error = null;
        // Optionally, set a success message or status
      })
      .addCase(sendResetPasswordEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectIsAuthenticated = (state: RootState) =>
  !!state.auth.tokens.access;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsVerified = (state: RootState) => state.auth.is_verified;
export const selectIsNewUser = (state: RootState) => state.auth.is_new_user;
export const selectIsBuyer = (state: RootState) => state.auth.is_buyer;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthLoading = (state: RootState) => state.auth.loading;

export const { logout, syncAuthStateFromCookies } = authSlice.actions;

export default authSlice.reducer;
