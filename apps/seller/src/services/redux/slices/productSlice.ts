import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import BASE_URL from '@/services/api/api';

// Define the product data type for the list view
interface Product {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
  };
  media: {
    id: string;
    file: string;
    is_thumbnail: boolean;
    timestamp: string;
  }[];
  tag: string[];
  description: string;
  quantity: number;
  price: string;
  price_in_usd: number;
  price_in_gbp: number;
  price_in_eur: number;
  discount: string;
  is_featured: boolean;
  created_at: string;
}

// Define the product detail data type
interface ProductDetail extends Product {
  sub_category: {
    id: string;
    name: string;
    category: {
      id: string;
      name: string;
    };
  };
  size: string | null;
  others: string | null;
  is_published: boolean;
}

// Define the initial state for the product slice
interface ProductState {
  products: Product[];
  productDetail: ProductDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  productDetail: null,
  loading: false,
  error: null,
};

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk<
  Product[],
  number | undefined,
  { rejectValue: string }
>('products/fetchProducts', async (page = 1, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/products/product_list/`,
      {
        params: { page },
      }
    );
    return response.data.results;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.detail || 'Failed to fetch products'
    );
  }
});

// Async thunk for fetching a product's details
export const fetchProductDetail = createAsyncThunk<
  ProductDetail,
  string,
  { rejectValue: string }
>('products/fetchProductDetail', async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/products/detail/${productId}/`
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.detail || 'Failed to fetch product details'
    );
  }
});

// Create the product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      // Fetch product detail
      .addCase(fetchProductDetail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch product details';
      });
  },
});

// Selectors to get product list, product details, loading, and error states
export const selectProducts = (state: RootState) => state.products.products;
export const selectProductDetail = (state: RootState) =>
  state.products.productDetail;
export const selectProductLoading = (state: RootState) =>
  state.products.loading;
export const selectProductError = (state: RootState) => state.products.error;

export default productSlice.reducer;
