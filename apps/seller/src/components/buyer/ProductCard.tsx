import React, { useEffect } from 'react';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { Link } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../services/hooks/useAppDispatch';
import {
  addToWishlist,
  deleteFromWishlist,
  fetchWishlist,
  selectWishlistItems,
  selectWishlistLoading,
} from '../../services/redux/slices/buyers/wishlistSlice';
import { selectIsAuthenticated } from '../../services/redux/slices/buyers/authSlice';

interface ProductCardProps {
  id: string; // Product ID
  imageSrc: string;
  productName: string;
  ratings: string;
  reviews: number;
  numberSold: number;
  price: number;
  discountPrice: number | null;
  storeName: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  imageSrc,
  productName,
  ratings,
  reviews,
  numberSold,
  price,
  discountPrice,
  storeName,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const wishlist = useAppSelector(selectWishlistItems);
  const wishlistLoading = useAppSelector(selectWishlistLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated); // Check if user is authenticated

  const isSaved = wishlist.some(wishlistItem => wishlistItem.productId === id);

  const handleWishlistToggle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (wishlistLoading) return;

    if (isSaved) {
      const wishlistItem = wishlist.find(
        wishlistItem => wishlistItem.productId === id
      );
      if (wishlistItem) {
        dispatch(deleteFromWishlist(wishlistItem.id));
      }
    } else {
      dispatch(addToWishlist(id));
    }
  };

  const discountPercentage = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  return (
    <Link
      to={`/product/${id}`}
      className="relative flex flex-col rounded-lg border p-3 hover:shadow-lg"
    >
      <img
        src={imageSrc}
        alt={productName}
        className="h-64 w-full rounded-md object-cover"
      />

      {/* Conditionally render wishlist button */}
      {isAuthenticated && (
        <button
          onClick={handleWishlistToggle}
          className={`absolute right-5 top-5 flex items-center justify-center rounded-full bg-white p-2 shadow-md ${
            wishlistLoading ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={wishlistLoading}
        >
          {isSaved ? (
            <IoMdHeart size={20} className="text-red-500" />
          ) : (
            <IoMdHeartEmpty size={20} className="text-gray-500" />
          )}
        </button>
      )}

      <h3 className="mt-3 text-lg font-semibold text-gray-800">
        {productName}
      </h3>
      <div className="mt-2 flex items-center text-sm text-gray-600">
        <span className="text-yellow-500">★ {ratings}</span>
        <span className="ml-2">({reviews} reviews)</span>
        <span className="ml-4">{numberSold}+ Sold</span>
      </div>

      <div className="mt-2">
        {discountPrice ? (
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-800">
              ${discountPrice}
            </span>
            <span className="text-sm text-gray-500 line-through">${price}</span>
            <span className="text-sm text-red-500">
              ({discountPercentage}% off)
            </span>
          </div>
        ) : (
          <span className="text-lg font-bold text-gray-800">${price}</span>
        )}
      </div>

      <div className="mt-2 text-sm text-gray-500">{storeName}</div>
    </Link>
  );
};

export default ProductCard;
