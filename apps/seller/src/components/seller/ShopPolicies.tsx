import React from 'react';
import paymentOptions from '../../assets/shop-images/paymentoptions.svg';

const ShopPolicies: React.FC = () => {
  return (
    <section id="policies-section">
      <div className="rounded-lg bg-white px-6 py-8 md:px-12 md:py-20 lg:px-24">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center gap-3 md:flex-row">
          <h2 className="text-2xl font-bold text-[#19183A]">Shop policies</h2>
          <span className="text-sm text-[#717274]">
            Last updated on May 17, 2024
          </span>
        </div>

        {/* Policies Table */}
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <div className="flex md:flex-row">
            {/* Shipping Policy */}
            <div className="flex w-full items-center border border-b border-gray-200 bg-[#F6F6F6] p-4 md:w-1/3 md:border-b-0 md:border-r">
              <h3 className="font-semibold text-[##19183A]">Shipping</h3>
            </div>
            <div className="w-full border p-4 md:w-2/3">
              <h4 className="font-semibold text-[#19183A]">
                Customs and import taxes
              </h4>
              <p className="text-sm text-[#717274]">
                Buyers are responsible for any customs and import taxes that may
                apply. I'm not responsible for delays due to customs.
              </p>
            </div>
          </div>

          <div className="flex md:flex-row">
            {/* Returns & Exchanges Policy */}
            <div className="flex w-full items-center border border-b border-gray-200 bg-[#F6F6F6] p-4 md:w-1/3 md:border-b-0 md:border-r">
              <h3 className="font-semibold text-[#19183A]">
                Returns & exchanges
              </h3>
            </div>
            <div className="w-full border p-4 md:w-2/3">
              <p className="text-sm text-[#717274]">
                See item details for return and exchange eligibility.
              </p>
            </div>
          </div>

          <div className="flex md:flex-row">
            {/* Cancellations Policy */}
            <div className="flex w-full items-center border border-gray-200 bg-[#F6F6F6] p-4 md:w-1/3 md:border-b-0 md:border-r">
              <h3 className="font-semibold text-[#19183A]">Cancellations</h3>
            </div>
            <div className="w-full border p-4 md:w-2/3">
              <p className="text-sm text-[#717274]">
                Cancellations: not accepted
                <br />
                Please contact the seller if you have any problems with your
                order.
              </p>
            </div>
          </div>

          <div className="flex md:flex-row">
            {/* Payment Options */}
            <div className="flex w-full items-center border bg-[#F6F6F6] p-4 md:w-1/3">
              <h3 className="font-semibold text-[#19183A]">Payment options</h3>
            </div>
            <div className="w-full border p-4 md:w-2/3">
              <p className="mb-2 text-sm font-medium text-[#19183A]">
                Verified secured options:
              </p>
              <div className="flex items-center space-x-4">
                <img src={paymentOptions} alt="payment options" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopPolicies;
