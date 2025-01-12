import React from 'react';
import {
  updateCartItemQuantity,
  deleteCartItem,
  selectCartItems,
  selectCartGrandTotal,
  selectCartLoading,
  selectCartError,
} from '../../services/redux/slices/buyers/cartSlice';
import { BsPlus, BsDash } from 'react-icons/bs';
import Header from '@/components/Nav';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const grandTotal = useAppSelector(selectCartGrandTotal);
  const loading = useAppSelector(selectCartLoading);
  const error = useAppSelector(selectCartError);

  // Placeholder for tax value (could be dynamically calculated)
  const tax = 0;
  const total = grandTotal + tax;

  // Handlers for incrementing, decrementing, and removing items
  const handleIncrement = (itemId: string, currentQuantity: number) => {
    dispatch(
      updateCartItemQuantity({ id: itemId, quantity: currentQuantity + 1 })
    );
  };

  const handleDecrement = (itemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      dispatch(
        updateCartItemQuantity({ id: itemId, quantity: currentQuantity - 1 })
      );
    }
  };

  const handleRemove = (itemId: string) => {
    dispatch(deleteCartItem(itemId));
  };

  return (
    <>
      <Header />
      <section>
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-6 text-3xl font-bold">Your cart</h1>
          {loading && <p>Loading cart...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="flex flex-col lg:flex-row lg:space-x-8">
              {/* Cart Items Section */}
              <div className="flex-grow rounded-lg bg-[#F6F6F6] p-5">
                {/* Mobile View */}
                <div className="lg:hidden">
                  {items.length === 0 ? (
                    <div className="py-8 text-center">Your cart is empty</div>
                  ) : (
                    items.map(item => (
                      <div
                        key={item.id}
                        className="mb-4 flex flex-col rounded-lg bg-white p-4 shadow-md md:flex-row md:justify-between"
                      >
                        {/* Left Section */}
                        <div className="flex gap-3 md:flex-row md:items-center">
                          {/* Use placeholder image */}
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.name}
                            className="mb-3 h-24 w-24 rounded object-cover md:mb-0"
                          />
                          <div className="md:ml-4">
                            <h3 className="font-semibold text-[#19183A]">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Save for later
                            </p>
                          </div>
                        </div>

                        {/* Right Section */}
                        <div className="mt-4 flex flex-row items-center justify-between md:ml-4 md:mt-0">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                handleDecrement(item.id, item.quantity)
                              }
                              className="rounded-md border bg-[#030A70] p-2"
                            >
                              <BsDash color="white" />
                            </button>
                            <span className="mx-2 rounded-md bg-[#F6F6F6] px-3 py-1">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleIncrement(item.id, item.quantity)
                              }
                              className="rounded-md border bg-[#030A70] p-2"
                            >
                              <BsPlus color="white" />
                            </button>
                          </div>

                          {/* Price */}
                          <p className="ml-4 font-bold text-blue-900 md:ml-8">
                            ${item.sub_total.toFixed(2)}
                          </p>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="ml-4 text-gray-500 hover:text-red-600"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Desktop View */}
                <div className="min-w-lg hidden overflow-x-scroll lg:block">
                  <table className="min-w-full text-left md:mt-5">
                    <thead>
                      <tr>
                        <th className="pb-4">Product</th>
                        <th className="pb-4">Price</th>
                        <th className="pb-4">Quantity</th>
                        <th className="pb-4">Subtotal</th>
                        <th className="pb-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center">
                            Your cart is empty
                          </td>
                        </tr>
                      ) : (
                        items.map(item => (
                          <tr key={item.id} className="border-b">
                            <td className="py-4">
                              <div className="flex items-center">
                                <img
                                  src={item.product.thumbnail}
                                  alt={item.product.name}
                                  className="mr-4 h-16 w-16 rounded object-cover"
                                />
                                <div>
                                  <h3 className="font-semibold">
                                    {item.product.name}
                                  </h3>
                                  <p className="cursor-pointer text-sm text-gray-500">
                                    Save for later
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 text-blue-900">
                              ${item.price}
                            </td>
                            <td className="py-4">
                              <div className="flex items-center">
                                <button
                                  onClick={() =>
                                    handleDecrement(item.id, item.quantity)
                                  }
                                  className="rounded-md border bg-[#030A70] p-2"
                                >
                                  <BsDash color="white" />
                                </button>
                                <span className="mx-2 rounded-md bg-[#F6F6F6] px-3 py-1">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleIncrement(item.id, item.quantity)
                                  }
                                  className="rounded-md border bg-[#030A70] p-2"
                                >
                                  <BsPlus color="white" />
                                </button>
                              </div>
                            </td>
                            <td className="py-4 text-blue-900">
                              ${item.sub_total.toFixed(2)}
                            </td>
                            <td className="py-4">
                              <button
                                onClick={() => handleRemove(item.id)}
                                className="text-gray-500 hover:text-red-600"
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Summary Section */}
              <div className="mt-8 lg:mt-0 lg:w-1/3">
                <div className="rounded-lg border bg-gray-50 p-4">
                  <h2 className="mb-4 text-xl font-bold">Order Summary</h2>

                  {items.map(item => (
                    <div key={item.id} className="mb-2 flex justify-between">
                      <span>
                        {item.product.name} ({item.quantity}x)
                      </span>
                      <span className="font-semibold">
                        ${item.sub_total.toFixed(2)}
                      </span>
                    </div>
                  ))}

                  <div className="mb-2 mt-4 flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span>Tax:</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="mb-4 flex justify-between">
                    <span>Total:</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>
                  <Link to="/shipping">
                    <button className="w-full rounded-md bg-blue-900 py-4 text-white">
                      Proceed to checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CartPage;
