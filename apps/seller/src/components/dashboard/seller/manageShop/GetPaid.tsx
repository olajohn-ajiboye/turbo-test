import AddAccountPopup from '@/components/AddAccountPopup';
import OTPPopup from '@/components/OTPPopup';
import { useState } from 'react';

const GetPaid = () => {
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [isOTPOpen, setIsOTPOpen] = useState(false);

  const handleOpenAddAccount = () => setIsAddAccountOpen(true);
  const handleCloseAddAccount = () => setIsAddAccountOpen(false);

  const handleOpenOTP = () => setIsOTPOpen(true);
  const handleCloseOTP = () => setIsOTPOpen(false);

  const handleVerifyAccount = (accountDetails: any) => {
    console.log('Account Details:', accountDetails);
    handleCloseAddAccount();
    handleOpenOTP(); // Open the OTP popup after verifying account details
  };

  return (
    <section className="rounded-lg bg-[#F6F7FB] p-6">
      {/* Balance Section */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#19183A]">
            Available balance
          </h3>
          <p className="text-3xl font-bold text-[#030A70]">$102,000.020</p>
        </div>
        <button className="rounded-md bg-[#030A70] px-4 py-2 text-white">
          Withdraw balance
        </button>

        <AddAccountPopup
          isOpen={isAddAccountOpen}
          onClose={handleCloseAddAccount}
          onVerify={handleVerifyAccount}
        />

        {/* OTPPopup Component */}
        <OTPPopup isOpen={isOTPOpen} onClose={handleCloseOTP} />
      </div>

      {/* Transactions Section */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-lg font-semibold text-[#19183A]">Transactions</h4>
          <button className="rounded-md border border-[#030A70] px-4 py-2 text-[#030A70]">
            View all transactions
          </button>
        </div>

        {/* Transactions Table */}
        <table className="w-full border-collapse overflow-hidden rounded-lg bg-white">
          <thead>
            <tr className="bg-[#EDF1FB] text-left text-[#19183A]">
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample transactions */}
            <tr className="border-t border-gray-200">
              <td className="px-4 py-3">Oct 09, 2023</td>
              <td className="px-4 py-3">Payment of goods</td>
              <td className="px-4 py-3 text-green-600">+$4,448.43</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-4 py-3">Sept 09, 2023</td>
              <td className="px-4 py-3">Withdrawal of funds</td>
              <td className="px-4 py-3 text-red-600">-$4,448.43</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-4 py-3">Sept 09, 2023</td>
              <td className="px-4 py-3">Withdrawal of funds</td>
              <td className="px-4 py-3 text-red-600">-$4,448.43</td>
            </tr>
            {/* Additional transactions as necessary */}
          </tbody>
        </table>
      </div>

      {/* Withdrawal Methods Section */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-lg font-semibold text-[#19183A]">
            Withdrawal method
          </h4>
          <button
            onClick={handleOpenAddAccount}
            className="rounded-md border border-[#030A70] px-4 py-2 text-[#030A70]"
          >
            Add withdrawal method
          </button>
        </div>

        {/* Withdrawal methods list */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="flex items-center">
              <span className="mr-2 text-[#030A70]">
                {/* Bank Icon */}
                <svg
                  className="inline-block h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {/* SVG code for bank icon */}
                </svg>
              </span>
              Bank account ending in 3645{' '}
              <span className="ml-2 rounded bg-gray-200 px-2 py-1 text-xs">
                Default
              </span>
            </p>
            <div className="space-x-4">
              <button className="text-sm text-blue-600">Edit</button>
              <button className="text-sm text-red-600">Remove</button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="flex items-center">
              <span className="mr-2 text-[#030A70]">
                {/* Bank Icon */}
                <svg
                  className="inline-block h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {/* SVG code for bank icon */}
                </svg>
              </span>
              Bank account ending in 4256
            </p>
            <div className="space-x-4">
              <button className="text-sm text-blue-600">Edit</button>
              <button className="text-sm text-red-600">Remove</button>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Balance Section */}
      <div className="rounded-lg bg-white p-4 shadow">
        <h4 className="text-lg font-semibold text-[#19183A]">Loan balance</h4>
        <p className="text-3xl font-bold text-[#030A70]">$50,000.020</p>
        <p className="mb-4 text-xs text-gray-500">
          *Loans are automatically deducted from earnings but you can pay for
          your loans yourself.
        </p>
        <button className="rounded-md bg-[#030A70] px-4 py-2 text-white">
          Pay loan balance
        </button>
      </div>
    </section>
  );
};

export default GetPaid;
