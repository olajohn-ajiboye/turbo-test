import { ProductDetail } from '@/types/types';
import React from 'react';

interface ProductDescriptionProps {
  product: ProductDetail;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  return (
    <div className="px-5 py-8 pt-5 md:px-20">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-20">
        {/* Product Description */}
        <div>
          <h2 className="text-xl font-bold text-[#030A70]">
            Product description
          </h2>
          <p>{product.description}</p>
        </div>

        {/* Product Specifications */}
        <div>
          <h2 className="text-xl font-bold text-[#030A70]">
            Product specifications
          </h2>
          {product.specifications?.length > 0 ? (
            <table className="mt-4 w-full table-fixed border-spacing-3 overflow-auto border text-gray-600">
              <tbody>
                {product.specifications.map(spec => (
                  <tr key={spec.id} className="border-b">
                    <th className="border bg-[#F6F6F6] py-5 text-center">
                      {spec.option_type}
                    </th>
                    <td className="border py-5 text-center">
                      {spec.option_value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mt-4 text-sm text-gray-500">
              No specifications available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
