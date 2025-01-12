import { useEffect } from 'react';
import { createRecentlyViewed } from '@/services/redux/slices/buyers/recentlyViewedSlice';
import Header from '@/components/Nav';
import Footer from '@/components/Footer';
import ProductShow from '@/components/ProductShow';
import ProductDescription from '@/components/ProductDescription';
import CustomerReviews from '@/components/CustomerReviews';
import ShopPage from '@/components/buyer/MeetShopShow';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductDetail } from '@/services/api/productAPI';
import { ProductDetail } from '@/types/types';
import { useAppDispatch } from '@/services/hooks/useAppDispatch';

export function ProductDisplay() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  // Fetch product details
  const {
    data: product,
    isLoading,
    error,
  } = useQuery<ProductDetail, Error>({
    queryKey: ['productDetail', id],
    queryFn: () => fetchProductDetail(id as string),
    enabled: !!id,
  });

  // Log the fetched product
  useEffect(() => {
    if (product) {
      console.log('Fetched Product:', product);
    }
  }, [product]);

  // Add to recently viewed when the user scrolls halfway
  useEffect(() => {
    if (product) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const halfwayPoint = document.body.scrollHeight / 2;

        if (scrollPosition >= halfwayPoint) {
          dispatch(createRecentlyViewed(product.id));
          window.removeEventListener('scroll', handleScroll); // Remove the event listener after firing
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
      };
    }
  }, [dispatch, product]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <>
      <Header />
      {/* Pass the fetched product data as props to children */}
      <ProductShow product={product} />
      <div className="mb-8 flex flex-wrap gap-3 px-5 pt-5 md:px-20">
        <button className="rounded-lg border bg-[#EDF1FB] px-4 py-2 text-sm font-semibold text-[#030A70] outline-[#EDF1FB] hover:bg-[#030A70] hover:text-white active:bg-[#030A70]">
          Description and specifications
        </button>
        <button className="rounded-lg border bg-[#EDF1FB] px-4 py-2 text-sm font-semibold text-[#030A70] outline-[#EDF1FB] hover:bg-[#030A70] hover:text-white active:bg-[#030A70]">
          Customer reviews
        </button>
        <button className="rounded-lg border bg-[#EDF1FB] px-4 py-2 text-sm font-semibold text-[#030A70] outline-[#EDF1FB] hover:bg-[#030A70] hover:text-white active:bg-[#030A70]">
          Meet the shop
        </button>
        <button className="rounded-lg border bg-[#EDF1FB] px-4 py-2 text-sm font-semibold text-[#030A70] outline-[#EDF1FB] hover:bg-[#030A70] hover:text-white active:bg-[#030A70]">
          Products you may also like
        </button>
      </div>

      <section id="product-description">
        <ProductDescription product={product} />
      </section>
      <section id="review">
        <CustomerReviews product={product} />
      </section>
      <section>
        <ShopPage product={product} />
      </section>

      <Footer />
    </>
  );
}
