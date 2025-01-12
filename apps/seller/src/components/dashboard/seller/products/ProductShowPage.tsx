import React, { useEffect } from 'react';
import { MdArrowBackIos } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import {
  fetchSellerProducts,
  selectSellerProducts,
  selectSellerProductsLoading,
  selectSellerProductsError,
} from '@/services/redux/slices/sellers/productSlice';
import { SellerProduct } from '@/types/types';
import { CiEdit } from 'react-icons/ci';

const ProductShowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log('Product ID from route:', id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectSellerProductsLoading);
  const error = useAppSelector(selectSellerProductsError);
  const products = useAppSelector(selectSellerProducts);

  // Find the specific product by ID
  const product: SellerProduct | undefined = products.find(
    product => product.id === id
  );

  console.log('Selected Product:', product);

  // Fetch all products on mount
  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>; // Show a loading spinner or message
  }

  if (error) {
    return <p>Error: {error}</p>; // Display error message
  }

  if (!product) {
    return <p>No product found.</p>; // Handle case when no product is found
  }

  return (
    <div className="product-show-page">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-6">
        <div className="flex items-center gap-3">
          <button
            className="mb-4 rounded-lg bg-white px-3 py-2 text-sm text-gray-600"
            onClick={() => navigate(-1)}
          >
            <MdArrowBackIos size={22} />
          </button>
          <h2 className="mb-4 text-2xl font-semibold text-[#19183A]">
            Product
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 ${
              product.is_published
                ? 'bg-blue-100 text-blue-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {product.is_published ? 'Published' : 'Unpublished'}
          </span>
          <button
            className="flex items-center gap-4 rounded-lg border-2 border-[#030A70] px-4 py-2 text-[#030A70]"
            onClick={() =>
              navigate(`/seller-dashboard/product/edit/${product.id}`)
            }
          >
            <CiEdit size={25} color="#030A70" />
            <span>Edit Product</span>
          </button>
        </div>
      </div>

      {/* Layout: General Information on the Left, Product Details on the Right */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: General Information */}
        <div className="col-span-2">
          {/* General Information */}
          <div className="general-info mb-6 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">General Information</h2>
            <div className="mb-4">
              <label className="mb-2 block text-sm text-gray-600">
                Product Title
              </label>
              <span className="block rounded-lg border p-1 px-4 text-lg font-medium text-gray-800">
                {product.name}
              </span>
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm text-gray-600">
                Product Description
              </label>
              <p className="rounded-lg border p-1 px-4 text-gray-700">
                {product.description}
              </p>
            </div>
          </div>

          {/* Product Media */}
          <div className="product-media mb-6 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Product Media</h2>
            <div className="grid grid-cols-4 gap-4">
              {product.media?.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.file}
                    alt={`Product ${index + 1}`}
                    className="w-full rounded-lg"
                  />
                  {image.is_thumbnail && (
                    <span className="absolute left-2 top-2 rounded bg-blue-600 px-2 py-1 text-xs text-white">
                      Thumbnail
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Product Specifications */}
          <div className="product-specifications rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">
              Product Specifications
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {product.specifications?.map((spec, index) => (
                <div key={index}>
                  <label className="mb-2 block text-sm text-gray-600">
                    {spec.option_type}
                  </label>
                  <span className="rounded-sm bg-[#EDF1FB] px-3 py-2 font-medium text-gray-800">
                    {spec.option_value}
                  </span>
                </div>
              )) || <p>No specifications available</p>}
            </div>
          </div>
        </div>

        {/* Right Column: Product Details */}
        <div className="product-details rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Product Details</h2>
          <div className="mb-4">
            <label className="mb-2 block text-sm text-gray-600">
              Product Cost Price
            </label>
            <span className="block rounded-lg border p-1 px-4 text-lg font-medium text-gray-800">
              ${product.price}
            </span>
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm text-gray-600">
              Available Quantity
            </label>
            <span className="block rounded-lg border p-1 px-4 text-lg font-medium text-gray-800">
              {product.quantity}
            </span>
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm text-gray-600">
              Product Category
            </label>
            <span className="block rounded-lg border p-1 px-4 text-lg font-medium text-gray-800">
              {product.category}
            </span>
          </div>

          {/* Product Tags */}
          <div className="mb-4">
            <label className="mb-2 block text-sm text-gray-600">
              Product Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {product.tag?.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-lg bg-[#EDF1FB] px-3 py-1 text-sm"
                >
                  {tag.name}
                </span>
              )) || <p>No tags available</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm text-gray-600">Unit</label>
            <span className="block rounded-lg border p-1 px-4 text-lg font-medium text-gray-800">
              {product.unit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowPage;
