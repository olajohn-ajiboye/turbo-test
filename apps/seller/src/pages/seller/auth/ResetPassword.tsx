import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import AuthNav from '@/components/AuthNav';
import { Bars } from 'react-loader-spinner';
import BASE_URL from '@/services/api/api';

type ResetPasswordFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export function ResetPassword() {
  const location = useLocation();
  const { email } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>();

  const onSubmit: SubmitHandler<ResetPasswordFormInputs> = async data => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${BASE_URL}/users/reset_password/`,
        {
          email,
          new_password: data.password,
        }
      );

      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.detail || 'Failed to reset password. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthNav />
      <section className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          {success ? (
            <p className="mt-4 text-center text-green-600">
              Your password has been reset successfully. You can now{' '}
              <a
                href="/seller/signin"
                className="text-blue-600 hover:underline"
              >
                Sign In
              </a>
              .
            </p>
          ) : (
            <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long',
                    },
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 px-3 py-4 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value =>
                      value === watch('password') || 'Passwords do not match',
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 px-3 py-4 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                className="w-full rounded-md bg-blue-900 px-4 py-4 text-white hover:bg-blue-800"
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
                  'Reset Password'
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
