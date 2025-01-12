import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from './services/hooks/useAppDispatch';
import {
  selectIsAuthenticated,
  selectIsBuyer,
  syncAuthStateFromCookies,
} from '@/services/redux/slices/buyers/authSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import existing pages
import { ProductDisplay } from './pages/buyer/ProductShowPage';
import ProductPage from './pages/buyer/ProductPage';
import Home from './pages/buyer/Home';
import { SigninPage } from './pages/buyer/auth/Signin';
import { SignupPage } from './pages/buyer/auth/Signup';
import { SellerSigninPage } from './pages/seller/auth/Signin';
import { SellerSignupPage } from './pages/seller/auth/Signup';
import { ForgotPassword } from './pages/buyer/auth/ForgotPassword';
import { SellerForgotPassword } from './pages/seller/auth/ForgotPassword';
import CartPage from './pages/buyer/CartPage';
import SellerHome from './pages/seller/SellerHome';
import OnboardingSteps from './components/seller/OnboardingSteps';
import ProfileCompletion from './pages/seller/onboarding/ProfileCompletion';
import ShopSettings from './pages/seller/onboarding/ShopSettings';
import ProductListing from './pages/seller/onboarding/ProductListing';
import WelcomePopup from './components/seller/WelcomePopup';
import ShippingForm from './pages/buyer/checkout/Shipping';
import PaymentForm from './pages/buyer/checkout/PaymentForm';
import OrderConfirmation from './pages/buyer/checkout/OrderConfirmation';
import SellerShop from './pages/seller/SellerShop';
import Dashboard from './pages/dashboard/Dashboard';
import Overview from './pages/dashboard/buyer/Overview';
import Order from './pages/dashboard/buyer/Order';
import SavedItems from './pages/dashboard/buyer/SavedItems';
import RecentlyViewed from './pages/dashboard/buyer/RecentlyViewed';
import AddressBook from './pages/dashboard/buyer/AddressBook';
import AddressForm from './pages/dashboard/buyer/AddressForm';
import AccountSettings from './pages/dashboard/buyer/AccountSettings';
import OrderDetailsPage from './pages/dashboard/buyer/OrderDetailsPage';
import PackageTracking from './components/dashboard/buyer/orders/PackageTracking';
import FollowedShopsPage from './pages/dashboard/buyer/FollowedShopsPage';
import InboxPage from './pages/dashboard/buyer/InboxPage';

// Import seller dashboard pages
import SellerOverview from './pages/dashboard/seller/Overview';
import SellerProducts from './pages/dashboard/seller/Products';
import SellerOrders from './pages/dashboard/seller/Orders';
import SellerInbox from './pages/dashboard/seller/Inbox';
import ManageShop from './pages/dashboard/seller/ManageShop';
import SellerSettings from './pages/dashboard/seller/Settings';
import SMEHelp from './pages/dashboard/seller/SMEHelp';
import ForumPage from './pages/forum/ForumPage';
import AboutPage from './pages/About';
import TermsOfUse from './pages/TermsOfUse';
import AddProduct from './components/dashboard/seller/products/AddProduct/AddProduct';
import ProductShowPage from './components/dashboard/seller/products/ProductShowPage';
import EditProduct from './components/dashboard/seller/products/EditProduct/EditProduct';
import CheckoutLoginPage from './pages/buyer/checkout/CheckoutLoginPage';
import { fetchUserProfile } from './services/redux/slices/buyers/profileSlice';
import { RootState } from './services/redux/store';
import {
  selectIsSeller,
  selectIsSellerAuthenticated,
} from './services/redux/slices/sellers/sellerAuthSlice';
import OtpVerification from './pages/buyer/auth/OtpVerification';
import SellerOTPverification from './pages/seller/auth/SellerOTPverification';
import ProtectedRoute from './routes/ProtectedRoute';
import AuthRedirect from './routes/AuthRedirect';
import { VerifyOtp } from './pages/seller/auth/VerifyOtp';
import { ResetPassword } from './pages/seller/auth/ResetPassword';
import { fetchCartItems } from './services/redux/slices/buyers/cartSlice';
import PostShowPage from './pages/forum/PostShowPage';
import NewPostPage from './pages/forum/NewPostPage';

function App() {
  const dispatch = useAppDispatch();
  const isBuyer = useAppSelector((state: RootState) => selectIsBuyer(state));
  const isSeller = useAppSelector((state: RootState) => selectIsSeller(state));
  const isAuthenticated = useAppSelector((state: RootState) =>
    selectIsAuthenticated(state)
  );
  const isSellerAuthenticated = useAppSelector((state: RootState) =>
    selectIsSellerAuthenticated(state)
  );

  console.log(isAuthenticated);
  console.log(isSellerAuthenticated);

  useEffect(() => {
    dispatch(syncAuthStateFromCookies());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && isBuyer) {
      dispatch(fetchUserProfile());
      dispatch(fetchCartItems());
    }
  }, [dispatch, isAuthenticated, isBuyer]);

  console.log(isSeller);
  console.log(isBuyer);

  useEffect(() => {
    if (isBuyer) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isBuyer]);

  return (
    <Router>
      <Routes>
        {/* Existing routes */}
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDisplay />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/forum/:postId" element={<PostShowPage />} />
        <Route path="/forum/new" element={<NewPostPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms&conditions" element={<TermsOfUse />} />
        <Route path="/seller/verify-otp" element={<VerifyOtp />} />
        <Route path="/seller/reset-password" element={<ResetPassword />} />
        <Route
          path="/signin"
          element={
            <AuthRedirect>
              <SigninPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRedirect>
              <SignupPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <AuthRedirect>
              <OtpVerification />
            </AuthRedirect>
          }
        />
        <Route
          path="/seller-verify-otp"
          element={
            <AuthRedirect>
              <SellerOTPverification />
            </AuthRedirect>
          }
        />
        <Route
          path="/forgotpassword"
          element={
            <AuthRedirect>
              <ForgotPassword />
            </AuthRedirect>
          }
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/seller" element={<SellerHome />} />
        <Route
          path="/seller/signin"
          element={
            <AuthRedirect>
              <SellerSigninPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/seller/signup"
          element={
            <AuthRedirect>
              <SellerSignupPage />
            </AuthRedirect>
          }
        />
        <Route path="/inbox" element={<InboxPage />} />

        <Route
          path="/seller/forgotpassword"
          element={
            <AuthRedirect>
              <SellerForgotPassword />
            </AuthRedirect>
          }
        />
        <Route
          path="/seller/onboarding-welcome"
          element={<OnboardingSteps />}
        />
        <Route
          path="/seller/profile-completion"
          element={<ProfileCompletion />}
        />
        <Route path="/seller/shop-settings" element={<ShopSettings />} />
        <Route path="/seller/product-listing" element={<ProductListing />} />
        <Route path="/seller/welcome-popup" element={<WelcomePopup />} />
        <Route path="/shipping" element={<ShippingForm />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/guest-checkout" element={<CheckoutLoginPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/sellerShop/:id" element={<SellerShop />} />
        
        {/* Protected Buyer Dashboard Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Nested routes inside buyer dashboard */}
          <Route path="" element={<Overview />} />
          <Route path="orders" element={<Order />} />
          <Route path="orders/:orderId" element={<OrderDetailsPage />} />
          <Route path="orders/:orderId/track" element={<PackageTracking />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="saved-items" element={<SavedItems />} />
          <Route path="recently-viewed" element={<RecentlyViewed />} />
          <Route path="followed-shops" element={<FollowedShopsPage />} />
          <Route path="address-book" element={<AddressBook />} />
          <Route path="address-book/add" element={<AddressForm />} />
          <Route path="address-book/edit/:id" element={<AddressForm />} />
          <Route path="account-settings" element={<AccountSettings />} />
          <Route
            path="discussion-forum"
            element={<div>Hello World - Discussion Forum</div>}
          />
          <Route path="logout" element={<div>Logout</div>} />
          <Route path="*" element={<h1>Dashboard Page Not Found</h1>} />
        </Route>

        {/* Seller Dashboard routes */}
        {/* Protected Seller Dashboard Routes */}
        <Route
          path="/seller-dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Nested routes inside seller dashboard */}
          <Route path="" element={<SellerOverview />} />
          <Route path="products" element={<SellerProducts />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="orders" element={<SellerOrders />} />
          <Route path="inbox" element={<SellerInbox />} />
          <Route path="manage-shop" element={<ManageShop />} />
          <Route path="settings" element={<SellerSettings />} />
          <Route path="product/:id" element={<ProductShowPage />} />
          <Route path="product/edit/:id" element={<EditProduct />} />
          <Route path="sme-loan-help" element={<SMEHelp />} />
          <Route path="discussion-forum" element={<div>Seller Forum</div>} />
          <Route path="logout" element={<div>Logout</div>} />
          <Route path="*" element={<h1>Seller Dashboard Page Not Found</h1>} />
        </Route>

        {/* Fallback route for unmatched paths */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
