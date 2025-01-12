import React, { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import FollowedShopCard from '../../../components/dashboard/buyer/followedShops/FollowedShopCard';
import {
  getFollowedShops,
  selectFollowedShops,
  selectFollowShopLoading,
} from '@/services/redux/slices/buyers/followShopSlice';

const FollowedShopsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const followedShops = useAppSelector(selectFollowedShops);
  const isLoading = useAppSelector(selectFollowShopLoading);

  useEffect(() => {
    dispatch(getFollowedShops());
  }, [dispatch]);

  if (isLoading) return <p>Loading followed shops...</p>;

  return (
    <section className="max-w-full lg:max-w-[90%]">
      <h1 className="mb-6 text-2xl font-bold">Followed Shops</h1>

      {/* Render each followed shop as a card */}
      <div className="space-y-8">
        {followedShops.length > 0 ? (
          followedShops.map(shop => (
            <FollowedShopCard key={shop.id} shop={shop} />
          ))
        ) : (
          <p>No followed shops found.</p>
        )}
      </div>
    </section>
  );
};

export default FollowedShopsPage;
