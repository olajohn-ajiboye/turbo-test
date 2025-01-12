import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import {
  fetchBuyerShopDetails,
  selectBuyerShopDetails,
  selectBuyerShopLoading,
  selectBuyerShopError,
} from '@/services/redux/slices/buyers/buyerShopSlice';
import Footer from '../../components/Footer';
import Header from '@/components/Nav';
import SellerShowHero from '@/components/seller/SellerShowHero';
import AboutShop from '@/components/seller/AboutShop';
import ShopPolicies from '@/components/seller/ShopPolicies';
import ShopNav from '@/components/seller/ShopNav';
import ShopProducts from '@/components/seller/ShopProducts';
import ChatIcon from '../../components/UI/ChatIcon';
import ChatPopup from '@/components/seller/ChatPopup';

function SellerShop() {
  const { id } = useParams<{ id: string }>(); // Get the shop ID from the URL
  const [isChatOpen, setIsChatOpen] = useState(false); // State to control chat popup visibility
  const dispatch = useAppDispatch();
  const shop = useAppSelector(selectBuyerShopDetails);
  const isLoading = useAppSelector(selectBuyerShopLoading);
  const error = useAppSelector(selectBuyerShopError);

  // Fetch buyer shop details when the component mounts
  useEffect(() => {
    if (id) {
      dispatch(fetchBuyerShopDetails(id));
    }
  }, [dispatch, id]);

  // Toggle chat popup visibility
  const toggleChatPopup = () => {
    setIsChatOpen(prevState => !prevState);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!shop) {
    return <div>Shop not found</div>;
  }

  return (
    <>
      <Header />
      <SellerShowHero
        shopName={shop.shop_name}
        tagline={shop.tagline}
        logo={shop.logo}
        coverPhoto={shop.cover_photo}
        reviews={shop.total_reviews || 0} // Assuming total_reviews exists
        followers={shop.total_followers}
        productsSold={shop.total_products_sold}
        storeLocation={`${shop.state}, ${shop.country}`}
        chatReplyRate="98%" // Assuming this is hardcoded for now
      />

      <ShopNav />
      <ShopProducts products={shop.products} storeName={shop.shop_name} />
      <AboutShop />
      <ShopPolicies />
      <Footer />

      {/* Conditionally render the ChatIcon or ChatPopup based on isChatOpen state */}
      {!isChatOpen && <ChatIcon onClick={toggleChatPopup} />}

      {isChatOpen && (
        <ChatPopup
          onClose={toggleChatPopup}
          storeName={shop.shop_name}
          profileImage={shop.logo}
        />
      )}
    </>
  );
}

export default SellerShop;
