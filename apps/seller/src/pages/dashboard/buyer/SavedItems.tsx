import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../services/hooks/useAppDispatch';
import {
  fetchWishlist,
  selectWishlistItems,
  selectWishlistLoading,
  selectWishlistError,
} from '../../../services/redux/slices/buyers/wishlistSlice';
import SavedItemCard from '../../../components/dashboard/buyer/savedItems/SavedItemCard';

const SavedItems = () => {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector(selectWishlistItems);
  const loading = useAppSelector(selectWishlistLoading);
  const error = useAppSelector(selectWishlistError);

  // Fetch wishlist on component mount
  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  if (loading) {
    return (
      <section className="bg-[#EDF1FB]">
        <h2 className="mb-4 text-2xl font-semibold">Saved Items</h2>
        <p>Loading saved items...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#EDF1FB]">
        <h2 className="mb-4 text-2xl font-semibold">Saved Items</h2>
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  if (wishlist.length === 0) {
    return (
      <section className="bg-[#EDF1FB]">
        <h2 className="mb-4 text-2xl font-semibold">Saved Items</h2>
        <p>No saved items yet.</p>
      </section>
    );
  }

  return (
    <section className="bg-[#EDF1FB]">
      <h2 className="mb-4 text-2xl font-semibold">Saved Items</h2>
      {wishlist.map(item => (
        <SavedItemCard key={item.id} item={item} />
      ))}
    </section>
  );
};

export default SavedItems;
