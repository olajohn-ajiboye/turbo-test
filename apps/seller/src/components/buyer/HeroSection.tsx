import Badge from '../UI/badge';
import HeroImage from '../../assets/heroimage-buyer.png';
import TwoMUsers from '../../assets/2musers.png';

function HeroSection() {
  return (
    <>
      <section className="flex-row justify-between bg-[#D2DAF0] pt-10 md:flex md:pt-0">
        <div className="p-5 md:px-24 md:pt-60">
          <div className="mb-5">
            <img src={TwoMUsers} alt="2m users" />
          </div>
          <div>
            <h1 className="font-inter text-[48px] font-bold leading-[47px] text-[#19183A]">
              Discover Your Next Favorite Products from africa!
            </h1>
          </div>
          <p className="mt-5">Explore these categories:</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Badge
              text="Art"
              classname="border rounded-lg px-5 py-1 ring-1 ring-[#030A70]"
            />
            <Badge
              text="Food"
              classname="border rounded-lg px-5 py-1 ring-1 ring-[#030A70]"
            />
            <Badge
              text="Fashion"
              classname="border rounded-lg px-5 py-1 ring-1 ring-[#030A70]"
            />
            <Badge
              text="Gadgets"
              classname="border rounded-lg px-5 py-1 ring-1 ring-[#030A70]"
            />
            <Badge
              text="Music"
              classname="border rounded-lg px-5 py-1 ring-1 ring-[#030A70]"
            />
          </div>
        </div>

        <div className="">
          <img
            src={HeroImage}
            width={1100}
            className="object-cover"
            alt="hero image"
          />
        </div>
      </section>
    </>
  );
}

export default HeroSection;
