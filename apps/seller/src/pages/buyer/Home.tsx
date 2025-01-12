import { useQuery } from '@tanstack/react-query';
import HeroSection from '@/components/buyer/HeroSection';
import ExploreSection from '@/components/buyer/ExploreSection';
import ShopCategory from '@/components/buyer/ShopCategory';
import Header from '@/components/Nav';
import ExploreShops from '@/components/buyer/ExploreShops';
import WhyGiri from '@/components/buyer/WhyGiri';
import Footer from '@/components/Footer';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import {
  fetchCategories,
  selectCategories,
} from '@/services/redux/slices/categoriesSlice';
import { useEffect } from 'react';
import { fetchProducts } from '@/services/api/productAPI';
import { Product } from '@/types/types';

function Home() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  // Fetch products using React Query
  const {
    data: products = [],
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: () => fetchProducts(1),
    staleTime: 1000 * 60 * 5,
  });

  // Fetch categories using Redux
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isProductsLoading) return <p>Loading products...</p>;
  if (isProductsError)
    return <p>Error fetching products: {productsError?.message}</p>;

  return (
    <div>
      <Header />
      <HeroSection />
      <ShopCategory categories={categories} />
      <ExploreSection products={products} />
      <ExploreShops />
      <WhyGiri />
      <Footer />
    </div>
  );
}

export default Home;
