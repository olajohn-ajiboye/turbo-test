import { useForm, SubmitHandler } from 'react-hook-form';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AuthNav from '@/components/AuthNav';
import {
  selectAuthError,
  selectAuthLoading,
  sendResetPasswordEmail,
} from '@/services/redux/slices/buyers/authSlice';

type ForgotPasswordFormInputs = {
  email: string;
};

export function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>();

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = data => {
    console.log('Payload being sent:', data); // Ensure this contains the email
    dispatch(sendResetPasswordEmail(data))
      .unwrap()
      .then(res => console.log('Response:', res))
      .catch(err => console.error('Error:', err));
  };

  return (
    <>
      <AuthNav />
      <section>
        <div className="flex min-h-screen">
          {/* Form Section */}
          <div className="flex w-full flex-col justify-center p-8 md:w-1/2">
            <div className="mx-auto w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800">
                Forgot your password?
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                No worries! Enter your email below and we'll send you a link to
                reset your password.
              </p>

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
                    className="mt-1 block w-full rounded-md border-gray-300 px-3 py-4 shadow-sm"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-900 px-4 py-4 text-white hover:bg-blue-800"
                  style={{ backgroundColor: '#030A70' }}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>

                {error && (
                  <p className="mt-4 text-center text-sm text-red-600">
                    {error}
                  </p>
                )}

                <div className="mt-6 text-center text-gray-600">
                  <Link
                    to="/signin"
                    className="flex items-center justify-center text-blue-600 hover:underline"
                  >
                    <FaArrowLeft className="mr-2" /> Back to Sign In
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
