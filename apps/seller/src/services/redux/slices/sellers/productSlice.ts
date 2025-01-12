import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { SellerProductState } from '@/types/types';
import BASE_URL from '@/services/api/api';

const initialState: SellerProductState = {
  products: [],
  loading: false,
  error: null,
  count: 0,
  next: null,
  previous: null,
};

// Async Thunk to Fetch Seller Products
export const fetchSellerProducts = createAsyncThunk(
  'sellerProducts/fetchSellerProducts',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get('sellerAccessToken'); // Get seller token
      if (!token) throw new Error('User not authenticated.');

      const response = await axios.get(
        `${BASE_URL}/products/seller/products/`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token for authentication
          },
        }
      );
      console.log('API Response:', response.data);

      return response.data; // Return data from API response
    } catch (error: any) {
      console.error('Error fetching seller products:', error.response || error);
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch seller products'
      );
    }
  }
);

// Async Thunk to Add a New Product
export const addSellerProduct = createAsyncThunk(
  'sellerProducts/addSellerProduct',
  async (productData: FormData, { rejectWithValue }) => {
    try {
      const token = Cookies.get('sellerAccessToken');
      if (!token) throw new Error('User not authenticated.');

      const response = await axios.post(
        `${BASE_URL}/products/product_create/`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Error adding product:', error.response || error);
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to add product'
      );
    }
  }
);

export const deleteSellerProduct = createAsyncThunk(
  'sellerProducts/deleteSellerProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      const token = Cookies.get('sellerAccessToken');
      if (!token) throw new Error('User not authenticated.');

      await axios.delete(
        `${BASE_URL}/products/${productId}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return productId; // Return the deleted product ID
    } catch (error: any) {
      console.error('Error deleting product:', error.response || error);
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to delete product'
      );
    }
  }
);

// Async Thunk to Edit a Product
export const editSellerProduct = createAsyncThunk(
  'sellerProducts/editSellerProduct',
  async (
    { productId, productData }: { productId: string; productData: any },
    { rejectWithValue }
  ) => {
    try {
      const token = Cookies.get('sellerAccessToken');
      if (!token) throw new Error('User not authenticated.');

      const response = await axios.put(
        `${BASE_URL}/products/${productId}/`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Error editing product:', error.response || error);
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to edit product'
      );
    }
  }
);

// Create the Slice
const sellerProductSlice = createSlice({
  name: 'sellerProducts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSellerProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.loading = false;

        // Map the response correctly
        state.products = action.payload.products || [];
        state.count = action.payload.products?.length || 0;
        state.next = action.payload.next || null;
        state.previous = action.payload.previous || null;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addSellerProduct.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSellerProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.unshift(action.payload);
      })
      .addCase(addSellerProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteSellerProduct.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSellerProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          product => product.id !== action.payload.toString()
        );
      })
      .addCase(deleteSellerProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editSellerProduct.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editSellerProduct.fulfilled, (state, action) => {
        state.loading = false;

        // Update the product in the state
        state.products = state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addCase(editSellerProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectSellerProducts = (state: {
  sellerProducts: SellerProductState;
}) => state.sellerProducts.products;

export const selectSellerProductsLoading = (state: {
  sellerProducts: SellerProductState;
}) => state.sellerProducts.loading;

export const selectSellerProductsError = (state: {
  sellerProducts: SellerProductState;
}) => state.sellerProducts.error;

export const selectSellerProductsPagination = (state: {
  sellerProducts: SellerProductState;
}) => ({
  count: state.sellerProducts.count,
  next: state.sellerProducts.next,
  previous: state.sellerProducts.previous,
});

// Export Reducer
export default sellerProductSlice.reducer;
