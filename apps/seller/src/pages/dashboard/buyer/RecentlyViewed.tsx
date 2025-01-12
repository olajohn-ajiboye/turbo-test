import { useEffect } from 'react';
import {
  fetchRecentlyViewed,
  selectRecentlyViewedItems,
  selectRecentlyViewedLoading,
  selectRecentlyViewedError,
} from '@/services/redux/slices/buyers/recentlyViewedSlice';
import RecentlyViewedProductCard from '@/components/dashboard/buyer/recentlyViewed/RecentlyViewedProductCard';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';

const RecentlyViewed = () => {
  const dispatch = useAppDispatch();

  // Select items, loading, and error state from Redux
  const items = useAppSelector(selectRecentlyViewedItems);
  const loading = useAppSelector(selectRecentlyViewedLoading);
  const error = useAppSelector(selectRecentlyViewedError);

  // Fetch recently viewed items on component mount
  useEffect(() => {
    dispatch(fetchRecentlyViewed());
  }, [dispatch]);

  // Render the component
  if (loading) {
    return <p>Loading recently viewed products...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-[#19183A]">Recently Viewed</h2>
      {items.length === 0 ? (
        <p>No recently viewed products found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {items.map(product => (
            <RecentlyViewedProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyViewed;
