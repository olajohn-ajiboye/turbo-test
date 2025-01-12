import React from 'react';
import { useParams } from 'react-router-dom';
import { ordersData } from '../../../../services/api/orders';
import { BiSolidCopy } from 'react-icons/bi';

const PackageTracking: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  // Find the order by ID
  const order = ordersData.find(order => order.orderId === orderId);

  if (!order) {
    return <p>Order not found</p>;
  }

  const trackingSteps = [
    { label: 'Order placed on:', date: '02-11-2023', completed: true },
    {
      label: 'Shipped to Giri verification',
      date: '07-11-2023',
      completed: true,
    },
    { label: 'Shipped to you', date: '07-11-2023', completed: true },
    { label: 'Giri verified', date: '09-11-2023', completed: true },
    { label: 'Out for delivery', date: '09-11-2023', completed: true },
    {
      label: 'Delivered (Awaiting confirmation)',
      date: '07-11-2023',
      completed: false,
    },
  ];

  return (
    <section className="max-w-full rounded-lg bg-white p-6 shadow-md md:max-w-[80%]">
      <h1 className="mb-4 text-2xl font-bold text-[#19183A]">
        Package tracking history
      </h1>
      <p className="mb-2 text-sm text-gray-500">
        Hey John, your order is on the way!
      </p>
      <p className="text-sm font-semibold text-gray-800">
        Order TrackingID: {order.orderId}{' '}
        <BiSolidCopy
          className="ml-1 inline-block cursor-pointer text-gray-400"
          title="Copy Tracking ID"
        />
      </p>
      <div className="mt-6">
        {trackingSteps.map((step, index) => (
          <div
            key={index}
            className="relative mb-7 flex flex-col items-start md:mb-14 md:flex-row md:items-center"
          >
            {/* Step Icon */}
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                step.completed
                  ? 'border-yellow-500 bg-yellow-500'
                  : 'border-[#030A70] bg-[#030A70]'
              }`}
            >
              {step.completed ? (
                <span className="text-white">✓</span>
              ) : (
                <span className="text-yellow-500">🕒</span> // Clock icon for pending steps
              )}
            </span>

            {/* Step Details */}
            <div className="ml-10 mt-2 md:ml-4 md:mt-0">
              <p className="text-sm font-medium text-gray-800">{step.label}</p>
              <p className="text-xs text-gray-500">{step.date}</p>
            </div>

            {/* Line connector for steps */}
            {index !== trackingSteps.length - 1 && (
              <span className="absolute left-[14px] top-[30px] h-20 w-[3px] bg-[#FCC230] md:left-[14px] md:top-[2.1rem] md:h-16"></span>
            )}
          </div>
        ))}

        <p className="mt-4 text-sm text-gray-500">
          Your item/order is awaiting delivery confirmation.
        </p>
      </div>
    </section>
  );
};

export default PackageTracking;
