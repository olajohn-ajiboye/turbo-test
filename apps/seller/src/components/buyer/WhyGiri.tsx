import InfoCard from '../UI/InfoCard';

function WhyGiri() {
  return (
    <section className="bg-[#EDF1FB] px-5 pb-10 pt-10 lg:p-24">
      <div className="pb-10">
        <h1 className="text-center font-archivo text-4xl font-semibold">
          Why GiriToday?
        </h1>
        <p className="text-center">
          Uncover the GiriToday difference and experience the essence of Africa
          through our curated selection, authentic products, and seamless
          shopping experience.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <InfoCard
          heading="Authenticity Guaranteed"
          text="At GiriToday, authenticity is our top priority. We meticulously verify each product and trader to ensure that you receive only genuine African treasures. Shop with confidence, knowing that every purchase supports local artisans and communities."
        />
        <InfoCard
          heading="Diverse Selection"
          text="Discover a world of diversity at GiriToday. Our platform offers a vast selection of handpicked goods, ranging from traditional crafts to contemporary creations. With over 300 quality traders/stores, you'll find something unique to suit every taste and style."
        />
        <InfoCard
          heading="Seamless Shopping Experience"
          text="Experience convenience like never before with GiriToday. Our user-friendly interface, secure payment options, and worldwide shipping make shopping a breeze. Whether you're browsing from your desktop or mobile device, GiriToday ensures a seamless shopping experience from start to finish."
        />
      </div>
    </section>
  );
}

export default WhyGiri;
