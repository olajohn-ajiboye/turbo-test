import React from 'react';
import { MdVerified, MdLocationOn } from 'react-icons/md';
import { IoChatboxEllipses } from 'react-icons/io5';
import DotSeparator from '../UI/dotSeperator';

interface SellerShowHeroProps {
  shopName: string;
  tagline: string;
  logo: string;
  coverPhoto: string;
  reviews: number;
  followers: number;
  productsSold: number;
  storeLocation: string;
  chatReplyRate: string; // Example: "98%"
}

const SellerShowHero: React.FC<SellerShowHeroProps> = ({
  shopName,
  tagline,
  logo,
  coverPhoto,
  reviews,
  followers,
  productsSold,
  storeLocation,
  chatReplyRate,
}) => {
  return (
    <section className="bg-white md:mx-5 lg:mx-10">
      {/* Cover Image */}
      <div className="relative">
        <img
          src={coverPhoto}
          alt="Cover"
          className="h-48 w-full object-cover md:h-60 lg:h-72 lg:rounded-xl"
        />
        {/* Profile Image */}
        <img
          src={logo}
          alt="Logo"
          className="absolute left-4 top-32 h-28 w-28 rounded-full border-4 border-white md:top-40 md:h-36 md:w-36 lg:top-48 lg:h-52 lg:w-52"
        />
      </div>

      {/* Content */}
      <div className="px-4 pb-6 pt-16 lg:mt-16">
        <div className="flex items-center">
          <h2 className="text-3xl font-semibold text-[#19183A]">{shopName}</h2>
          <MdVerified size={30} color="#030A70" className="ml-2" />
        </div>
        <p className="mt-1 max-w-screen-md text-base font-semibold text-[#999999]">
          "{tagline}"
        </p>
        <div className="mt-1 flex gap-1 text-sm font-semibold text-gray-600 md:text-base">
          <p>{reviews} reviews</p>
          <DotSeparator color="#E0E0E1" size="0.3" />
          <p>{followers} followers</p>
          <DotSeparator color="#E0E0E1" size="0.3" />
          <p className="text-[#999999]">{productsSold} products sold</p>
        </div>
        <div>
          <div>
            <span className="flex items-center pt-1 text-xs md:text-base">
              <MdLocationOn color="#999999" className="h-5 w-5 md:h-6 md:w-6" />
              <span className="ml-1 flex items-center gap-2 text-[#999999]">
                Store Location:{' '}
                <span className="text-[#030A70]">{storeLocation}</span>
              </span>
              <span className="flex items-center pl-3">
                <IoChatboxEllipses size={20} color="#999999" />
                <span className="ml-1 text-[#999999]">
                  Chat reply:{' '}
                  <span className="text-[#030A70]">{chatReplyRate}</span>
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerShowHero;
