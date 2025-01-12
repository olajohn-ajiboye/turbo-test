import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import {
  fetchSellerOrders,
  selectSellerOrders,
  selectSellerOrdersLoading,
  selectSellerOrdersError,
} from '@/services/redux/slices/sellers/sellerOrderSlice';
import RecentOrders from '@/components/dashboard/buyer/overview/RecentOrders';
import Analytics from '@/components/dashboard/seller/Overveiew/Analytics';
import OverviewIntro from '@/components/dashboard/seller/Overveiew/OverviewIntro';

const SellerOverview = () => {
  const dispatch = useAppDispatch();

  // Select data from Redux store
  const sellerOrders = useAppSelector(selectSellerOrders);
  const loading = useAppSelector(selectSellerOrdersLoading);
  const error = useAppSelector(selectSellerOrdersError);

  useEffect(() => {
    // Fetch orders on component mount
    dispatch(fetchSellerOrders());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <OverviewIntro
        totalOrders={sellerOrders.total_orders}
        totalProductsSold={sellerOrders.total_products_sold}
        newCustomers={sellerOrders.new_customers}
        totalSales={sellerOrders.total_sales}
        totalVisitors={sellerOrders.total_visitors}
      />
      <Analytics
        topLocations={sellerOrders.top_5_locations}
        topProducts={sellerOrders.top_5_products}
      />
      <RecentOrders />
    </>
  );
};

export default SellerOverview;
