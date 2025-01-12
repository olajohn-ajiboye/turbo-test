import React, { useState } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onNextPage,
  onPreviousPage,
}) => {
  const [inputPage, setInputPage] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(event.target.value);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
      setInputPage(''); // Clear input after navigating
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        i === currentPage ||
        i === currentPage - 1 ||
        i === currentPage + 1
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`rounded-md border px-3 py-1 ${
              i === currentPage
                ? 'bg-[#030A70] text-white'
                : 'bg-white text-[#030A70]'
            }`}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <span key={i} className="px-3 py-1">
            ...
          </span>
        );
      }
    }
    return pages;
  };

  return (
    <div className="mt-8 grid items-center justify-center gap-2 md:flex md:justify-start">
      <div className="flex justify-center gap-2">
        <button
          onClick={onPreviousPage}
          className={`rounded-md border px-3 py-1 ${
            currentPage === 1
              ? 'cursor-not-allowed opacity-50'
              : 'text-[#030A70] hover:bg-blue-50'
          }`}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {renderPageNumbers()}

        <button
          onClick={onNextPage}
          className={`rounded-md border px-3 py-1 ${
            currentPage === totalPages
              ? 'cursor-not-allowed opacity-50'
              : 'text-[#030A70] hover:bg-blue-50'
          }`}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="ml-4 text-sm text-gray-500">Go to page</span>
        <input
          type="text"
          value={inputPage}
          onChange={handleInputChange}
          className="w-12 rounded-md border px-2 py-1 text-center"
          placeholder="Page"
        />
        <button
          onClick={handleGoToPage}
          className="rounded-md border bg-[#030A70] px-4 py-1 text-white hover:bg-blue-600"
        >
          Enter
        </button>
        <span className="ml-4 text-sm text-gray-500">/ {totalPages}</span>
      </div>
    </div>
  );
};

export default Pagination;
