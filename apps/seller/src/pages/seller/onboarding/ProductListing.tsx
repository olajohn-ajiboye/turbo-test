import React from 'react';

import logo from '../../../assets/1_High_Resolution_Image.jpg';
import AddProduct from '@/components/dashboard/seller/products/AddProduct/AddProduct';

const ProductListing: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-12">
      <div className="mb-8">
        <div className="flex justify-center">
          <img src={logo} alt="logo" className="w-20 rounded-lg" />
        </div>
        <h2 className="pt-5 text-center text-2xl font-bold">Product Listing</h2>
        <div className="mt-5 flex items-center justify-center">
          <span className="rounded-full bg-[#FCC238] px-3 py-1 text-lg font-bold text-[#030A70]">
            1
          </span>
          <div className="h-1 w-20 bg-[#FCC230] md:w-60"></div>
          <span className="rounded-full bg-[#FCC230] px-3 py-1 text-lg font-bold text-[#030A70]">
            2
          </span>
          <div className="h-1 w-20 bg-[#FCC230] md:w-60"></div>
          <span className="rounded-full bg-[#FCC230] px-3 py-1 text-lg font-bold text-[#030A70]">
            3
          </span>
        </div>
        <div className="flex hidden justify-between">
          <div className="relative right-10">profile completion</div>
          <div className="relative right-2">Shop settings</div>
          <div className="relative left-10">Product listing</div>
        </div>
      </div>
      <div className="w-full max-w-6xl rounded-lg bg-[#FAFAFA] p-8 shadow-md">
        <span className="text-sm text-[#7F8082]">Product listing</span>
        <h3 className="mb-6 text-xl font-semibold text-gray-900">
          List a single product
        </h3>
        <AddProduct />
      </div>
    </div>
  );
};

export default ProductListing;
