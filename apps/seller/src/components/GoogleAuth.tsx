import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAppDispatch } from '@/services/hooks/useAppDispatch';
import { socialAuthLogin as buyerSocialAuthLogin } from '@/services/redux/slices/buyers/authSlice';
import { sellerSocialAuthLogin } from '@/services/redux/slices/sellers/sellerAuthSlice';
import { jwtDecode } from 'jwt-decode';

interface GoogleAuthProps {
  userType: 'buyer' | 'seller';
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ userType }) => {
  const dispatch = useAppDispatch();

  const handleSuccess = async (response: any) => {
    const { credential } = response;

    if (!credential) {
      console.error('Google token is missing.');
      return;
    }

    try {
      const decodedToken: any = jwtDecode(credential);
      const { email, given_name, family_name } = decodedToken;

      const authAction =
        userType === 'buyer' ? buyerSocialAuthLogin : sellerSocialAuthLogin;

      const payload = {
        email: email || '',
        first_name: given_name || '',
        last_name: family_name || '',
        provider: 'google',
        provider_id: email,
      };

      console.log('Sending payload to backend:', payload);

      // Dispatch the appropriate action based on user type
      const result = await dispatch(authAction(payload)).unwrap();

      console.log(`${userType} login successful:`, result);
    } catch (error) {
      console.error(`${userType} login failed:`, error);
    }
  };

  const handleError = () => {
    console.error(`${userType} Google Authentication Failed`);
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default GoogleAuth;
