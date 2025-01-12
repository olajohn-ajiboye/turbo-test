import React, { useState } from 'react';
import { useAppDispatch } from '@/services/hooks/useAppDispatch';
import { verifyEmailOtp } from '@/services/redux/slices/buyers/authSlice';
import { useNavigate, useLocation } from 'react-router';

const OtpVerification: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from query parameters
  const params = new URLSearchParams(location.search);
  const email = params.get('email');

  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!email) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">
          Email not provided. Please sign up again.
        </p>
      </div>
    );
  }

  const handleVerifyOtp = async () => {
    setError(null);
    try {
      const result = await dispatch(
        verifyEmailOtp({ email, otp })
      ).unwrap();

      if (result.detail === 'Email verified successfully.') {
        navigate('/');
      } else {
        setError('Unexpected response. Please try again.');
      }
    } catch (err: any) {
      console.error('OTP verification error:', err);

      const errorMessage =
        err?.detail || 'OTP verification failed. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-80 rounded-md bg-white p-6 shadow-md">
        <h2 className="text-center text-lg font-semibold text-gray-700">
          Verify Your Email
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Enter the OTP sent to your email: <strong>{email}</strong>
        </p>
        {error && typeof error === 'string' && (
          <p className="mt-2 text-center text-sm text-red-500">{error}</p>
        )}
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          className="mt-4 w-full rounded-md border px-4 py-2"
        />
        <button
          onClick={handleVerifyOtp}
          className="mt-4 w-full rounded-md bg-blue-500 py-2 text-white"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;
