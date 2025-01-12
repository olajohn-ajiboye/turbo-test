import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaApple, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import GiriSignup from '../../../assets/GiriSignup.png';
import { Link, useNavigate } from 'react-router-dom';
import AuthNav from '@/components/AuthNav';
import { useAppDispatch } from '@/services/hooks/useAppDispatch';
import {
  loginSeller,
  sellerSocialAuthLogin,
} from '@/services/redux/slices/sellers/sellerAuthSlice';
import {
  handleFacebookLogin,
  initFacebookSDK,
} from '@/utils/facebookAuthUtils';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import GoogleAuth from '@/components/GoogleAuth';

type SigninFormInputs = {
  email: string;
  password: string;
};

export function SellerSigninPage() {
  const dispatch = useAppDispatch();
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    initFacebookSDK(); // Initialize Facebook SDK on component mount
  }, []);

  const onFacebookSignin = async () => {
    const userInfo = await handleFacebookLogin();
    if (userInfo) {
      try {
        const resultAction = await dispatch(
          sellerSocialAuthLogin({
            email: userInfo.email,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            provider: 'facebook',
            provider_id: userInfo.provider_id,
          })
        );
        const result = unwrapResult(resultAction);

        // Check onboarding status from result
        if (result.is_onboarded) {
          navigate('/seller-dashboard');
        } else {
          navigate('/seller');
        }
      } catch (error) {
        setAuthError('Facebook login failed. Please try again.');
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormInputs>();

  const onSubmit: SubmitHandler<SigninFormInputs> = async data => {
    try {
      const resultAction = await dispatch(
        loginSeller({
          email: data.email,
          password: data.password,
        })
      );
      const result = unwrapResult(resultAction);

      // Check onboarding status from result
      if (result.is_onboarded) {
        navigate('/seller-dashboard');
      } else {
        navigate('/seller');
      }
    } catch (error: any) {
      setAuthError(error || 'Invalid email or password.');
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <AuthNav />
      <section className="px-5 pt-5">
        <div className="flex min-h-screen">
          {/* Left Image Section */}
          <div className="hidden w-1/2 flex-col items-center justify-center md:flex">
            <img src={GiriSignup} alt="Sign In" className="mb-4 rounded-md" />
          </div>

          {/* Right Form Section */}
          <div className="flex w-full flex-col justify-center p-8 md:w-1/2">
            <div className="mx-auto w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800">
                Welcome back to GiriToday, your global hub for authentic African
                treasures!
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Sign in to explore a world of unique products, vibrant cultures,
                and endless possibilities.
              </p>
              {authError && (
                <p className="mb-4 text-center text-sm text-red-600">
                  {authError}
                </p>
              )}

              <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Invalid email address',
                      },
                    })}
                    className="mt-1 block w-full rounded-md border px-3 py-4 shadow-sm"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="relative mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    {...register('password', {
                      required: 'Password is required',
                    })}
                    className="mt-1 block w-full rounded-md border px-3 py-4 pr-10 shadow-sm"
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 pt-7 text-sm leading-5"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="mb-6 flex items-center justify-between">
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Stay logged in</span>
                  </label>
                  <Link
                    to="/seller/forgotpassword"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-900 px-4 py-4 text-white hover:bg-blue-800"
                  style={{ backgroundColor: '#030A70' }}
                >
                  Sign in
                </button>

                <div className="mt-6 text-center text-gray-600">
                  Or Login with
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <GoogleAuth userType="seller" />
                  <button
                    type="button"
                    className="flex-1 rounded-md border px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <FaApple className="mr-2 inline-block" />
                    Apple ID
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-md border px-2 py-2 text-sm hover:bg-gray-100"
                    onClick={onFacebookSignin}
                  >
                    <FaFacebook className="mr-2 inline-block" color="blue" />
                    Facebook
                  </button>
                </div>

                <div className="mt-6 text-center text-gray-600">
                  New around here?{' '}
                  <Link
                    to="/seller/signup"
                    className="text-blue-600 hover:underline"
                  >
                    Sign up now
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
