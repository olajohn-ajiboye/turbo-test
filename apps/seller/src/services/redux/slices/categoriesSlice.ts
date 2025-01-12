import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import BASE_URL from '@/services/api/api';

// Define the shape of category and subcategory data with adjusted types
interface Subcategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  image: string; // Add the image field
  product_count: number; // Add the product count field
  subcategories: Subcategory[];
}

interface CategoriesState {
  categories: Category[];
  selectedCategoryId: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state for the slice
const initialState: CategoriesState = {
  categories: [],
  selectedCategoryId: null,
  loading: false,
  error: null,
};

// Thunk to fetch categories and subcategories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/products/categories_subcategories/`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Map response to match the Category interface
      const categories = response.data.results.map((category: any) => ({
        id: category.id,
        name: category.name,
        image: category.image,
        product_count: category.product_count,
        subcategories: category.subcategories || [],
      }));

      return categories;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch categories'
      );
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategoryId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.loading = false;
          state.categories = action.payload;
        }
      )
      .addCase(
        fetchCategories.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { setSelectedCategory } = categoriesSlice.actions;

// Selector to get categories and selected category's subcategories
export const selectCategories = (state: RootState) =>
  state.categories.categories;

export const selectSelectedCategory = (state: RootState) =>
  state.categories.categories.find(
    category => category.id === state.categories.selectedCategoryId
  );

export default categoriesSlice.reducer;
