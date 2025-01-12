import React from 'react';
import { Link } from 'react-router-dom';

interface WhySellOnGiriTodayProps {
  isAuthenticated: boolean;
  isSeller: boolean | null;
  isOnboarded: boolean | null;
}

const WhySellOnGiriToday: React.FC<WhySellOnGiriTodayProps> = ({
  isAuthenticated,
  isOnboarded,
}) => {
  return (
    <section className="flex flex-col items-center justify-between gap-10 bg-white p-10 lg:flex-row lg:p-16">
      <div className="md:px-10 lg:w-1/2">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
          Why sell on GiriToday?
        </h2>
        <p className="mb-6 text-lg text-gray-700 lg:text-xl">
          GiriToday is your ultimate platform for reaching a global audience
          with your unique products. By selling on GiriToday, you tap into a
          vast network of buyers eager for diverse and authentic items.
        </p>

        <Link
          to={
            isAuthenticated
              ? isOnboarded
                ? '/seller-dashboard'
                : '/seller/profile-completion'
              : '/seller/signin'
          }
        >
          <button className="rounded-md bg-[#030A70] px-6 py-3 text-lg font-semibold text-white">
            {isAuthenticated
              ? isOnboarded
                ? 'Go to Dashboard'
                : 'Complete Profile'
              : 'Start Selling Now'}
          </button>
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-0 lg:w-1/2">
        <div className="rounded-lg bg-gray-50 p-6 shadow-md">
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            Connect with More Buyers
          </h3>
          <p className="text-gray-700">
            GiriToday connects you with buyers from all over the world,
            increasing your visibility and potential customer base.
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-6 shadow-md">
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            Sell More Products
          </h3>
          <p className="text-gray-700">
            Promote your unique products effectively with our platform, driving
            more traffic and increasing your sales.
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-6 shadow-md">
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            Seamless Transactions
          </h3>
          <p className="text-gray-700">
            Enjoy smooth and secure transactions with GiriToday's advanced
            payment systems.
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-6 shadow-md">
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            Personalized Support
          </h3>
          <p className="text-gray-700">
            Get dedicated support to help you succeed on the platform, from
            setup to scaling.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhySellOnGiriToday;
