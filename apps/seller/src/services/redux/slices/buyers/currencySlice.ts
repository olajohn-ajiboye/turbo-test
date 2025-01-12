import BASE_URL from '@/services/api/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CurrencyState {
  baseCurrency: string;
  rates: Record<string, number>;
  selectedCurrency: string;
  loading: boolean;
  error: string | null;
}

const initialState: CurrencyState = {
  baseCurrency: 'NGN',
  rates: {},
  selectedCurrency: 'USD',
  loading: false,
  error: null,
};

// Async thunk to fetch currency rates
export const fetchCurrencyRates = createAsyncThunk(
  'currency/fetchRates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/products/currency_rates/`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch currency rates'
      );
    }
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setSelectedCurrency(state, action) {
      state.selectedCurrency = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrencyRates.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrencyRates.fulfilled, (state, action) => {
        state.loading = false;
        state.baseCurrency = action.payload.base_currency;
        state.rates = action.payload.rates;
      })
      .addCase(fetchCurrencyRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedCurrency } = currencySlice.actions;

export const selectCurrencyRates = (state: { currency: CurrencyState }) =>
  state.currency.rates;
export const selectSelectedCurrency = (state: { currency: CurrencyState }) =>
  state.currency.selectedCurrency;

export default currencySlice.reducer;
