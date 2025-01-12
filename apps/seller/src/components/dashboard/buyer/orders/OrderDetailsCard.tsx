import React, { useState } from 'react';
import StoreIcon from '../../../../assets/dashboard-icons/followed-shop.svg';
import { BiSolidCopy } from 'react-icons/bi';
import { MdArrowForwardIos } from 'react-icons/md';
import { truncateText } from '@/utils/textUtils';
import ReviewModal from './ReviewModal';
import { BuyerOrder } from '@/types/types';
import { useNavigate } from 'react-router-dom';

interface OrderDetailsCardProps {
  order: BuyerOrder; // Expect the entire order object
}

const OrderDetailsCard: React.FC<OrderDetailsCardProps> = ({ order }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [copied, setCopied] = useState(false); // State to show copied text

  const navigate = useNavigate();

  console.log(order);

  // Function to copy the order ID to the clipboard
  const handleCopyOrderId = (orderId: string) => {
    navigator.clipboard.writeText(orderId).then(() => {
      setCopied(true); // Show "Copied!" message
      setTimeout(() => {
        setCopied(false); // Revert back to the icon after 2 seconds
      }, 2000);
    });
  };

  const { booking_id, items, status, total_price, ordered_at } = order;
  const product = items[0]?.product; // Assuming the first item for display

  return (
    <>
      <div className="mb-6 w-full rounded-lg bg-white p-4 shadow-md md:p-6 xl:max-w-[80%]">
        {/* Store Name and Order Status */}
        <div className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div className="mb-2 flex items-center md:mb-0">
            <img src={StoreIcon} alt="Store" className="mr-2 h-6 w-6" />
            <h3 className="text-base font-semibold text-[#19183A] md:text-lg">
              {product?.shop_name || 'Unknown Store'}
            </h3>
            <MdArrowForwardIos
              size={20}
              className="ml-2 hidden text-[#7F8082] md:block"
            />
          </div>
          <span
            className={`mt-2 rounded-full px-3 py-1 text-xs font-medium md:mt-0 md:text-sm ${
              status === 'completed'
                ? 'bg-[#E5F9E7] text-[#1B5E20]' // Green for Completed
                : status === 'pending'
                  ? 'bg-[#FFF3CD] text-[#856404]' // Yellow for Pending
                  : status === 'failed'
                    ? 'bg-[#F8D7DA] text-[#721C24]' // Red for Cancelled
                    : 'bg-gray-200 text-gray-700' // Default (or unknown status)
            }`}
          >
            Order status: {status}
          </span>
        </div>

        {/* Product Details with Divider */}
        <div className="mb-4 flex flex-col justify-between border-b border-t border-gray-200 py-4 md:flex-row">
          <div className="mb-4 flex items-start md:mb-0">
            <img
              src={product?.thumbnail}
              alt={product?.name || 'Product'}
              className="mr-4 h-20 w-20 rounded md:h-24 md:w-24"
            />
            <div>
              <h4 className="md:text-md text-sm font-semibold text-[#19183A]">
                {truncateText(product?.name || 'Product Name', 38)}
              </h4>
              <p className="text-sm text-[#19183A]">Total: ${total_price}</p>
              <p className="text-xs text-gray-500 md:text-sm">
                Quantity: {items.length} | Order date:{' '}
                {new Date(ordered_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-2 flex flex-col items-start gap-2 md:mt-4 md:items-center">
            {status === 'completed' && (
              <button
                className="w-full rounded-md border border-[#030A70] py-2 text-sm text-[#030A70] hover:bg-[#EDF1FB] md:w-52 md:py-3"
                onClick={() => setIsReviewModalOpen(true)}
              >
                Write a review
              </button>
            )}
            <button className="w-full rounded-md bg-[#030A70] py-3 text-sm text-white md:w-52">
              Buy again
            </button>
          </div>
        </div>

        {/* Order Actions */}
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <div className="mb-2 flex items-center md:mb-0">
            <p className="text-sm text-gray-500">Order ID: {booking_id}</p>
            <div className="relative flex items-center">
              {!copied ? (
                <BiSolidCopy
                  className="ml-2 cursor-pointer text-[#C4C4C5]"
                  title="Copy Order ID"
                  onClick={() => handleCopyOrderId(booking_id)}
                />
              ) : (
                <span className="ml-2 rounded-lg bg-[#C4C4C5] px-2 py-1 text-xs text-white">
                  Copied!
                </span>
              )}
            </div>
          </div>
          <button
            className="flex items-center text-sm font-medium text-[#030A70]"
            onClick={() => navigate(`${booking_id}`)} // Relative path to stay within the orders page
          >
            View order full details{' '}
            <MdArrowForwardIos className="ml-2 hidden md:block" />
          </button>
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={data => {
          console.log('Review Submitted:', data);
        }}
      />
    </>
  );
};

export default OrderDetailsCard;
