import { useEffect, useState } from 'react';
import OrderDetailsCard from '../../../components/dashboard/buyer/orders/OrderDetailsCard';
import TabsNav from '@/components/dashboard/buyer/TabsNav';
import {
  fetchBuyerOrders,
  selectBuyerOrders,
  selectOrdersLoading,
} from '../../../services/redux/slices/buyers/ordersSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';

const Order = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const dispatch = useAppDispatch();

  // Select orders and loading state from the Redux store
  const orders = useAppSelector(selectBuyerOrders);
  const isLoading = useAppSelector(selectOrdersLoading);

  useEffect(() => {
    // Fetch orders on component mount
    dispatch(fetchBuyerOrders());
  }, [dispatch]);

  const tabs = [
    { key: 'all', label: 'View all orders' },
    { key: 'completed', label: 'Completed orders' },
    { key: 'pending', label: 'Pending orders' },
    { key: 'failed', label: 'Failed orders' },
  ];

  // Filter orders based on the search query and active tab
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.booking_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(
        item =>
          item.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.product.shop_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );

    const matchesTab =
      activeTab === 'all' || order.status.toLowerCase() === activeTab;

    return matchesSearch && matchesTab;
  });

  return (
    <>
      <TabsNav
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
        searchPlaceholder="Search Order ID, product, or store name..."
        title="Orders"
      />
      <section>
        <div className="bg-[#EDF1FB] py-5">
          {isLoading ? (
            <div className="py-10 text-center">
              <p className="text-lg text-gray-500">Loading orders...</p>
            </div>
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <OrderDetailsCard key={order.id} order={order} />
            ))
          ) : (
            <div className="py-10 text-center">
              <p className="text-lg text-gray-500">
                No orders found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Order;
