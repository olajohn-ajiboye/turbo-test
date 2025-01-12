import React, { useState } from 'react';
import ProductCard from '../buyer/ProductCard';
import Pagination from '../Pagination';
import { FaSearch } from 'react-icons/fa';
import { Product } from '../../types/types';

interface ShopProductsProps {
  storeName: string;
  products: Product[];
}

const ShopProducts: React.FC<ShopProductsProps> = ({ storeName, products }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Filter products for the specific store and apply search filter
  const shopProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(shopProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = shopProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <section id="shop-section" className="md:px-14">
      {/* Search Bar */}
      <div className="mt-10 flex w-full max-w-md items-center rounded-md bg-[#F6F6F6] px-3 py-3">
        <FaSearch className="mr-2 text-[#717274]" />
        <input
          type="text"
          placeholder="Search in this store"
          className="w-full bg-[#F6F6F6] text-[#717274] outline-none"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Search Results Info */}
      {searchQuery && (
        <div className="mb-6 mt-4 rounded-md bg-[#EDF1FB] p-4">
          <p className="text-[#717274]">
            {storeName} / Search Results / {shopProducts.length} results found
            for "<span className="font-bold">{searchQuery}</span>"
          </p>
          <div className="mt-2 flex items-center justify-between">
            <h2 className="text-3xl font-bold capitalize text-[#19183A]">
              {searchQuery}
            </h2>
            <p className="text-lg text-[#19183A]">
              {shopProducts.length} products - page {currentPage} of{' '}
              {totalPages}
            </p>
          </div>
        </div>
      )}

      <div className="px-4 py-8">
        {/* No Results Found Message */}
        {searchQuery && shopProducts.length === 0 ? (
          <div className="mt-8 text-center text-[#19183A]">
            <h2 className="text-2xl font-bold">No Results Found</h2>
            <p className="text-sm text-gray-500">
              No products matched your search for "{searchQuery}". Please try a
              different keyword.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Products Section */}
            {!searchQuery && (
              <>
                <h2 className="mb-4 text-2xl font-bold text-[#19183A]">
                  Featured Products
                </h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {products.slice(0, 4).map(product => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      imageSrc={product.thumbnail}
                      productName={product.name}
                      reviews={product.reviews}
                      ratings={product.ratings}
                      numberSold={product.total_sold || 0}
                      price={parseFloat(product.price)}
                      discountPrice={parseFloat(product.discount)}
                      storeName={storeName}
                    />
                  ))}
                </div>
              </>
            )}

            {/* All Products Section */}
            <div className="mt-8">
              {!searchQuery && (
                <h2 className="mb-4 text-2xl font-bold text-[#19183A]">
                  All Products
                </h2>
              )}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {currentProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    imageSrc={product.thumbnail}
                    productName={product.name}
                    reviews={product.reviews}
                    ratings={product.ratings}
                    numberSold={product.total_sold || 0}
                    price={parseFloat(product.price)}
                    discountPrice={parseFloat(product.discount)}
                    storeName={storeName}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Pagination Component */}
        {shopProducts.length > 0 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopProducts;
