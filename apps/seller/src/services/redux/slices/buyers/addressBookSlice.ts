import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import BASE_URL from '@/services/api/api';

export interface Address {
  id: number;
  first_name: string;
  last_name: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone_number: string;
  is_default: boolean;
}

export interface AddressBookState {
  addresses: Address[];
  loading: boolean;
  error: string | null;
}

const initialState: AddressBookState = {
  addresses: [],
  loading: false,
  error: null,
};

// Fetch addresses
export const fetchAddresses = createAsyncThunk(
  'addressBook/fetchAddresses',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const accessToken = state.auth.tokens.access;
    try {
      const response = await axios.get(
        `${BASE_URL}/profiles/addresses/`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data.results;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch addresses'
      );
    }
  }
);

// Add a new address
export const addAddress = createAsyncThunk(
  'addressBook/addAddress',
  async (newAddress: Partial<Address>, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const accessToken = state.auth.tokens.access;
    try {
      const response = await axios.post(
        `${BASE_URL}/profiles/addresses/`,
        newAddress,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to add address');
    }
  }
);

// Update an existing address
export const updateAddress = createAsyncThunk(
  'addressBook/updateAddress',
  async (
    { id, updatedAddress }: { id: number; updatedAddress: Partial<Address> },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const accessToken = state.auth.tokens.access;
    try {
      const response = await axios.put(
        `${BASE_URL}/profiles/addresses/${id}/`,
        updatedAddress,
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
        error.response?.data || 'Failed to update address'
      );
    }
  }
);

// Set an address as default using PATCH request
export const setDefaultAddress = createAsyncThunk(
  'addressBook/setDefaultAddress',
  async (id: number, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const accessToken = state.auth.tokens.access;
    try {
      const response = await axios.patch(
        `${BASE_URL}/profiles/addresses/${id}/`,
        { is_default: true },
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
        error.response?.data || 'Failed to set default address'
      );
    }
  }
);

export const deleteAddress = createAsyncThunk(
  'addressBook/deleteAddress',
  async (id: number, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const accessToken = state.auth.tokens.access;
    try {
      await axios.delete(
        `${BASE_URL}/profiles/addresses/${id}/delete/`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Failed to delete address'
      );
    }
  }
);

const addressBookSlice = createSlice({
  name: 'addressBook',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAddresses.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addAddress.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateAddress.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.addresses.findIndex(
          address => address.id === action.payload.id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        // Set all addresses to non-default, then update the selected one
        state.addresses = state.addresses.map(address => ({
          ...address,
          is_default: address.id === action.meta.arg,
        }));
      })
      .addCase(setDefaultAddress.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteAddress.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = state.addresses.filter(
          address => address.id !== action.payload
        );
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectAddresses = (state: RootState) =>
  state.addressBook.addresses;
export const selectAddressLoading = (state: RootState) =>
  state.addressBook.loading;
export const selectDefaultAddress = (state: RootState) =>
  state.addressBook.addresses.find(address => address.is_default);

export default addressBookSlice.reducer;
