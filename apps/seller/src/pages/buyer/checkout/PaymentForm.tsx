import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../services/redux/store';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Card from '../../../assets/payment/Card.svg';
import Header from '@/components/Nav';
import { FaLock } from 'react-icons/fa';

type FormData = {
  cardName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  termsAccepted: boolean;
};

const PaymentForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const shippingInfo = useSelector((state: RootState) => state.shipping);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFees = 10; // Assume a fixed shipping fee for now
  const total = subtotal + shippingFees;

  const onSubmit: SubmitHandler<FormData> = data => {
    console.log(data);
  };

  return (
    <>
      <Header />
      <div className="my-6">
        <h2 className="pt-5 text-center text-2xl font-bold">Payment</h2>
        <div className="mt-5 flex items-center justify-center">
          {/* Steps indicators */}
          <span className="rounded-full bg-[#FCC238] px-3 py-1 text-lg font-bold text-[#030A70]">
            1
          </span>
          <div className="h-1 w-28 bg-[#FCC230] md:w-60"></div>
          <span className="rounded-full bg-[#FCC238] px-3 py-1 text-lg font-bold text-[#030A70]">
            2
          </span>
          <div className="h-1 w-28 bg-gray-300 md:w-60"></div>
          <span className="rounded-full bg-[#F6F6F6] px-3 py-1 text-lg font-bold text-gray-400">
            3
          </span>
        </div>
      </div>

      {/* Payment Secured Notice */}
      <div className="mx-auto my-6 flex max-w-5xl items-center justify-center px-4">
        {/* Left Line */}
        <div className="flex-grow border-t border-gray-200"></div>

        {/* Lock Icon and Text */}
        <div className="mx-4 flex items-center whitespace-nowrap text-[#030A70]">
          <FaLock className="mr-2" />
          <span className="text-sm font-medium">Payment 100% secured</span>
        </div>

        {/* Right Line */}
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-screen flex-col items-center px-4 pb-10"
      >
        <div className="w-full max-w-6xl rounded-lg bg-[#FAFAFA] p-3 shadow-md md:p-8">
          {/* Fees Summary */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold">Fees summary</h3>
              <div className="rounded-lg">
                <div className="flex justify-between">
                  <span className="w-full border bg-white px-3 py-3">
                    Total
                  </span>
                  <span className="w-full border bg-white px-3 py-3 text-lg font-bold">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="w-full border bg-white px-3 py-3">
                    Subtotal
                  </span>
                  <span className="w-full border bg-white px-3 py-3">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span className="w-full border bg-white px-3 py-3">
                    Shipping fees
                  </span>
                  <span className="w-full border bg-white px-3 py-3">
                    ${shippingFees.toFixed(2)}
                  </span>
                </div>
              </div>
              <h3 className="mb-4 mt-8 text-xl font-semibold">Shipping to</h3>
              <div className="rounded-lg border bg-white p-4 text-sm">
                <p className="mb-1">
                  <strong>
                    {shippingInfo.firstName} {shippingInfo.lastName}
                  </strong>
                </p>
                <p>{shippingInfo.addressLine1}</p>
                <p>{shippingInfo.addressLine2}</p>
                <p>
                  {shippingInfo.city}, {shippingInfo.state.label},{' '}
                  {shippingInfo.country.label}
                </p>
                <p>{shippingInfo.postalCode}</p>
                <p>{shippingInfo.phoneNumber}</p>
                <Link
                  to="/shipping"
                  className="mt-3 inline-block text-blue-600"
                >
                  Edit details
                </Link>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              {/* Payment Cards */}
              <h3 className="mb-4 text-xl font-semibold">Payment method</h3>
              <div className="scrollbar-hidden mb-4 flex space-x-2 overflow-auto">
                <div className="flex flex-col justify-center rounded-xl border bg-[#030A70] px-5 py-1 text-sm text-[white]">
                  <img src={Card} alt="card" className="h-10 w-10" />
                  <span>Card</span>
                </div>
                {/* More payment options... */}
              </div>

              {/* Payment Form */}
              <label
                className="mb-2 block font-medium text-gray-700"
                htmlFor="cardName"
              >
                Card Name
              </label>
              <input
                {...register('cardName')}
                id="cardName"
                placeholder="Enter details here"
                className="input-field mb-6 w-full px-3 py-3"
              />

              <label
                className="mb-2 block font-medium text-gray-700"
                htmlFor="cardNumber"
              >
                Card Number
              </label>
              <input
                {...register('cardNumber')}
                id="cardNumber"
                placeholder="123 456 789 0993"
                className="input-field mb-6 w-full px-3 py-3"
              />

              {/* Expiration Date and CVV */}
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="mb-2 block font-medium text-gray-700"
                    htmlFor="expirationDate"
                  >
                    Expiration Date (MM/YY)
                  </label>
                  <input
                    {...register('expirationDate')}
                    id="expirationDate"
                    placeholder="MM/YY"
                    className="input-field w-full px-3 py-3"
                  />
                </div>
                <div>
                  <label
                    className="mb-2 block font-medium text-gray-700"
                    htmlFor="cvv"
                  >
                    CVV
                  </label>
                  <input
                    {...register('cvv')}
                    id="cvv"
                    placeholder="***"
                    className="input-field w-full px-3 py-3"
                  />
                </div>
              </div>

              {/* Terms and Payment Button */}
              <label className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  {...register('termsAccepted')}
                  className="mr-2"
                />
                <span>
                  I accept the{' '}
                  <Link to="#" className="text-blue-600">
                    terms of service
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                className="w-full rounded-md bg-[#030A70] px-6 py-3 text-white transition hover:bg-blue-800"
              >
                Make payment
              </button>
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="mt-8 w-full max-w-6xl rounded-lg bg-[#FAFAFA] p-6 shadow-md">
          <h3 className="mb-4 text-xl font-semibold">Product information</h3>

          {/* Responsive layout */}
          <div className="lg:hidden">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="mb-4 rounded-lg bg-white p-4 shadow-md"
              >
                <div className="flex gap-3">
                  {/* Image and Info */}
                  <img
                    src={item.imageSrc}
                    alt={item.name}
                    className="h-24 w-24 rounded object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-[#19183A]">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Store name:{' '}
                      <Link
                        to={`/store/${item.storeName}`}
                        className="text-blue-600"
                      >
                        {item.storeName}
                      </Link>
                    </p>
                    <p className="mt-1 text-sm">
                      Quantity:{' '}
                      <span className="font-semibold">{item.quantity}x</span>
                    </p>
                    <p className="mt-1 text-sm">
                      Shipping:{' '}
                      <span className="font-semibold text-blue-600">
                        5 days
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-5 gap-4">
              <span className="col-span-2 font-medium text-gray-500">
                Product
              </span>
              <span className="font-medium text-gray-500">Store name</span>
              <span className="font-medium text-gray-500">Quantity</span>
              <span className="font-medium text-gray-500">Shipping</span>
            </div>
            {cartItems.map(item => (
              <div
                key={item.id}
                className="grid grid-cols-5 items-center gap-4 border-t py-4"
              >
                <div className="col-span-2 flex items-center">
                  <img
                    src={item.imageSrc}
                    alt={item.name}
                    className="mr-4 h-16 w-16 rounded object-cover"
                  />
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                </div>
                <Link to={`/store/${item.storeName}`} className="text-blue-600">
                  {item.storeName}
                </Link>
                <p className="font-medium text-gray-800">{item.quantity}x</p>
                <p className="font-medium text-blue-600">5 days</p>
              </div>
            ))}
          </div>
        </div>
      </form>
    </>
  );
};

export default PaymentForm;
