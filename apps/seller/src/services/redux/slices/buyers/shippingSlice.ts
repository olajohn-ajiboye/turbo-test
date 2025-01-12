import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ShippingState {
  // Make sure to export this interface
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  note: string;
  country: { label: string; value: string };
  state: { label: string; value: string };
  city: string;
  postalCode: string;
  addressLine1: string;
  addressLine2: string;
  giftWrapping: boolean;
  sameAsShipping: boolean;
}

const initialState: ShippingState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  note: '',
  country: { label: '', value: '' },
  state: { label: '', value: '' },
  city: '',
  postalCode: '',
  addressLine1: '',
  addressLine2: '',
  giftWrapping: false,
  sameAsShipping: true,
};

const shippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {
    setShippingDetails(state, action: PayloadAction<ShippingState>) {
      return { ...state, ...action.payload };
    },
    clearShippingDetails() {
      return initialState;
    },
  },
});

export const { setShippingDetails, clearShippingDetails } =
  shippingSlice.actions;
export default shippingSlice.reducer;
