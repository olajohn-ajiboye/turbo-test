import React, { useState } from 'react';
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaShare,
  FaFlag,
} from 'react-icons/fa';
import Pagination from './Pagination';
import { ProductDetail } from '@/types/types';


interface CustomerReviewsProps {
  product: ProductDetail;
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ product }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<number | null>(null); // State for selected star filter
  const reviewsPerPage = 8;

  if (!product.reviews || product.reviews.length === 0) {
    return (
      <section id="reviews-section">
        <div className="px-5 py-8 text-center md:max-w-[60%] md:px-20">
          <h2 className="text-2xl font-bold text-[#19183A]">
            Customer Reviews
          </h2>
          <p className="mt-4 text-gray-600">
            No reviews yet. Be the first to leave a review for this product!
          </p>
        </div>
      </section>
    );
  }

  // Filter reviews based on selected filter
  const filteredReviews = selectedFilter
    ? product.reviews.filter(review => review.rating === selectedFilter)
    : product.reviews;

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  // Calculate the number of reviews per star rating
  const starCounts = [5, 4, 3, 2, 1].map(
    star => product.reviews.filter(review => review.rating === star).length
  );

  // Calculate the average star rating
  const totalRating = product.reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const averageRating = (totalRating / product.reviews.length).toFixed(1);

  // Convert average rating to a number for rendering stars
  const averageRatingNumber = parseFloat(averageRating);
  const filledStars = Math.floor(averageRatingNumber);
  const hasHalfStar = averageRatingNumber - filledStars >= 0.5;

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (star: number | null) => {
    setSelectedFilter(star);
    setCurrentPage(1); // Reset to first page whenever filter changes
  };

  return (
    <section id="reviews-section">
      <div className="px-5 py-8 md:max-w-[60%] md:px-20">
        {/* Customer Reviews Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#19183A]">
            Customer reviews ({product.reviews.length})
          </h2>
          <div className="grid items-center gap-3 md:flex md:gap-10">
            <div className="mt-2 flex flex-col">
              <span className="text-4xl font-bold text-[#19183A]">
                {averageRating}/5
              </span>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) =>
                  index < filledStars ? (
                    <FaStar key={index} className="mr-1 text-yellow-500" />
                  ) : hasHalfStar && index === filledStars ? (
                    <FaStarHalfAlt
                      key={index}
                      className="mr-1 text-yellow-500"
                    />
                  ) : (
                    <FaRegStar key={index} className="mr-1 text-yellow-500" />
                  )
                )}
              </div>
              <p className="text-gray-500">All from verified purchases</p>
            </div>
            <div className="md:mt-4">
              {[5, 4, 3, 2, 1].map(star => (
                <div key={star} className="mr-4 flex items-center">
                  <span className="text-sm font-semibold text-[#030A70]">
                    {star} ★
                  </span>
                  <div className="mx-2 h-2 w-44 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-yellow-500"
                      style={{
                        width: `${(starCounts[5 - star] / product.reviews.length) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-500">
                    {starCounts[5 - star]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-5">
            <button
              onClick={() => handleFilterChange(null)}
              className={`rounded-lg border bg-white px-4 py-2 text-sm font-semibold ${
                selectedFilter === null
                  ? 'bg-[#050564] text-[#fff] hover:text-[#050564]'
                  : 'text-[#030A70]'
              } hover:bg-blue-50`}
            >
              All reviews ({product.reviews.length})
            </button>
            {[5, 4, 3, 2, 1].map(star => (
              <button
                key={star}
                onClick={() => handleFilterChange(star)}
                className={`rounded-lg border bg-white px-4 py-2 text-sm font-semibold ${
                  selectedFilter === star
                    ? 'bg-[#050564] text-[#fff] hover:text-[#050564]'
                    : 'text-[#030A70]'
                } hover:bg-blue-50`}
              >
                {star} Stars ({starCounts[5 - star]})
              </button>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div>
          {currentReviews.map(review => (
            <div key={review.buyer_last_name} className="mb-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {review.buyer_first_name} {review.buyer_last_name}
                </h3>
              </div>
              <div className="mt-2 flex items-center">
                {[...Array(5)].map((_, index) =>
                  index < review.rating ? (
                    <FaStar key={index} className="mr-1 text-yellow-500" />
                  ) : (
                    <FaRegStar key={index} className="mr-1 text-yellow-500" />
                  )
                )}
                <span className="ml-2 text-gray-500">{review.rating}.0</span>
              </div>
              <p className="mt-4 text-gray-700">{review.comment}</p>
              <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                <button className="hover:underline">
                  Mark review as helpful
                </button>
                <button className="hover:underline">
                  <FaShare className="mr-1 inline-block" /> Share
                </button>
                <button className="text-red-500 hover:underline">
                  <FaFlag className="mr-1 inline-block" /> Report
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
        />
      </div>
    </section>
  );
};

export default CustomerReviews;
