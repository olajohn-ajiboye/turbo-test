import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaApple, FaFacebook } from 'react-icons/fa';
import GiriSignup from '../../../assets/GiriSignup.png';
import { Link, useNavigate } from 'react-router-dom';
import AuthNav from '@/components/AuthNav';
import {
  handleFacebookLogin,
  initFacebookSDK,
} from '@/utils/facebookAuthUtils';
import {
  registerSeller,
  sellerSocialAuthLogin,
} from '@/services/redux/slices/sellers/sellerAuthSlice';
import { useAppDispatch } from '@/services/hooks/useAppDispatch';
import { unwrapResult } from '@reduxjs/toolkit';
import GoogleAuth from '@/components/GoogleAuth';
import { Button } from '@giritoday/ui/button';
import { Input } from '@giritoday/ui/input';
import { User2, Mail, LockKeyhole } from 'lucide-react';

type SignupFormInputs = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone_number: string;
};

// Define a specific type for the error
interface AuthError {
  non_field_errors?: string[];
  [key: string]: any;
}
export function SellerSignupPage() {
  const dispatch = useAppDispatch();
  const [authError, setAuthError] = useState<AuthError | string | null>(null);
  const [passwordMismatchError, setPasswordMismatchError] = useState<
    string | null
  >(null);
  const navigate = useNavigate();

  useEffect(() => {
    initFacebookSDK(); // Initialize Facebook SDK on component mount
  }, []);

  const onFacebookSignup = async () => {
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
        unwrapResult(resultAction);
        navigate('/seller');
      } catch (error) {
        setAuthError('Facebook login failed. Please try again.');
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormInputs>();

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const onSubmit: SubmitHandler<SignupFormInputs> = async data => {
    setAuthError(null);
    setPasswordMismatchError(null);
    try {
      const result = await dispatch(
        registerSeller({
          email: data.email,
          first_name: data.firstname,
          last_name: data.lastname,
          password: data.password,
          phone_number: data.phone_number,
        })
      ).unwrap();

      if (!result.is_verified) {
        // Redirect to OTP page
        navigate(`/seller-verify-otp?email=${data.email}`);
      } else {
        navigate('/sellers');
      }
    } catch (error) {
      setAuthError(error || 'Registration failed. Please try again.');
    }
  };

  const handleInactiveSubmit = () => {
    if (password !== confirmPassword) {
      setPasswordMismatchError('Passwords do not match');
    }
  };

  return (
    <>
      <AuthNav />
      <section>
        <div className="flex min-h-screen">
          <div className="hidden w-1/2 flex-col items-center justify-center md:flex">
            <img src={GiriSignup} alt="Sign In" className="mb-4 rounded-md" />
          </div>
          <div className="flex w-full flex-col justify-center p-8 md:w-1/2">
            <div className="mx-auto w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800">
                Get to GiriToday, your global hub for authentic African
                treasures!
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Sign up to explore a world of unique products, vibrant cultures,
                and endless possibilities.
              </p>

              {authError && (
                <p className="mb-4 text-center text-sm text-red-600">
                  {typeof authError === 'string'
                    ? authError
                    : authError.non_field_errors
                      ? authError.non_field_errors.join(', ')
                      : 'An unexpected error occurred. Please try again.'}
                </p>
              )}

              <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                {/* Form Fields */}
                <div className="mb-4 flex space-x-2">
                  <div className="w-1/2">
                    <Input
                      id="firstname"
                      type="text"
                      label="First Name"
                      required
                      {...register('firstname', {
                        required: 'First name is required',
                      })}
                      startIcon={<User2 className="h-4 w-4" />}
                      error={{
                        message: errors.firstname?.message,
                        type: 'required',
                      }}
                    />
                  </div>
                  <div className="w-1/2">
                    <Input
                      label="Last Name"
                      id="lastname"
                      type="text"
                      required
                      {...register('lastname', {
                        required: 'Last name is required',
                      })}
                      startIcon={<User2 className="h-4 w-4" />}
                      error={{
                        message: errors.lastname?.message,
                        type: 'required',
                      }}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <Input
                    label="Email address"
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Invalid email address',
                      },
                    })}
                    required
                    startIcon={<Mail className="h-4 w-4" />}
                    error={{
                      message: errors.email?.message,
                      type: 'required',
                    }}
                  />
                </div>

                <div className="relative mb-4">
                  <Input
                    id="password"
                    label="Password"
                    type={'password'}
                    {...register('password', {
                      required: 'Password is required',
                    })}
                    error={{
                      message: errors.password?.message,
                      type: 'required',
                    }}
                    required
                    startIcon={<LockKeyhole className="h-4 w-4" />}
                  />
                </div>

                <div className="mb-6">
                  <Input
                    id="confirmPassword"
                    label="Confirm Password"
                    type={'password'}
                    {...register('confirmPassword', {
                      validate: value =>
                        value === password || 'Passwords do not match',
                    })}
                    error={{
                      message: passwordMismatchError ?? '',
                      type: 'required',
                    }}
                    required
                    startIcon={<LockKeyhole className="h-4 w-4" />}
                  />
                </div>

                <Button
                  type="button"
                  className={`w-full rounded-md px-4 py-4 text-white ${
                    password !== confirmPassword
                      ? 'cursor-not-allowed bg-gray-500'
                      : 'bg-blue-900 hover:bg-blue-800'
                  }`}
                  onClick={() => {
                    if (password !== confirmPassword) {
                      handleInactiveSubmit(); // Ensure this updates the error state
                    } else {
                      handleSubmit(onSubmit)(); // Explicitly call the form submission if active
                    }
                  }}
                >
                  Sign up
                </Button>

                <div className="mt-6 text-center text-gray-600">
                  Or Sign up with
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <GoogleAuth userType="buyer" />
                  <button
                    type="button"
                    className="flex-1 rounded-md border px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <FaApple className="mr-2 inline-block" />
                    Apple ID
                  </button>
                  <button
                    type="button"
                    onClick={onFacebookSignup}
                    className="flex-1 rounded-md border px-2 py-2 text-sm hover:bg-gray-100"
                  >
                    <FaFacebook className="mr-2 inline-block" color="blue" />
                    Facebook
                  </button>
                </div>

                <div className="mt-6 text-center text-gray-600">
                  Already have an account?{' '}
                  <Link to="/signin" className="text-blue-600 hover:underline">
                    Sign in now
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
