import BASE_URL from '@/services/api/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Define the state for the cart slice
interface CartState {
  items: any[];
  grandTotal: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  grandTotal: 0,
  loading: false,
  error: null,
};

// Async thunk to fetch cart items
export const fetchCartItems = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>('cart/fetchCartItems', async (_, { rejectWithValue }) => {
  try {
    const token = Cookies.get('buyerAccessToken');
    if (!token) throw new Error('User not authenticated.');

    const response = await axios.get(
      `${BASE_URL}/products/cart/`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log('Cart API Response:', response.data);

    return response.data;
  } catch (error: any) {
    console.error('Fetch Cart Items Error:', error); // Log detailed error
    return rejectWithValue(
      error.response?.data?.detail || 'Failed to fetch cart items'
    );
  }
});

// Async thunk to add an item to the cart
export const addItemToCart = createAsyncThunk<
  any,
  { product: string; variation?: string; quantity: number },
  { rejectValue: string }
>('cart/addItemToCart', async (itemData, { rejectWithValue }) => {
  try {
    const token = Cookies.get('buyerAccessToken');
    if (!token) throw new Error('User not authenticated.');

    const response = await axios.post(
      `${BASE_URL}/products/cart/items/`,
      itemData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.detail || 'Failed to add item to cart'
    );
  }
});

// Async thunk to delete an item from the cart
export const deleteCartItem = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('cart/deleteCartItem', async (itemId, { rejectWithValue }) => {
  try {
    const token = Cookies.get('buyerAccessToken');
    if (!token) throw new Error('User not authenticated.');

    await axios.delete(
      `${BASE_URL}/products/cart/items/${itemId}/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return itemId;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.detail || 'Failed to delete cart item'
    );
  }
});

// Async thunk to update the quantity of a cart item
export const updateCartItemQuantity = createAsyncThunk<
  any,
  { id: string; quantity: number },
  { rejectValue: string }
>(
  'cart/updateCartItemQuantity',
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const token = Cookies.get('buyerAccessToken');
      if (!token) throw new Error('User not authenticated.');

      const response = await axios.patch(
        `${BASE_URL}/products/cart/items/${id}/`,
        { quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to update cart item quantity'
      );
    }
  }
);

// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch cart items
      .addCase(fetchCartItems.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.grandTotal = action.payload.grand_total;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch cart items';
      })

      // Add item to cart
      .addCase(addItemToCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add item to cart';
      })

      // Delete cart item
      .addCase(deleteCartItem.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete cart item';
      })

      // Update cart item quantity
      .addCase(updateCartItemQuantity.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const updatedItem = action.payload;
        const cartItem = state.items.find(item => item.id === updatedItem.id);
        if (cartItem) {
          cartItem.quantity = updatedItem.quantity;
        }
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update cart item quantity';
      });
  },
});

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartGrandTotal = (state: { cart: CartState }) =>
  state.cart.grandTotal;
export const selectCartLoading = (state: { cart: CartState }) =>
  state.cart.loading;
export const selectCartError = (state: { cart: CartState }) => state.cart.error;

// Export the reducer
export default cartSlice.reducer;
