import { useEffect } from 'react';
import ProductOverview from '@/components/dashboard/seller/products/ProductOverview';
import ProductTable from '@/components/dashboard/seller/products/ProductTable';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import {
  fetchSellerProducts,
  selectSellerProducts,
  selectSellerProductsError,
  selectSellerProductsLoading,
} from '@/services/redux/slices/sellers/productSlice';

const SellerProducts = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectSellerProducts);
  const isLoading = useAppSelector(selectSellerProductsLoading);
  const error = useAppSelector(selectSellerProductsError);

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log('Seller Products:', products); // Log products to the console
  }, [products]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <ProductOverview />
      <ProductTable products={products} />
    </>
  );
};

export default SellerProducts;
