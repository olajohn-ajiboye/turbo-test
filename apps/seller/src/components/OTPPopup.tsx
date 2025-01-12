import React from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Importing an icon for the close button

interface OTPPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const OTPPopup: React.FC<OTPPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle OTP verification logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-8">
        {/* Close Button */}
        <button
          type="button"
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <AiOutlineClose size={20} />
        </button>

        <h2 className="mb-2 text-center text-2xl font-bold text-[#030A70]">
          Verify action - Enter OTP
        </h2>
        <p className="mb-8 text-center text-sm text-gray-500">
          We sent an OTP to your verified email address so we verify that it’s
          really you making these changes.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex justify-center space-x-4">
            <input
              type="text"
              maxLength={1}
              className="h-14 w-14 rounded-lg border border-gray-300 text-center text-xl focus:border-[#030A70] focus:outline-none"
              required
            />
            <input
              type="text"
              maxLength={1}
              className="h-14 w-14 rounded-lg border border-gray-300 text-center text-xl focus:border-[#030A70] focus:outline-none"
              required
            />
            <input
              type="text"
              maxLength={1}
              className="h-14 w-14 rounded-lg border border-gray-300 text-center text-xl focus:border-[#030A70] focus:outline-none"
              required
            />
            <input
              type="text"
              maxLength={1}
              className="h-14 w-14 rounded-lg border border-gray-300 text-center text-xl focus:border-[#030A70] focus:outline-none"
              required
            />
            <input
              type="text"
              maxLength={1}
              className="h-14 w-14 rounded-lg border border-gray-300 text-center text-xl focus:border-[#030A70] focus:outline-none"
              required
            />
          </div>
          <div className="mb-6 flex items-center justify-center">
            <button
              type="button"
              className="text-sm text-gray-500 hover:text-[#030A70] focus:outline-none"
              onClick={() => alert('Resend OTP')}
            >
              Resend code
            </button>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-[#030A70] py-3 text-lg font-semibold text-white hover:bg-[#19183A] focus:outline-none"
          >
            Verify action
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPPopup;
