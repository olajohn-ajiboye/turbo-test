import React from 'react';
import { CiSearch } from 'react-icons/ci';

interface SearchInputProps {
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  className = '',
  placeholder = 'Search...',
  value,
  onChange,
  onSearch, // Handle search action
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${className} custom-placeholder h-14 rounded-br-lg rounded-tr-lg border bg-[#FAFAFA] px-10 py-2 focus:outline-none focus:ring-0 focus:ring-blue-500`}
      />
      <CiSearch
        className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-500"
        size={28}
        onClick={onSearch} // Trigger search action when icon is clicked
      />
    </div>
  );
};

export default SearchInput;
