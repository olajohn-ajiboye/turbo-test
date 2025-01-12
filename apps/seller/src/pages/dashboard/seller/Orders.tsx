import OrderOverview from '@/components/dashboard/seller/Orders/OrderOverview';
import SellerOrder from '@/components/dashboard/seller/Orders/SellerOrderTable';
import { orderData } from '@/services/api/ordersData';

const SellerOrders = () => {
  return (
    <>
      <OrderOverview orderData={orderData} />
      <SellerOrder />
    </>
  );
};

export default SellerOrders;
