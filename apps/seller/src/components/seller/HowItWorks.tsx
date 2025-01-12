import React from 'react';
import Store from '../../assets/whysellgiri/shop.svg';
import Lists from '../../assets/whysellgiri/task-square.svg';
import Orders from '../../assets/whysellgiri/note-2.svg';
import Grow from '../../assets/whysellgiri/status-up.svg';
import ArrowRight from '../../assets/whysellgiri/arrow-right.svg';
import ArrowDown from '../../assets/whysellgiri/arrow-down.svg';
import { Link } from 'react-router-dom';

interface HowItWorksProps {
  isAuthenticated: boolean;
  isSeller: boolean | null;
  isOnboarded: boolean | null;
}

const HowItWorks: React.FC<HowItWorksProps> = ({
  isAuthenticated,
  isOnboarded,
}) => {
  const steps = [
    {
      icon: Store,
      title: 'Create Your Store',
      description:
        'Sign up and easily set up your store with detailed product listings, high-quality images, and compelling descriptions.',
    },
    {
      icon: Lists,
      title: 'List Your Products',
      description:
        'Add your unique products to your store, categorize them, and ensure each listing is optimized to attract buyers.',
    },
    {
      icon: Orders,
      title: 'Manage Orders',
      description:
        'Handle orders from purchase to delivery seamlessly, keeping track of shipping, handling returns, and maintaining customer satisfaction.',
    },
    {
      icon: Grow,
      title: 'Grow Your Business',
      description:
        'Use GiriToday’s marketing tools, insights, and dedicated support to increase your sales, reach more buyers, and boost your revenue.',
    },
  ];

  const linkTo = isAuthenticated
    ? isOnboarded
      ? '/seller-dashboard'
      : '/seller/profile-completion'
    : '/seller/signin';

  const buttonText = isAuthenticated
    ? isOnboarded
      ? 'Go to Dashboard'
      : 'Complete Profile'
    : 'Start Selling Now';

  return (
    <section className="bg-white py-12">
      <div className="mx-auto px-10 text-center lg:px-20">
        <h2 className="mb-8 text-3xl font-bold text-gray-900 lg:text-4xl">
          How it works
        </h2>
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex max-w-xs flex-col items-center text-center">
                <span className="mb-4 rounded-full bg-[#EDF1FB] p-4">
                  <img
                    src={step.icon}
                    alt={`${step.title} icon`}
                    className="h-10 w-10"
                  />
                </span>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-700">{step.description}</p>
              </div>

              {/* Render arrow only if it's not the last item */}
              {index < steps.length - 1 && (
                <>
                  <div className="hidden items-center justify-center lg:flex">
                    <img src={ArrowRight} alt="arrow right" className="w-32" />
                  </div>
                  <div className="flex w-16 items-center justify-center lg:hidden">
                    <img src={ArrowDown} alt="arrow down" />
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
        <Link to={linkTo}>
          <button className="mt-8 rounded-md bg-[#030A70] px-6 py-3 text-lg font-semibold text-white">
            {buttonText}
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HowItWorks;
