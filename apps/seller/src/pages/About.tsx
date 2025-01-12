import Footer from '@/components/Footer';
import Header from '@/components/Nav';
import React from 'react';
import Image from '../assets/about-page/about1.png';
import BuyersImage from '../assets/about-page/frame2.png';
import SellersImage from '../assets/about-page/frame1.png';
import { FaHandshake, FaListAlt, FaLock, FaShoppingBag } from 'react-icons/fa';
import WhyGiri from '@/components/buyer/WhyGiri';

const AboutPage: React.FC = () => {
  return (
    <>
      <Header />
      <section className="mx-auto py-16">
        {/* Header Section */}
        <div className="container mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-[#19183A] md:text-5xl">
            Bringing Local Markets to Global Doorsteps – Discover Authentic
            African Goods, from Anywhere!
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 md:text-xl">
            Giritoday serves as an e-commerce platform where global buyers can
            connect with local sellers. The idea is to make local African goods,
            unique items, foods, clothing, and African culture available for
            exporting to a global market audience. Regardless of where you are,
            Giritoday will meet you there.
          </p>
        </div>

        {/* Image Gallery Section */}
        <div className="scrollbar-hidden mx-5 overflow-x-scroll">
          <div className="flex gap-4">
            <div className="min-w-[250px] overflow-hidden rounded-lg md:min-w-[300px]">
              <img
                src={Image}
                alt="Local Artisan"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-[250px] overflow-hidden rounded-lg md:min-w-[300px]">
              <img
                src={Image}
                alt="Local Artisan"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-[250px] overflow-hidden rounded-lg md:min-w-[300px]">
              <img
                src={Image}
                alt="Local Artisan"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-[250px] overflow-hidden rounded-lg md:min-w-[300px]">
              <img
                src={Image}
                alt="Local Artisan"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-[250px] overflow-hidden rounded-lg md:min-w-[300px]">
              <img
                src={Image}
                alt="Local Artisan"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-[250px] overflow-hidden rounded-lg md:min-w-[300px]">
              <img
                src={Image}
                alt="Local Artisan"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Second Section for Buyers and Sellers */}
      <section className="container mx-auto grid grid-cols-1 gap-16 px-4 py-16 md:grid-cols-2">
        {/* For Buyers */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-[#19183A] md:text-4xl">
              For Buyers: Shop Authentic, From Africa’s Markets to Your Doorstep
            </h2>
            <p className="text-lg text-gray-600">
              Explore a marketplace filled with unique products that tell
              stories from different cultures and regions. From handcrafted
              goods to local delicacies, every item is a discovery waiting to be
              made.
            </p>
          </div>
          <button className="mt-4 w-fit rounded-md bg-[#030A70] px-6 py-3 font-semibold text-white">
            Start shopping now
          </button>
        </div>

        {/* Buyers Image Section */}
        <div className="relative">
          <img
            src={BuyersImage}
            alt="Buyers"
            className="rounded-lg object-cover"
          />
          {/* Overlay Info */}
          {/* <div className="absolute top-6 left-6 bg-white rounded-md shadow-lg p-4">
            <p className="font-semibold">Africa decor store</p>
            <p>Clay decors - pots</p>
            <div className="flex items-center space-x-1 mt-1">
              <AiFillStar className="text-yellow-500" />
              <span>5.0 (230 reviews)</span>
            </div>
          </div> */}
          {/* Badge for Verified Stores */}
          {/* <div className="absolute bottom-6 right-6 bg-[#030A70] text-white rounded-md p-2 flex items-center">
            <span>500+ Verified Quality Traders/Stores</span>
          </div> */}
        </div>

        {/* Sellers Image Section */}
        <div className="relative">
          <img
            src={SellersImage}
            alt="Sellers"
            className="rounded-lg object-cover"
          />
          {/* Overlay Info */}
          {/* <div className="absolute top-6 left-6 bg-white rounded-md shadow-lg p-4">
            <p className="font-semibold">Africa decor store</p>
            <p>Clay decors - pots</p>
            <div className="flex items-center space-x-1 mt-1">
              <AiFillStar className="text-yellow-500" />
              <span>5.0 (230 reviews)</span>
            </div>
          </div> */}
          {/* Badge for Verified Stores */}
          {/* <div className="absolute bottom-6 right-6 bg-[#030A70] text-white rounded-md p-2 flex items-center">
            <span>500+ Verified Quality Traders/Stores</span>
          </div> */}
        </div>

        {/* For Sellers */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-[#19183A] md:text-4xl">
              For Sellers: Showcase Your Creativity – Reach Buyers Around the
              Globe!
            </h2>
            <p className="text-lg text-gray-600">
              Expand your reach and grow your business by showcasing your
              products to a global audience. GiriToday offers easy-to-use tools,
              marketing support, and a community that values creativity and
              craftsmanship.
            </p>
          </div>
          <button className="mt-4 w-fit rounded-md bg-[#030A70] px-6 py-3 font-semibold text-white">
            Start selling now
          </button>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        {/* Section Header */}
        <h2 className="mb-12 text-center text-2xl font-bold text-[#19183A] md:text-4xl">
          From Africa’s Markets to Your Hands <br /> – Here’s How It Works!
        </h2>

        {/* Cards Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="rounded-lg bg-[#EDF1FB] p-6 text-center">
            <div className="mb-4 inline-block rounded-full bg-white p-4">
              <FaListAlt className="text-[#030A70]" size={32} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-[#030A70]">1.</h3>
            <h4 className="mb-2 text-lg font-semibold text-[#030A70]">
              Sellers List Products
            </h4>
            <p className="text-gray-600">
              Add your unique products to your store, categorize them, and
              ensure each listing is optimized to attract buyers.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-lg bg-[#EDF1FB] p-6 text-center">
            <div className="mb-4 inline-block rounded-full bg-white p-4">
              <FaShoppingBag className="text-[#030A70]" size={32} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-[#030A70]">2.</h3>
            <h4 className="mb-2 text-lg font-semibold text-[#030A70]">
              Buyers Discover and Shop
            </h4>
            <p className="text-gray-600">
              Browse through our curated selections to find one-of-a-kind items
              that suit your style and needs.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-lg bg-[#EDF1FB] p-6 text-center">
            <div className="mb-4 inline-block rounded-full bg-white p-4">
              <FaLock className="text-[#030A70]" size={32} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-[#030A70]">3.</h3>
            <h4 className="mb-2 text-lg font-semibold text-[#030A70]">
              Easy & Secure Payment
            </h4>
            <p className="text-gray-600">
              GiriToday ensures smooth transactions and offers a secure platform
              for global options.
            </p>
          </div>

          {/* Card 4 */}
          <div className="rounded-lg bg-[#EDF1FB] p-6 text-center">
            <div className="mb-4 inline-block rounded-full bg-white p-4">
              <FaHandshake className="text-[#030A70]" size={32} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-[#030A70]">4.</h3>
            <h4 className="mb-2 text-lg font-semibold text-[#030A70]">
              Support Local Businesses
            </h4>
            <p className="text-gray-600">
              Every purchase helps support local artisans and businesses,
              creating positive economic and social impacts.
            </p>
          </div>
        </div>
      </section>
      <WhyGiri />

      <Footer />
    </>
  );
};

export default AboutPage;
