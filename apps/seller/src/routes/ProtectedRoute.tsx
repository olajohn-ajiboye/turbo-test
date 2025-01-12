import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/services/hooks/useAppDispatch';
import {
  selectIsAuthenticated as selectIsBuyerAuthenticated,
  selectIsBuyer,
} from '@/services/redux/slices/buyers/authSlice';
import {
  selectIsSellerAuthenticated,
  selectIsSeller,
} from '@/services/redux/slices/sellers/sellerAuthSlice';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isBuyerAuthenticated = useAppSelector(selectIsBuyerAuthenticated);
  const isSellerAuthenticated = useAppSelector(selectIsSellerAuthenticated);
  const isBuyer = useAppSelector(selectIsBuyer);
  const isSeller = useAppSelector(selectIsSeller);

  const location = useLocation();
  const isSellerRoute = location.pathname.startsWith('/seller-dashboard');

  // Redirect authenticated users based on their role
  if (isSellerRoute) {
    if (isBuyer) {
      // Redirect buyer to their dashboard if they try to access seller routes
      return <Navigate to="/dashboard" />;
    }

    if (!isSellerAuthenticated) {
      // Redirect unauthenticated users to seller signin
      return <Navigate to="/seller/signin" />;
    }
  } else {
    if (isSeller) {
      // Redirect seller to their dashboard if they try to access buyer routes
      return <Navigate to="/seller-dashboard" />;
    }

    if (!isBuyerAuthenticated) {
      // Redirect unauthenticated users to buyer signin
      return <Navigate to="/signin" />;
    }
  }

  // If the user is authorized to access the route
  return children;
};

export default ProtectedRoute;
