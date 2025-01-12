import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import TableComponent from '../../TableComponent';
import { truncateText } from '@/utils/textUtils';
import {
  fetchBuyerOrders,
  selectBuyerOrders,
  selectOrdersLoading,
} from '@/services/redux/slices/buyers/ordersSlice';

const RecentOrders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectBuyerOrders);
  const isLoading = useAppSelector(selectOrdersLoading);

  useEffect(() => {
    dispatch(fetchBuyerOrders());
  }, [dispatch]);

  // Sort orders from most recent to least recent based on order date
  const sortedOrders = [...orders].sort(
    (a, b) =>
      new Date(b.ordered_at).getTime() - new Date(a.ordered_at).getTime()
  );

  const columns = [
    { header: 'Order ID', accessor: 'booking_id' },
    {
      header: 'Product',
      accessor: 'items',
      render: (row: any) => {
        const product = row.items[0]?.product || {}; // Display the first product in the order
        return (
          <div className="flex items-center space-x-4">
            <img
              src={product.thumbnail || '/placeholder.png'}
              alt={product.name || 'Product'}
              className="h-12 w-12 rounded object-cover"
            />
            <span>{truncateText(product.name || 'Product', 37)}</span>
          </div>
        );
      },
    },
    {
      header: 'Placed on',
      accessor: 'ordered_at',
      render: (row: any) =>
        new Date(row.ordered_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
    },
    {
      header: 'Quantity',
      accessor: 'items',
      render: (row: any) => row.items.length,
    },
    {
      header: 'Total',
      accessor: 'total_price',
      render: (row: any) => {
        const totalPrice = parseFloat(row.total_price) || 0; // Safely convert to number
        return <span>${totalPrice.toFixed(2)}</span>;
      },
    },
    {
      header: 'Store name',
      accessor: 'items',
      render: (row: any) => row.items[0]?.product?.shop_name || 'Unknown',
    },
    {
      header: 'Order status',
      accessor: 'status',
      render: (row: any) => (
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            row.status === 'completed'
              ? 'bg-[#E5F9E7] text-[#1B5E20]'
              : row.status === 'pending'
                ? 'bg-[#FFF3CD] text-[#856404]'
                : 'bg-[#F8D7DA] text-[#721C24]'
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  if (isLoading) {
    return <p>Loading recent orders...</p>;
  }

  return (
    <TableComponent
      data={sortedOrders}
      columns={columns}
      title="Recent orders"
      viewAllLink="/dashboard/orders"
      rowsPerPage={8}
    />
  );
};

export default RecentOrders;
