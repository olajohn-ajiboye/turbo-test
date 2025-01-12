import React from 'react';
import { MdVerified } from 'react-icons/md';
import DotSeparator from '../UI/dotSeperator';
import Badge from './../UI/badge';
import { useNavigate } from 'react-router-dom';
import { truncateText } from '@/utils/textUtils';
import { ShopCardProps } from '@/types/types';

const ShopCard: React.FC<ShopCardProps> = ({
  id,
  coverImage,
  profileImage,
  name,
  bio,
  reviews,
  followers,
  productsSold,
  categories,
}) => {
  const navigate = useNavigate();

  const handleVisitStore = () => {
    navigate(`/sellerShop/${id}`);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white hover:shadow-md">
      {/* Cover Image */}
      <div className="relative">
        <img
          src={coverImage}
          alt="Cover"
          className="h-32 w-full object-cover"
        />
        {/* Profile Image */}
        <img
          src={profileImage}
          alt="Profile"
          className="absolute left-4 top-20 h-24 w-24 rounded-full border-4 border-white"
        />
      </div>
      {/* Content */}
      <div className="px-4 pb-6 pt-16">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-[#030A70]">{name}</h2>
          <MdVerified size={20} color="#030A70" className="ml-2" />
        </div>
        {/* Truncated Bio */}
        <p className="mt-1 text-[#999999]">"{truncateText(bio, 100)}"</p>
        <div className="my-1 flex gap-1 text-xs font-semibold text-gray-600">
          <p>{reviews}</p>
          <DotSeparator color="#E0E0E1" size="0.3" />
          <p>{followers}</p>
          <DotSeparator color="#E0E0E1" size="0.3" />
          <p className="text-[#999999]">{productsSold}</p>
        </div>
        {/* Badges */}
        <div className="mt-2 flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <Badge
              key={index}
              text={category}
              classname="bg-[#F6F6F6] text-[#19183A] px-4 py-2 rounded-md text-sm"
            />
          ))}
        </div>
        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          <button className="flex w-full items-center justify-center rounded-md border px-2 py-3 text-[#030A70] ring-2 ring-[#030A70] hover:bg-[#030A70] hover:text-white">
            Follow Store
          </button>
          <button
            onClick={handleVisitStore}
            className="flex w-full items-center justify-center rounded-md bg-[#030A70] px-2 py-3 text-white"
          >
            Visit Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
