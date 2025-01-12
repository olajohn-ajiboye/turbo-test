import Header from '@/components/Nav';
import React, { useState } from 'react';
import {
  FaGoogle,
  FaFacebook,
  FaApple,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';

const CheckoutLoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [createAccount, setCreateAccount] = useState(false); // For toggling create account option
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For confirm password visibility

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const toggleCreateAccount = () => setCreateAccount(!createAccount);

  return (
    <>
      <Header />
      <div className="checkout-page container mx-auto p-6">
        <h1 className="mb-8 text-3xl font-semibold text-[#030A70]">
          Continue to checkout
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Returning Customer Section */}
          <div className="returning-customer rounded-lg bg-[#fafafa] p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-[#030A70]">
              Returning Customer?
            </h2>
            <p className="mb-6 text-gray-600">
              Welcome back! Sign in to checkout.
            </p>

            {/* Email Address */}
            <div className="mb-4">
              <label className="mb-2 block text-sm text-gray-600">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            {/* Password Input with Show/Hide */}
            <div className="relative mb-4">
              <label className="mb-2 block text-sm text-gray-600">
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="**********"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10"
                />
                {/* Toggle Icon Inside Input */}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <div>
                <input type="checkbox" id="stayLoggedIn" className="mr-2" />
                <label htmlFor="stayLoggedIn" className="text-sm">
                  Stay logged in
                </label>
              </div>
              <a href="/forgot-password" className="text-sm text-[#030A70]">
                Forgot password?
              </a>
            </div>

            <button className="mb-4 w-full rounded-lg bg-[#030A70] py-2 text-white">
              Proceed to checkout
            </button>

            {/* Social Media Login */}
            <div className="mb-4 text-center text-gray-600">or login with</div>
            <div className="flex justify-center space-x-4">
              <button className="rounded-lg bg-red-500 px-4 py-2 text-white">
                <FaGoogle size={18} />
              </button>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                <FaFacebook size={18} />
              </button>
              <button className="rounded-lg bg-gray-800 px-4 py-2 text-white">
                <FaApple size={18} />
              </button>
            </div>
          </div>

          {/* Guest Checkout Section with Create Account Option */}
          <div className="guest-checkout rounded-lg bg-[#fafafa] p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-[#030A70]">
              Guest checkout?
            </h2>
            <p className="mb-6 text-gray-600">
              Not ready to become a member yet?
            </p>

            {/* Email and Confirm Email */}
            <div className="mb-4">
              <label className="mb-2 block text-sm text-gray-600">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm text-gray-600">
                Confirm email address
              </label>
              <input
                type="email"
                placeholder="Confirm email address"
                className="w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            {/* Create Account Option */}
            <div className="mb-4">
              <input
                type="checkbox"
                id="createAccount"
                checked={createAccount}
                onChange={toggleCreateAccount}
                className="mr-2"
              />
              <label htmlFor="createAccount" className="text-sm text-gray-600">
                Create an account for faster checkout next time?
              </label>
            </div>

            {/* Password and Confirm Password Fields for Account Creation */}
            {createAccount && (
              <>
                <div className="relative mb-4">
                  <label className="mb-2 block text-sm text-gray-600">
                    Password
                  </label>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10"
                    />
                    {/* Toggle Icon Inside Input */}
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <FaEyeSlash size={18} />
                      ) : (
                        <FaEye size={18} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="relative mb-4">
                  <label className="mb-2 block text-sm text-gray-600">
                    Confirm Password
                  </label>
                  <div className="relative w-full">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10"
                    />
                    {/* Toggle Icon Inside Input */}
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash size={18} />
                      ) : (
                        <FaEye size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}

            <button className="w-full rounded-lg bg-[#030A70] py-2 text-white">
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutLoginPage;
