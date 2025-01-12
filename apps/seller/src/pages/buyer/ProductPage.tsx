import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Footer from '@/components/Footer';
import Header from '@/components/Nav';
import ProductCard from '@/components/buyer/ProductCard';
import Pagination from '../../components/Pagination';
import { fetchProducts, searchProducts } from '../../services/api/productAPI';

function ProductPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  // Extract 'query' parameter from the URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query') || '';

  // Decide which API function to call
  const fetchFunction = () =>
    searchQuery
      ? searchProducts(searchQuery, currentPage) // Search products
      : fetchProducts(currentPage); // Fetch all products

  // Fetch products using React Query
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['products', currentPage, searchQuery],
    queryFn: fetchFunction,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  const handleNextPage = () => setCurrentPage(prev => prev + 1);
  const handlePreviousPage = () =>
    setCurrentPage(prev => Math.max(prev - 1, 1));
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <section className="px-5 md:px-10">
        <h2 className="mt-5 text-xl font-semibold">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
        </h2>

        {isLoading && <p>Loading products...</p>}
        {isError && (
          <p>
            Error:{' '}
            {error instanceof Error ? error.message : 'An error occurred'}
          </p>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4 py-10 md:grid-cols-3 lg:grid-cols-4">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                imageSrc={product.thumbnail}
                productName={product.name}
                ratings={product.ratings}
                reviews={product.reviews}
                numberSold={product.total_sold}
                price={parseFloat(product.price)}
                discountPrice={
                  product.discount ? parseFloat(product.discount) : null
                }
                storeName={product.shop_name}
              />
            ))
          ) : (
            <p>No products found. Try refining your search.</p>
          )}
        </div>

        {/* Pagination */}
        {!searchQuery && (
          <div className="mb-10 flex justify-center pb-10">
            <Pagination
              currentPage={currentPage}
              totalPages={5}
              onPageChange={handlePageChange}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
            />
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

export default ProductPage;
