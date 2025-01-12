import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../services/redux/store';
import { Link } from 'react-router-dom';
import Header from '@/components/Nav';
import Logo from '../../../assets/1_Transparent_Image.png';

const OrderConfirmation: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const shippingInfo = useSelector((state: RootState) => state.shipping);

  const orderID = 'Bk21334567'; // Example order ID
  const orderDate = '4th May, 2024'; // Example order date
  const totalFees =
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + 10; // Assume $10 shipping fees

  return (
    <>
      <Header />
      <div className="my-12">
        <h2 className="pt-5 text-center text-2xl font-bold">Confirmation</h2>
        <div className="mt-5 flex items-center justify-center">
          <span className="rounded-full bg-[#FCC238] px-3 py-1 text-lg font-bold text-[#030A70]">
            1
          </span>
          <div className="h-1 w-28 bg-[#FCC230] md:w-60"></div>
          <span className="rounded-full bg-[#FCC238] px-3 py-1 text-lg font-bold text-[#030A70]">
            2
          </span>
          <div className="h-1 w-28 bg-[#FCC238] md:w-60"></div>
          <span className="rounded-full bg-[#FCC238] px-3 py-1 text-lg font-bold text-[#030A70]">
            3
          </span>
        </div>
        <div className="flex hidden justify-between">
          <div className="relative right-10">profile completion</div>
          <div className="relative right-2">Shop settings</div>
          <div className="relative left-10">Product listing</div>
        </div>
      </div>
      <div className="flex min-h-screen flex-col items-center px-4">
        <div className="w-full max-w-2xl">
          <h1 className="mb-6 text-center text-3xl font-bold">
            Thank You For Your Purchase
          </h1>
          <div className="flex justify-center">
            <img src={Logo} alt="logo" className="h-28 rounded-xl" />
          </div>
          <p className="mb-5 text-center text-lg">
            Hi {shippingInfo.firstName},
            <br />
            Thank you for doing business with us. We've received your order
            confirmation and your order ID is{' '}
            <span className="font-semibold text-blue-600">{orderID}</span>.
          </p>
        </div>

        {/* Order Details Section */}
        <div className="mb-10 w-full max-w-3xl rounded-lg bg-[#FAFAFA] p-4 shadow-md">
          <h2 className="mb-6 text-left text-2xl font-semibold">
            Order details
          </h2>
          <div className="rounded-lg border bg-white">
            <table className="w-full text-left">
              <tbody>
                {/* Order Product Details */}
                {cartItems.map((product, index) => (
                  <React.Fragment key={product.id}>
                    <tr>
                      <td className="w-1/3 border px-4 py-2 font-semibold">
                        Product
                      </td>
                      <td className="border px-4 py-2">
                        <div className="flex items-center">
                          <img
                            src={product.imageSrc}
                            alt={product.name}
                            className="mr-4 h-20 w-20 rounded object-cover"
                          />
                          <div>
                            <h3 className="font-semibold">{product.name}</h3>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-semibold">
                        Store name
                      </td>
                      <td className="border px-4 py-2 text-blue-600">
                        {product.storeName}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-semibold">
                        Quantity
                      </td>
                      <td className="border px-4 py-2">{product.quantity}x</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2 font-semibold">
                        Total fees
                      </td>
                      <td className="border px-4 py-2">
                        ${(product.price * product.quantity).toFixed(2)}
                      </td>
                    </tr>
                    {/* Add a space between products */}
                    {index < cartItems.length - 1 && (
                      <tr>
                        <td colSpan={2}>
                          <hr className="my-4" />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
                {/* Order Details */}
                <tr>
                  <td className="border px-4 py-2 font-semibold">Order ID</td>
                  <td className="border px-4 py-2 text-blue-600">{orderID}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Order date</td>
                  <td className="border px-4 py-2">{orderDate}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Shipping</td>
                  <td className="border px-4 py-2">Shipping</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Ship to</td>
                  <td className="border px-4 py-2">
                    {`${shippingInfo.addressLine1}, ${shippingInfo.city}, ${shippingInfo.state.label}, ${shippingInfo.country.label}`}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    Total Order Amount
                  </td>
                  <td className="border px-4 py-2">${totalFees.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="mt-8">
            <Link to="/order-details">
              <button className="w-full rounded-md bg-[#030A70] px-6 py-3 text-white transition hover:bg-blue-800">
                View order
              </button>
            </Link>
          </div>
          <div className="mt-5 block justify-center gap-5 md:grid md:grid-cols-2">
            <Link to="/shop">
              <button className="w-full flex-1 rounded-md border border-gray-300 bg-white px-6 py-3 text-gray-700 transition hover:bg-gray-50">
                Go back to shop
              </button>
            </Link>
            <Link to="/dashboard">
              <button className="mt-2 w-full flex-1 rounded-md border border-gray-300 bg-white px-6 py-3 text-gray-700 transition hover:bg-gray-50 md:mt-0">
                Continue to dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
