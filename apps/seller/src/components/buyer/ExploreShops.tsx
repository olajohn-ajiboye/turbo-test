import ShopCard from './ShopCard';
import { IoIosArrowForward } from 'react-icons/io';
import { shops } from '../../services/api/data';

function ExploreShops() {
  return (
    <section className="md:p-10">
      <div className="bg-[#FAFAFA] p-5 md:p-12">
        <div className="flex justify-between pb-8 pt-3">
          <h2 className="text-2xl font-semibold">Popular Shops</h2>
          <div className="flex">
            <p className="pt-1 text-xl font-medium">View all</p>
            <IoIosArrowForward
              size={24}
              color="#030A70"
              className="ml-2 mt-1"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {shops.map(card => (
            <ShopCard
              key={card.id}
              id={card.id}
              coverImage={card.coverImage}
              profileImage={card.profileImage}
              name={card.name}
              bio={card.bio}
              reviews={card.reviews}
              followers={card.followers}
              productsSold={card.productsSold}
              categories={card.categories}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExploreShops;
