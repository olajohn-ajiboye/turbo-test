import React from 'react';
import { FaFacebook, FaInstagram, FaCalendarAlt } from 'react-icons/fa';
import shopAbout from '../../assets/shop-images/shopAbout.png';

const AboutShop: React.FC = () => {
  return (
    <section
      id="about-section"
      className="rounded-lg bg-[#EDF1FB] px-6 py-10 md:px-12 md:py-20 lg:px-24"
    >
      <h2 className="py-5 text-2xl font-bold text-[#19183A] md:py-10 md:text-4xl">
        About Shop
      </h2>
      <div className="flex flex-col justify-between md:flex-row">
        {/* Text Section */}
        <div className="md:w-3/5 md:py-10 md:pr-40 md:pt-5">
          <h3 className="mb-4 text-xl font-semibold text-[#19183A] md:text-3xl">
            Personalised beads gifts and clothing, all as unique and special as
            you.
          </h3>
          <p className="mb-4 text-[#717274] md:text-lg">
            At Creative Artz, we celebrate creativity in all its forms, offering
            a diverse collection of original artwork and handmade treasures.
            From stunning paintings and sculptures to unique home decor and
            personalized gifts, our store is a haven for art enthusiasts and
            collectors alike. Our talented artists pour their passion and
            expertise into each creation, ensuring that every piece is a
            masterpiece in its own right. Whether you're seeking a statement
            artwork to adorn your walls or a one-of-a-kind gift to cherish
            forever, Creative Artz has something special waiting for you.{' '}
            <span className="cursor-pointer text-[#030A70]">Read more.</span>
          </p>

          {/* Stats and Social Links */}
          <div className="mt-6 flex flex-col flex-wrap gap-5">
            <div className="flex gap-4">
              <div>
                <p className="grid text-2xl font-bold text-[#030A70]">
                  34,619{' '}
                  <span className="text-base font-normal text-[#030A70]">
                    followers
                  </span>
                </p>
              </div>
              <div>
                <p className="grid text-2xl font-bold text-[#030A70]">
                  104{' '}
                  <span className="text-base font-normal text-[#030A70]">
                    following
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center text-sm text-[#030A70]">
              <FaCalendarAlt size={25} className="mr-2" />
              <span>Est. December 2012</span>
            </div>
            {/* Social Media Icons */}
            <div className="mt-4 flex items-center gap-4 md:mt-0">
              <span className="rounded-full bg-[#030A70] p-2 text-white">
                <a href="#">
                  <FaFacebook size={20} />
                </a>
              </span>
              <span className="rounded-full bg-[#030A70] p-2 text-white">
                <a href="#">
                  <FaInstagram size={20} />
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="mt-6 md:mt-0 md:w-2/5">
          <img
            src={shopAbout}
            alt="About Shop"
            className="h-full w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutShop;
