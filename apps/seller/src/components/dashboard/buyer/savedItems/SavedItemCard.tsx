import { useAppDispatch } from '@/services/hooks/useAppDispatch';
import { deleteFromWishlist } from '@/services/redux/slices/buyers/wishlistSlice';
import React from 'react';
import { FaStar } from 'react-icons/fa';

interface SavedItemCardProps {
  item: {
    id: string;
    productId: string;
    name: string;
    thumbnail: string;
    totalSold: number;
    price: string;
    discount: string;
    ratings: string;
    reviews: number;
    shopName: string;
  };
}

const SavedItemCard: React.FC<SavedItemCardProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteFromWishlist(item.id));
  };

  const handleMoveToCart = () => {
    // Implement moving the item to the cart
    console.log('Move to cart:', item.productId);
  };

  return (
    <div className="mb-4 flex w-full flex-col justify-between rounded-lg bg-white p-4 shadow-md md:flex-row md:items-center xl:max-w-[80%]">
      {/* Product Image */}
      <img
        src={item.thumbnail}
        alt={item.name}
        className="mb-4 h-32 w-full rounded-md object-cover md:mb-0 md:w-32"
      />

      {/* Product Details */}
      <div className="mb-4 flex-1 px-0 md:mb-0 md:px-4">
        <h3 className="text-md mb-1 font-semibold text-[#19183A] md:text-lg">
          {item.name}
        </h3>
        <div className="mb-2 flex items-center text-sm text-gray-500">
          <FaStar className="mr-1 text-yellow-500" />
          <span className="font-medium text-[#030A70]">
            {parseFloat(item.ratings).toFixed(1)}
          </span>
          <span className="ml-1">({item.reviews} reviews)</span>
          <span className="mx-2">•</span>
          <span>{item.totalSold} Sold</span>
        </div>
        <div className="text-md mb-1 font-semibold text-[#19183A]">
          ${item.price}
          <span className="ml-2 text-yellow-500">({item.discount} off)</span>
        </div>
        <div className="text-sm text-[#030A70]">{item.shopName}</div>
      </div>

      {/* Action Buttons */}
      <div className="flex w-full flex-col items-center justify-center gap-3 md:w-auto">
        <button
          className="w-full rounded-md border border-[#030A70] py-3 text-sm text-[#030A70] hover:bg-[#EDF1FB] md:w-52"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="w-full rounded-md bg-[#030A70] py-3 text-sm text-white md:w-52"
          onClick={handleMoveToCart}
        >
          Move to cart
        </button>
      </div>
    </div>
  );
};

export default SavedItemCard;
