import SellerHeroImage from '../../assets/SellerHero.png';
import TwoMUsers from '../../assets/2musers.png';
import { Link } from 'react-router-dom';

interface SellerHeroSectionProps {
  isAuthenticated: boolean;
  isSeller: boolean | null;
  isOnboarded: boolean | null;
}

function SellerHeroSection({
  isAuthenticated,
  isSeller,
  isOnboarded,
}: SellerHeroSectionProps) {
  return (
    <>
      <section className="flex-row justify-between bg-[#D2DAF0] pt-10 md:flex md:pt-0">
        <div className="p-10 pt-14 md:px-24 md:pt-60">
          <div className="mb-5">
            <img src={TwoMUsers} alt="2m users" />
          </div>
          <h1 className="font-inter text-[48px] font-bold leading-[47px] text-[#19183A] md:pr-36">
            Showcase and sell unique products to a global audience!
          </h1>
          <p className="mt-5">
            {isAuthenticated
              ? isSeller
                ? isOnboarded
                  ? 'Welcome back! Continue building your shop and reaching your audience.'
                  : 'Complete your profile to start selling on GiriToday.'
                : 'Complete your onboarding to start selling on GiriToday.'
              : 'Join the world-class design marketplace that connects amazing creators like you with a global community.'}
          </p>
          <Link
            to={
              isAuthenticated
                ? isOnboarded
                  ? '/seller-dashboard'
                  : '/seller/profile-completion'
                : '/seller/signin'
            }
          >
            <button className="mt-5 rounded-lg bg-[#030A70] px-7 py-4 font-semibold text-white">
              {isAuthenticated
                ? isOnboarded
                  ? 'Go to Dashboard'
                  : 'Complete Profile'
                : 'Start Selling Now'}
            </button>
          </Link>
        </div>

        <div className="">
          <img
            src={SellerHeroImage}
            width={1400}
            className="object-cover"
            alt="hero image"
          />
        </div>
      </section>
    </>
  );
}

export default SellerHeroSection;
