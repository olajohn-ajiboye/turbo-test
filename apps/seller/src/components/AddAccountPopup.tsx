import React from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Importing an icon for the close button

interface AddAccountPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (accountDetails: any) => void;
}

const AddAccountPopup: React.FC<AddAccountPopupProps> = ({
  isOpen,
  onClose,
  onVerify,
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Example data for now, update with actual form data
    const accountDetails = {
      accountName: 'John Doe',
      bank: 'Sample Bank',
      accountNumber: '123456789',
    };
    onVerify(accountDetails);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-[#fafafa] p-6">
        {/* Close Button */}
        <button
          type="button"
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <AiOutlineClose size={20} />
        </button>

        <h2 className="mb-2 text-center text-2xl font-bold text-[#030A70]">
          Enter new account
        </h2>
        <p className="mb-6 text-center text-sm text-gray-500">
          Enter new account details that you can use to withdraw the money from
          your account.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-medium text-[#19183A]"
              htmlFor="accountName"
            >
              Account Name
            </label>
            <input
              type="text"
              id="accountName"
              className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-700"
              placeholder="Enter account name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-medium text-[#19183A]"
              htmlFor="bank"
            >
              Account Bank
            </label>
            <input
              type="text"
              id="bank"
              className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-700"
              placeholder="Enter bank"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-medium text-[#19183A]"
              htmlFor="accountNumber"
            >
              Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-700"
              placeholder="Enter account number"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-medium text-[#19183A]"
              htmlFor="reenterAccountNumber"
            >
              Re-Enter Account Number
            </label>
            <input
              type="text"
              id="reenterAccountNumber"
              className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-700"
              placeholder="Enter account number"
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full rounded-md bg-[#030A70] py-3 font-semibold text-white hover:bg-[#19183A]"
            >
              Verify action
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccountPopup;
