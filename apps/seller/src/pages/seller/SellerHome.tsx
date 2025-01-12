import Footer from '@/components/Footer';
import SellerHeroSection from '@/components/seller/SellerHeroSection';
import WhySellOnGiriToday from '@/components/seller/WhySellOnGiriToday';
import HowItWorks from '@/components/seller/HowItWorks';
import Testimonials from '@/components/seller/Testimonials';
import SellerHeader from '@/components/SellerHeader';
import { useAppSelector } from '@/services/hooks/useAppDispatch';
import {
  selectIsSellerAuthenticated,
  selectIsSeller,
  selectIsOnboarded,
} from '@/services/redux/slices/sellers/sellerAuthSlice';

function SellerHome() {
  const isAuthenticated = useAppSelector(selectIsSellerAuthenticated);
  const isSeller = useAppSelector(selectIsSeller);
  const isOnboarded = useAppSelector(selectIsOnboarded);

  return (
    <>
      <SellerHeader />
      <SellerHeroSection
        isAuthenticated={isAuthenticated}
        isSeller={isSeller}
        isOnboarded={isOnboarded}
      />
      <WhySellOnGiriToday
        isAuthenticated={isAuthenticated}
        isSeller={isSeller}
        isOnboarded={isOnboarded}
      />
      <HowItWorks
        isAuthenticated={isAuthenticated}
        isSeller={isSeller}
        isOnboarded={isOnboarded}
      />
      <Testimonials />
      <Footer />
    </>
  );
}

export default SellerHome;
