interface ShopCategoryProps {
  categories: {
    id: string;
    name: string;
    image: string;
    product_count: number;
  }[];
}

function ShopCategory({ categories }: ShopCategoryProps) {
  return (
    <section className="mt-10 py-14">
      <h2 className="text-center text-4xl font-bold">Shop by category</h2>
      {categories.length === 0 ? (
        <p className="text-center text-gray-600">No categories available</p>
      ) : (
        <div className="scrollbar-hidden mt-10 flex flex-nowrap gap-6 overflow-x-auto py-4">
          {categories.map(category => (
            <div key={category.id} className="flex-shrink-0 text-center">
              <img
                src={category.image}
                alt={category.name}
                className="mx-auto h-56 w-56 rounded-full"
              />
              <p className="pt-5 font-semibold text-[#19183A]">
                {category.name}
              </p>
              <p className="text-[#8D8E90]">
                {category.product_count} products
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ShopCategory;
