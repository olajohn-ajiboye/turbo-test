import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/services/hooks/useAppDispatch';
import {
  selectIsAuthenticated as selectIsBuyerAuthenticated,
  selectIsBuyer,
} from '@/services/redux/slices/buyers/authSlice';
import {
  selectIsSellerAuthenticated,
  selectIsSeller,
} from '@/services/redux/slices/sellers/sellerAuthSlice';

interface AuthRedirectProps {
  children: React.ReactElement;
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
  const isBuyerAuthenticated = useAppSelector(selectIsBuyerAuthenticated);
  const isSellerAuthenticated = useAppSelector(selectIsSellerAuthenticated);
  const isBuyer = useAppSelector(selectIsBuyer);
  const isSeller = useAppSelector(selectIsSeller);

  if (isBuyerAuthenticated && isBuyer) {
    // Redirect authenticated buyers to the home page
    return <Navigate to="/" />;
  }

  if (isSellerAuthenticated && isSeller) {
    // Redirect authenticated sellers to the seller home page
    return <Navigate to="/seller" />;
  }

  // Render the children if the user is not authenticated
  return children;
};

export default AuthRedirect;
