import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import AuthNav from '@/components/AuthNav';
import { Bars } from 'react-loader-spinner';
import BASE_URL from '@/services/api/api';

type OtpFormInputs = {
  otp: string;
};

export function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {}; // Email from the forgot password screen
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormInputs>();

  const onSubmit: SubmitHandler<OtpFormInputs> = async data => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${BASE_URL}/users/verify_reset_password_otp/`,
        {
          email,
          otp: data.otp,
        }
      );

      if (response.status === 200) {
        navigate('/seller/reset-password', { state: { email } });
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthNav />
      <section className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">Verify OTP</h2>
          <p className="mt-2 text-sm text-gray-600">
            An OTP has been sent to your email:{' '}
            <span className="font-medium">{email}</span>
          </p>

          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Enter OTP
              </label>
              <input
                id="otp"
                type="text"
                placeholder="5-digit OTP"
                maxLength={5}
                {...register('otp', {
                  required: 'OTP is required',
                  pattern: {
                    value: /^[0-9]{5}$/,
                    message: 'OTP must be a 5-digit number',
                  },
                })}
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-4 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
              {errors.otp && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.otp.message}
                </p>
              )}
            </div>

            {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-md bg-blue-900 px-4 py-4 text-white hover:bg-blue-800"
              style={{ backgroundColor: '#030A70' }}
              disabled={loading}
            >
              {loading ? (
                <Bars
                  height={20}
                  width={20}
                  color="#fff"
                  wrapperClass="inline-block"
                />
              ) : (
                'Verify OTP'
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Didn’t receive the OTP?{' '}
            <button
              type="button"
              onClick={() => alert('Resending OTP...')}
              className="font-medium text-blue-600 hover:underline"
            >
              Resend OTP
            </button>
          </p>
        </div>
      </section>
    </>
  );
}
