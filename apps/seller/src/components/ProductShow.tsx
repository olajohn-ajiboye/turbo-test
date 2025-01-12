import React, { useEffect, useState } from 'react';
import { FaFlag, FaSyncAlt } from 'react-icons/fa';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import { ProductDetail } from '../types/types';
import DotSeparator from './UI/dotSeperator';
import {
  addToWishlist,
  deleteFromWishlist,
  selectWishlistItems,
  selectWishlistLoading,
} from '@/services/redux/slices/buyers/wishlistSlice';
import { selectIsAuthenticated } from '@/services/redux/slices/buyers/authSlice';
import {
  addItemToCart,
  deleteCartItem,
  selectCartItems,
} from '@/services/redux/slices/buyers/cartSlice';

interface ProductShowProps {
  product: ProductDetail;
}

const ProductShow: React.FC<ProductShowProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [selectedVariation, setSelectedVariation] = useState<string | null>(
    product.variations.length > 0 ? product.variations[0].option_value : null
  );

  const dispatch = useAppDispatch();

  // Fetch states
  const wishlist = useAppSelector(selectWishlistItems);
  const wishlistLoading = useAppSelector(selectWishlistLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const cartItems = useAppSelector(selectCartItems);

  // Check if the product is in the wishlist
  const isSaved = wishlist.some(item => item.productId === product.id);
  const wishlistEntryId = isSaved
    ? wishlist.find(item => item.productId === product.id)?.id
    : null;

  // Check if the product is in the cart
  const isInCart = cartItems.some(item => item.product.id === product.id);
  const cartItemId = isInCart
    ? cartItems.find(item => item.product.id === product.id)?.id
    : null;

  useEffect(() => {
    if (product && product.media.length > 0) {
      const thumbnail =
        product.media.find(media => media.is_thumbnail) || product.media[0];
      setSelectedImage(thumbnail.file);
    }
  }, [product]);

  const discountPercentage = product.discount
    ? Math.round(
        ((parseFloat(product.price) - parseFloat(product.discount)) /
          parseFloat(product.price)) *
          100
      )
    : 0;

  const handleSaveProduct = () => {
    if (isSaved && wishlistEntryId) {
      dispatch(deleteFromWishlist(wishlistEntryId));
    } else {
      dispatch(addToWishlist(product.id));
    }
  };

  const handleCartToggle = () => {
    if (isInCart && cartItemId) {
      dispatch(deleteCartItem(cartItemId));
    } else {
      const itemData = {
        product: product.id,
        variation: selectedVariation || undefined,
        quantity: 1,
      };
      dispatch(addItemToCart(itemData));
    }
  };

  return (
    <section>
      <div className="mx-auto grid grid-cols-1 gap-8 px-5 py-8 md:grid-cols-2 md:px-20">
        {/* Left Section: Image and Image Slider */}
        <div>
          <img
            src={selectedImage}
            alt={product.name}
            className="h-[405px] w-full rounded-md md:h-[500px]"
          />
          <div className="mt-4 flex space-x-2 overflow-x-auto">
            {product.media.map((image, index) => (
              <img
                key={image.id}
                src={image.file}
                alt={`Thumbnail ${index + 1}`}
                className={`h-16 w-16 cursor-pointer rounded-md ${
                  selectedImage === image.file ? 'border-2 border-blue-900' : ''
                }`}
                onClick={() => setSelectedImage(image.file)}
              />
            ))}
          </div>
        </div>

        {/* Right Section: Product Information */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <p className="mt-2 text-sm text-gray-500">
            {product.shop.name} - {product.shop.tagline}
          </p>

          {/* Ratings */}
          <div className="mt-2 flex items-center gap-1">
            <div className="text-yellow-500">
              {[...Array(product.average_rating)].map((_, index) => (
                <span key={index}>★</span>
              ))}
            </div>
            <p className="ml-2 text-gray-600">
              {product.average_rating} ({product.reviews.length} reviews)
            </p>
            <DotSeparator />
            <p className="text-[#999999]">{product.total_sold} sold</p>
          </div>

          {/* Price */}
          <div className="mt-4">
            {product.discount !== '0.00' && (
              <p className="text-3xl font-bold text-blue-900">
                ${parseFloat(product.discount).toFixed(2)}
              </p>
            )}
            <p className="text-sm text-gray-600">
              {product.discount !== '0.00' && (
                <>
                  <span className="line-through">
                    ${parseFloat(product.price).toFixed(2)}
                  </span>{' '}
                  <span>({discountPercentage}% off)</span>
                </>
              )}
            </p>
          </div>

          {/* Variations */}
          {product.variations.length > 0 && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Size
              </label>
              <select
                value={selectedVariation || ''}
                onChange={e => setSelectedVariation(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                {product.variations.map((variation, index) => (
                  <option key={index} value={variation.option_value}>
                    {variation.option_value}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6">
            <button
              onClick={handleCartToggle}
              className={`w-full rounded-md border px-4 py-3 ${
                isInCart
                  ? 'border-red-600 text-red-600 hover:bg-red-100'
                  : 'border-blue-900 text-blue-900 hover:bg-blue-100'
              }`}
            >
              {isInCart ? 'Remove from cart' : 'Add to cart'}
            </button>
            {isAuthenticated && (
              <button
                onClick={handleSaveProduct}
                disabled={wishlistLoading}
                className={`mt-4 w-full rounded-md border px-4 py-3 ${
                  wishlistLoading
                    ? 'cursor-not-allowed border-gray-400 text-gray-400'
                    : 'border-[#030A70] text-blue-900 hover:bg-blue-100'
                }`}
              >
                {wishlistLoading
                  ? 'Saving...'
                  : isSaved
                    ? 'Remove from Saved Items'
                    : 'Save Product'}
              </button>
            )}
            <button className="mt-4 w-full rounded-md bg-[#030A70] px-4 py-3 text-white hover:bg-blue-800">
              Buy now
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <a href="#" className="hover:underline">
              <FaSyncAlt className="mr-1 inline-block" />
              Delivery and return policies
            </a>
            <a href="#" className="hover:underline">
              <FaFlag className="mr-1 inline-block" />
              Report this product
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShow;
