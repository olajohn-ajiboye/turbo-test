import ExploreProducts from './ExploreProducts';
import { Product } from '@/types/types';

interface ExploreSectionProps {
  products: Product[];
}

function ExploreSection({ products }: ExploreSectionProps) {
  // Sort products by `total_sold` in descending order and get the top 4
  const topPopularProducts = [...products]
    .sort((a, b) => (b.total_sold || 0) - (a.total_sold || 0))
    .slice(0, 4);

  // Transform the product data to match the expected structure for ExploreProducts
  const transformedProducts = topPopularProducts.map(product => ({
    id: product.id,
    imageSrc: product.thumbnail || 'https://via.placeholder.com/150',
    ratings: product.ratings,
    reviews: product.reviews,
    numberSold: product.total_sold,
    price: parseFloat(product.price),
    discountPrice: product.discount ? parseFloat(product.discount) : null,
    storeName: product.shop_name,
    productName: product.name,
  }));

  return (
    <div className="md:px-5">
      <ExploreProducts
        category="Recommended Products"
        products={transformedProducts}
      />
      <ExploreProducts
        category="Popular Products"
        products={transformedProducts}
        className="bg-[#fff]"
      />
    </div>
  );
}

export default ExploreSection;
