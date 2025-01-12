import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ordersData } from '../../../services/api/orders';
import storeIcon from '../../../assets/dashboard-icons/followed-shop.svg';
import { truncateText } from '@/utils/textUtils';

const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  // Find the order by ID
  const order = ordersData.find(order => order.orderId === orderId);
  const navigate = useNavigate();

  if (!order) {
    return <p>Order not found</p>; // Handle case where no order is found
  }

  return (
    <>
      <section>
        <h1 className="mb-4 text-2xl font-bold text-[#19183A]">
          Order details
        </h1>

        {/* First Section: Order Information */}
        <div className="w-full rounded-lg bg-white p-6 shadow-md md:max-w-[80%]">
          <div className="grid justify-between gap-4 lg:flex lg:items-center">
            <div>
              <p className="text-lg font-semibold text-[#19183A]">
                Order ID: {order.orderId}
              </p>
              <p className="text-[#B6B6B7]">
                {order.quantity} Items
                <br />
                Placed on: {order.date}
                <br />
                Expected delivery date: {order.expectedDelivery}
                <br />
                Total: ${order.total}
              </p>
            </div>
            <div className="mt-4 lg:mt-0 lg:flex-shrink-0">
              <button
                className="rounded-md border border-[#030A70] px-6 py-2 text-[#030A70] hover:bg-[#EDF1FB]"
                onClick={() => navigate(`/dashboard/orders/${orderId}/track`)}
              >
                Track order
              </button>
            </div>
          </div>
        </div>

        {/* Second Section: Product Details and Store Information */}
        <div className="mt-6 w-full rounded-lg bg-white p-6 shadow-md md:max-w-[80%]">
          <div className="grid items-start justify-between gap-4 lg:flex">
            {/* Product Image and Details */}
            <div className="flex items-start">
              <img
                src={order.productImage}
                alt={order.product}
                className="mr-4 h-20 w-20 rounded md:h-24 md:w-24"
              />
              <div>
                <h4 className="text-base font-semibold text-[#19183A] md:text-lg">
                  {truncateText(order.product, 38)}
                </h4>
                <p className="text-sm text-[#19183A]">Total: {order.total}</p>
                <p className="text-xs text-gray-500">
                  Quantity: {order.quantity} | Order date: {order.date}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-start gap-2 md:items-center">
              <button className="w-full rounded-md border border-[#030A70] py-2 text-sm text-[#030A70] hover:bg-[#EDF1FB] md:w-52 md:py-3">
                Write a review
              </button>
              <button className="w-full rounded-md bg-[#030A70] py-3 text-sm text-white md:w-52">
                Buy again
              </button>
            </div>
          </div>

          {/* Store Information */}
          <div className="mt-4 flex items-center text-[#030A70]">
            <img src={storeIcon} alt="Store" className="mr-2 h-6 w-6" />
            <p className="text-sm font-medium">{order.storeName}</p>
            <span className="ml-2 text-[#7F8082]">&gt;</span>
          </div>
        </div>

        {/* Third Section: Payment and Delivery Information */}
        <div className="mt-6 grid gap-6 md:max-w-[80%] lg:grid-cols-2">
          {/* Payment Information */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold text-[#19183A]">
              Payment information
            </h2>
            <p className="mb-1 font-medium text-[#35006E]">Payment Method</p>
            <p className="text-[#19183A]">
              Pay with Cards, Bank Transfer or USSD
            </p>

            <p className="mb-1 mt-4 font-medium text-[#35006E]">
              Payment Details
            </p>
            <p className="text-[#19183A]">Item price: $219.95</p>
            <p className="text-[#19183A]">Delivery price: $1.5</p>

            <p className="mt-4 font-bold text-[#030A70]">
              Total fee: ${order.total}
            </p>
          </div>

          {/* Delivery Information */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold text-[#19183A]">
              Delivery information
            </h2>
            <p className="mb-1 font-medium text-[#35006E]">Shipping Address</p>
            <p className="text-[#19183A]">
              John Smith, 4455 Landing Lange, APT 4, Louisville, KY 40018-1234
            </p>

            <p className="mb-1 mt-4 font-medium text-[#35006E]">
              Shipping Details
            </p>
            <p className="text-[#19183A]">
              Delivery between 29 November and 06 December.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderDetailsPage;
