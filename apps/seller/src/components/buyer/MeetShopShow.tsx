import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { ProductDetail } from '@/types/types';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import {
  followShop,
  unfollowShop,
  getFollowedShops,
  selectFollowedShops,
  selectFollowShopLoading,
} from '@/services/redux/slices/buyers/followShopSlice';
import { useNavigate } from 'react-router';

interface ShopPageProps {
  product: ProductDetail;
}

const ShopPage: React.FC<ShopPageProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const followedShops = useAppSelector(selectFollowedShops);
  const isLoading = useAppSelector(selectFollowShopLoading);

  // Determine follow status dynamically based on Redux state
  const isFollowing = followedShops.some(shop => shop.id === product.shop.id);

  useEffect(() => {
    // Fetch the list of followed shops on page load
    dispatch(getFollowedShops());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleFollow = () => {
    dispatch(followShop(product.shop.id))
      .unwrap()
      .catch(error => {
        console.error('Failed to follow shop:', error);
      });
  };

  const handleUnfollow = () => {
    dispatch(unfollowShop(product.shop.id))
      .unwrap()
      .catch(error => {
        console.error('Failed to unfollow shop:', error);
      });
  };

  return (
    <div className="py-10 md:px-20">
      <div className="grid grid-cols-1 pb-5 md:grid-cols-2">
        {/* Shop Info Card */}
        <div className="bg-[#EDF1FB] p-5 md:mr-5">
          <h2 className="pb-3 text-xl font-bold">Meet the shop</h2>
          <div className="rounded-lg bg-white p-6">
            <div className="mb-4">
              <img
                src={product.shop.logo}
                alt="Shop Logo"
                className="mb-4 mr-4 h-20 w-20 rounded-full"
              />
              <div>
                <h2 className="text-xl font-bold">{product.shop.name}</h2>
                <p className="text-gray-500">Shop description</p>
              </div>
            </div>
            <p className="mb-2 text-sm text-gray-700">
              96.3% positive reviews • 636 Followers • 5000+ Sold
            </p>
            <p className="mb-4 text-sm text-gray-700">
              Store location:{' '}
              <span className="font-semibold">
                {product.shop.address.state}, {product.shop.address.country}
              </span>
            </p>
            <div className="grid gap-3 pb-4 md:flex">
              {/* Follow/Unfollow Button */}
              {!isFollowing ? (
                <button
                  onClick={handleFollow}
                  disabled={isLoading}
                  className={`w-full rounded-md border bg-white px-6 py-2 text-sm text-[#030A70] ring-1 ring-[#030A70] hover:bg-[#EDF1FB] active:bg-[#030A70] active:text-white ${
                    isLoading ? 'cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'loading...' : 'Follow store'}
                </button>
              ) : (
                <button
                  onClick={handleUnfollow}
                  disabled={isLoading}
                  className={`w-full rounded-md border bg-white px-6 py-2 text-sm text-red-500 ring-1 ring-red-500 hover:bg-[#FDEDEC] active:bg-red-500 active:text-white ${
                    isLoading ? 'cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'loading...' : 'Unfollow store'}
                </button>
              )}
              <button className="w-full rounded-md border bg-white px-6 py-2 text-sm text-[#030A70] ring-1 ring-[#030A70] hover:bg-[#EDF1FB] active:bg-[#030A70] active:text-white">
                Message store
              </button>
              <button
                onClick={() => navigate(`/sellerShop/${product.shop.id}`)}
                className="w-full rounded-md border bg-white px-6 py-2 text-sm text-[#030A70] ring-1 ring-[#030A70] hover:bg-[#EDF1FB] active:bg-[#030A70] active:text-white"
              >
                Visit store
              </button>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="p-3 pt-5">
          <h2 className="my-4 text-center text-xl font-bold md:text-start">
            Sellers handpicked featured products
          </h2>
          <div className="grid grid-cols-2">
            {product.shop.featured_products.map(featuredProduct => (
              <ProductCard
                key={featuredProduct.id}
                id={featuredProduct.id}
                imageSrc={featuredProduct.thumbnail}
                productName={featuredProduct.name}
                ratings={featuredProduct.ratings}
                reviews={featuredProduct.reviews}
                numberSold={featuredProduct.total_sold}
                price={parseFloat(featuredProduct.price)}
                discountPrice={
                  featuredProduct.discount
                    ? parseFloat(featuredProduct.discount)
                    : null
                }
                storeName={featuredProduct.shop_name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
