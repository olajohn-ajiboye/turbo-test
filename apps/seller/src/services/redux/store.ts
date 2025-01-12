import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/buyers/cartSlice';
import shippingReducer from './slices/buyers/shippingSlice';
import sellerProductReducer from './slices/sellers/productSlice';
import authReducer from './slices/buyers/authSlice';
import sellerAuthReducer from './slices/sellers/sellerAuthSlice';
import profileReducer from './slices/buyers/profileSlice';
import addressBookReducer from './slices/buyers/addressBookSlice';
import sellerProfileReducer from './slices/sellers/sellerProfileSlice';
import categoriesReducer from './slices/categoriesSlice';
import shopReducer from './slices/sellers/shopSlice';
import buyerShopReducer from './slices/buyers/buyerShopSlice';
import productReducer from './slices/productSlice';
import wishlistReducer from './slices/buyers/wishlistSlice';
import recentlyViewedReducer from './slices/buyers/recentlyViewedSlice';
import ordersReducer from './slices/buyers/ordersSlice';
import followShopReducer from './slices/buyers/followShopSlice';
import sellerOrderReducer from './slices/sellers/sellerOrderSlice';
import forumReducer from './slices/forumSlice';
import currencyReducer from './slices/buyers/currencySlice';

// Configure the store
const store = configureStore({
  reducer: {
    cart: cartReducer,
    currency: currencyReducer,
    shipping: shippingReducer,
    products: productReducer,
    auth: authReducer,
    sellerAuth: sellerAuthReducer,
    profile: profileReducer,
    sellerProfile: sellerProfileReducer,
    addressBook: addressBookReducer,
    categories: categoriesReducer,
    shop: shopReducer,
    buyerShop: buyerShopReducer,
    wishlist: wishlistReducer,
    recentlyViewed: recentlyViewedReducer,
    orders: ordersReducer,
    followShop: followShopReducer,
    sellerProducts: sellerProductReducer,
    sellerOrders: sellerOrderReducer,
    forum: forumReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
