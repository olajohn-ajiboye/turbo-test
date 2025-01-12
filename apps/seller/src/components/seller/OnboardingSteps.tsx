import React, { useState } from 'react';
import sellerSignin from '../../assets/GiriSignup.png';
import { RiMagicFill } from 'react-icons/ri';
import GiriLogo from '../../assets/giri.png';
import { Link } from 'react-router-dom';

const OnboardingSteps: React.FC = () => {
  const [isPopupVisible, setPopupVisible] = useState(true);

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      {/* Popup Overlay */}
      {isPopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div>
            <div className="flex justify-center">
              <img
                src={GiriLogo}
                alt="giri logo"
                width={100}
                className="m-8 rounded-full border-4"
              />
            </div>

            <div className="relative mx-auto max-w-md rounded-lg bg-[#EDF1FB] p-8 shadow-lg">
              <button
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
                onClick={closePopup}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="flex flex-col items-center">
                <div className="mb-4 rounded-full bg-white p-4">
                  <RiMagicFill size={32} color="#030A70" />
                </div>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  Welcome aboard!
                </h2>
                <p className="mb-8 text-center text-gray-700">
                  Your account is ready to use. Set up a store and explore Giri
                  now!
                </p>
                <button
                  className="w-full rounded-md bg-[#030A70] px-6 py-3 text-lg font-semibold text-white"
                  onClick={closePopup}
                >
                  Explore Giri
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Onboarding Section */}
      <section className="flex flex-col items-center justify-between bg-white px-8 py-12 lg:flex-row lg:px-16">
        {/* Left Side: Image and Badge */}
        <div className="relative hidden lg:block lg:w-1/2">
          <div className="relative rounded-lg p-8">
            <img
              src={sellerSignin}
              alt="Seller"
              className="w-full rounded-lg"
            />
          </div>
        </div>

        {/* Right Side: Steps and CTA */}
        <div className="mx-auto max-w-xl">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
            Welcome, John!
          </h1>
          <p className="mb-8 text-sm text-[#7F8082]">
            We’re so excited for you to join our marketplace for unique and
            creative goods, where special items with a human touch shine. Ready
            to bring your shop to life?
          </p>
          <div className="relative space-y-8">
            <div className="absolute left-4 top-4 h-[80%] border-l-2 border-[#FCC230]"></div>
            <div className="relative z-10 flex items-start">
              <div className="mr-4 flex flex-col items-center">
                <span className="rounded-lg bg-[#FCC230] px-3 py-1 font-bold text-white">
                  1
                </span>
              </div>
              <div>
                <h3 className="mb-1 text-xl font-semibold text-gray-900">
                  Make your Shop Uniquely Yours
                </h3>
                <p className="text-sm text-[#7F8082]">
                  We’ll walk you through every step, from choosing a name to
                  creating your first listing.
                </p>
              </div>
            </div>
            <div className="relative z-10 flex items-start">
              <div className="mr-4 flex flex-col items-center">
                <span className="rounded-lg bg-[#FCC230] px-3 py-1 font-bold text-white">
                  2
                </span>
              </div>
              <div>
                <h3 className="mb-1 text-xl font-semibold text-gray-900">
                  Tell us a Bit about Yourself
                </h3>
                <p className="text-sm text-[#7F8082]">
                  Share some info about yourself and provide some information so
                  we know who’s behind the shop.
                </p>
              </div>
            </div>
            <div className="relative z-10 flex items-start">
              <div className="mr-4 flex flex-col items-center">
                <span className="rounded-lg bg-[#FCC230] px-3 py-1 font-bold text-white">
                  3
                </span>
              </div>
              <div>
                <h3 className="mb-1 text-xl font-semibold text-gray-900">
                  Open your Shop - Listing is free
                </h3>
                <p className="text-sm text-[#7F8082]">
                  This fee helps us invest in support for new sellers and
                  enhanced security checks to protect our trusted marketplace.
                </p>
              </div>
            </div>
            <div className="relative z-10 flex items-start">
              <div className="mr-4 flex flex-col items-center">
                <span className="rounded-lg bg-[#FCC230] px-3 py-1 font-bold text-white">
                  4
                </span>
              </div>
              <div>
                <h3 className="mb-1 text-xl font-semibold text-gray-900">
                  Get after your First Sale!
                </h3>
                <p className="text-sm text-[#7F8082]">
                  We’ll give you tons of tips to help you start selling and grow
                  your business in no time.
                </p>
              </div>
            </div>
          </div>
          <Link to="/seller/profile-completion">
            <button className="mt-8 flex items-center rounded-md bg-[#030A70] px-7 py-4 font-semibold text-white">
              Let's Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="ml-2 h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            By clicking "Let's Get Started" and opening a GiriToday shop, you're
            agreeing to Giri's{' '}
            <a href="#" className="text-blue-900 underline">
              Terms of Use
            </a>{' '}
            including our{' '}
            <a href="#" className="text-blue-900 underline">
              Seller Policy
            </a>
            ,{' '}
            <a href="#" className="text-blue-900 underline">
              Giri Payments Policy
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-900 underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
};

export default OnboardingSteps;
