import React from 'react';
import { BiSolidChat } from 'react-icons/bi';
import { MdLocationOn, MdVerified } from 'react-icons/md';
import { useNavigate } from 'react-router';
import ProductImagePlaceholder from '../../../../assets/giri.png';
import {
  unfollowShop,
  selectFollowShopLoading,
} from '@/services/redux/slices/buyers/followShopSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import { Dot } from 'lucide-react';

interface FollowedShopCardProps {
  shop: {
    id: string;
    shop_name: string;
    shop_logo?: string | null;
    shop_tagline: string;
    total_products: number;
    total_followers: number;
    shop_location?: string | null;
    reviews_percentage?: number | null;
    top_products?: Array<{
      name: string;
      thumbnail: string | null;
      price: string;
      price_in_usd?: string | null;
      price_in_gbp?: string | null;
      price_in_eur?: string | null;
    }>;
  };
}

const FollowedShopCard: React.FC<FollowedShopCardProps> = ({ shop }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectFollowShopLoading);

  const handleUnfollow = () => {
    dispatch(unfollowShop(shop.id));
  };

  const handleMessageStore = () => {
    navigate(`/dashboard/inbox`);
  };

  return (
    <div className="mb-8 w-full rounded-lg bg-white p-6 shadow-lg">
      {/* Shop Info */}
      <div className="flex flex-col items-start lg:flex-row lg:items-center">
        {/* Store Profile Image */}
        <img
          src={shop.shop_logo || ProductImagePlaceholder}
          alt={shop.shop_name}
          className="mb-4 h-24 w-24 rounded-full object-cover lg:mb-0 lg:mr-6"
        />

        {/* Store Details */}
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-bold text-[#19183A]">
              {shop.shop_name}
            </h2>
            <MdVerified size={20} color="#030A70" />
          </div>
          <p className="text-sm text-gray-500">{shop.shop_tagline}</p>
          <div className="flex items-center text-sm text-gray-500">
            <span>{shop.reviews_percentage || 0}% positive reviews</span>
            <Dot />
            <span>{shop.total_followers} Followers</span>
            <Dot />
            <span>{shop.total_products}+ Sold</span>
          </div>
        </div>
      </div>

      {/* Shop Categories */}
      <div className="mt-4 flex flex-wrap gap-2">
        {['Art', 'Accessories', 'Decor', 'Beauty', 'Collectibles', '3+'].map(
          (category, index) => (
            <span
              key={index}
              className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium"
            >
              {category}
            </span>
          )
        )}
      </div>

      {/* Location and Chat Reply */}
      <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
        <MdLocationOn className="text-gray-400" />
        <span className="text-sm">
          Store location:{' '}
          <span className="text-[#030A70]">{shop.shop_location || 'N/A'}</span>
        </span>
        <BiSolidChat className="ml-4 text-gray-400" />
        <span>
          Chat reply: <span className="text-[#030A70]">98%</span>
        </span>
      </div>

      {/* Top Products */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {shop.top_products &&
          shop.top_products.map((product, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={product.thumbnail || ProductImagePlaceholder}
                alt={product.name}
                className="mb-2 h-36 w-full rounded-lg object-cover"
              />
              <p className="text-center text-sm font-medium">{product.name}</p>
              <p className="text-center text-sm font-semibold text-[#030A70]">
                ${parseFloat(product.price).toFixed(2)}
              </p>
            </div>
          ))}
      </div>

      {/* Shop Actions */}
      <div className="mt-4 flex flex-col space-y-3 lg:flex-row lg:space-x-3 lg:space-y-0">
        <button
          onClick={handleUnfollow}
          disabled={isLoading}
          className={`w-full rounded-md border px-5 py-2 text-center lg:w-60 ${
            isLoading
              ? 'cursor-not-allowed border-gray-300 text-gray-300'
              : 'border-[#030A70] text-[#030A70]'
          }`}
        >
          {isLoading ? 'Processing...' : 'Unfollow'}
        </button>
        <button
          className="w-full rounded-md border border-[#030A70] px-5 py-2 text-center text-[#030A70] lg:w-60"
          onClick={handleMessageStore}
        >
          Message store
        </button>
        <button className="w-full rounded-md bg-[#030A70] px-7 py-2 text-center text-white lg:w-60">
          Visit store
        </button>
      </div>
    </div>
  );
};

export default FollowedShopCard;
