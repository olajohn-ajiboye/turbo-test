import React from 'react';
import { RecentlyViewedProductCardProps } from '@/types/types';

const RecentlyViewedProductCard: React.FC<RecentlyViewedProductCardProps> = ({
  product,
}) => {
  console.log(product.name);
  console.log(product.thumbnail);

  return (
    <div className="rounded-lg p-4 hover:shadow-md">
      <img
        src={product.thumbnail}
        alt={product.name}
        className="h-48 w-full rounded-md object-cover"
      />
      <div className="mt-3">
        <h3 className="truncate text-sm font-medium text-[#19183A]">
          {product.name}
        </h3>
        <p className="text-[#030A70]">{product.price}</p>
      </div>
    </div>
  );
};

export default RecentlyViewedProductCard;
