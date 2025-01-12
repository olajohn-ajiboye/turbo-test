import React from 'react';
import ProductCard from './ProductCard';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  imageSrc: string;
  ratings: string;
  reviews: number;
  numberSold: number;
  price: number;
  discountPrice: number | null;
  storeName: string;
  productName: string;
}

interface ExploreProductsProps {
  category: string;
  products: Product[];
  className?: string;
}

const ExploreProducts: React.FC<ExploreProductsProps> = ({
  category,
  products,
  className = '',
}) => {
  return (
    <section className={`bg-[#FAFAFA] px-2 pt-10 lg:px-5 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{category}</h2>
        <Link to={`/product`} className="hidden items-center md:flex">
          <p className="text-xl font-medium">
            Explore {category.toLowerCase()}
          </p>
          <IoIosArrowForward size={24} color="#030A70" className="ml-2" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-10 md:grid-cols-4">
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            imageSrc={product.imageSrc}
            ratings={product.ratings}
            reviews={product.reviews}
            numberSold={product.numberSold}
            price={product.price}
            discountPrice={product.discountPrice}
            storeName={product.storeName}
            productName={product.productName}
          />
        ))}
      </div>
      <Link to={`/product`}>
        <div className="flex items-center justify-center py-10 md:hidden">
          <p className="text-xl font-medium">
            Explore {category.toLowerCase()}
          </p>
          <IoIosArrowForward size={24} color="#030A70" className="ml-2" />
        </div>
      </Link>
    </section>
  );
};

export default ExploreProducts;
