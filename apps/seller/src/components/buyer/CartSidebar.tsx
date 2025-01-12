import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { BsPlus, BsDash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import {
  deleteCartItem,
  selectCartGrandTotal,
  selectCartItems,
  updateCartItemQuantity,
} from '@/services/redux/slices/buyers/cartSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const grandTotal = useAppSelector(selectCartGrandTotal);
  const navigate = useNavigate();

  const handleIncreaseQuantity = (itemId: string, currentQuantity: number) => {
    dispatch(
      updateCartItemQuantity({ id: itemId, quantity: currentQuantity + 1 })
    );
  };

  const handleDecreaseQuantity = (itemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      dispatch(
        updateCartItemQuantity({ id: itemId, quantity: currentQuantity - 1 })
      );
    }
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(deleteCartItem(itemId));
  };

  return (
    <div
      className={`fixed right-0 z-50 h-full w-full bg-white shadow-lg transition-transform duration-300 md:w-1/3 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-bold">In your cart ({items.length})</h2>
        <button onClick={onClose} className="text-lg font-semibold">
          Close &times;
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-grow overflow-y-auto p-4">
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          items.map(item => (
            <div
              key={item.id}
              className="mb-4 flex items-center justify-between border-b pb-4"
            >
              {/* Product Image */}
              <img
                src={item.product.thumbnail}
                alt={item.product.name}
                className="h-24 w-24 rounded-md object-cover"
              />

              {/* Product Details */}
              <div className="ml-4 flex-grow">
                <h3 className="text-sm font-semibold">{item.product.name}</h3>
                <p className="mt-1 text-sm font-bold">
                  ${parseFloat(item.price).toFixed(2)}
                </p>
                <div className="mt-2 flex items-center gap-1">
                  {/* Decrement Button */}
                  <button
                    onClick={() =>
                      handleDecreaseQuantity(item.id, item.quantity)
                    }
                    className="rounded-md border bg-[#030A70] p-2"
                  >
                    <BsDash className="text-[#FFF]" />
                  </button>
                  {/* Quantity Display */}
                  <span className="rounded-md bg-[#F6F6F6] px-3 py-1">
                    {item.quantity}
                  </span>
                  {/* Increment Button */}
                  <button
                    onClick={() =>
                      handleIncreaseQuantity(item.id, item.quantity)
                    }
                    className="rounded-md border bg-[#030A70] p-2"
                  >
                    <BsPlus className="text-[#FFF]" />
                  </button>
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="ml-4 text-gray-500 hover:text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Cart Summary */}
      <div className="border-t p-4">
        <div className="mb-2 flex justify-between">
          <span className="font-semibold">Subtotal:</span>
          <span className="font-semibold text-[#030A70]">
            ${grandTotal.toFixed(2)}
          </span>
        </div>
        <p className="text-xs text-gray-500">
          Note: This is the subtotal without shipping
        </p>
        <button
          className="mt-4 w-full rounded-md bg-[#030A70] py-2 font-semibold text-white"
          onClick={() => {
            onClose();
            navigate('/cart');
          }}
        >
          View full cart
        </button>
        <button
          className="mt-2 w-full rounded-md bg-[#030A70] py-2 font-semibold text-white"
          onClick={() => {
            navigate('/guest-checkout');
          }}
        >
          Check out
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
