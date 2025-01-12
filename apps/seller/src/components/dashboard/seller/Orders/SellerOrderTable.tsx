import { useEffect } from 'react';
import TableComponent from '../../TableComponent';
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

const SellerOrder = () => {
  const dispatch = useAppDispatch();

  // Fetch orders from the Redux store
  const sellerOrders = useAppSelector(selectSellerOrders);
  const loading = useAppSelector(selectSellerOrdersLoading);
  const error = useAppSelector(selectSellerOrdersError);

  useEffect(() => {
    dispatch(fetchSellerOrders());
  }, [dispatch]);

  const columns = [
    {
      header: 'Order ID',
      accessor: 'booking_id',
    },
    {
      header: 'Product',
      accessor: 'product',
      render: (row: any) => (
        <div className="flex items-center space-x-2">
          <img
            src={row.product.thumbnail}
            alt={row.product.name}
            className="h-10 w-10 rounded object-cover"
          />
          <span>{row.product.name}</span>
        </div>
      ),
    },
    {
      header: 'Price',
      accessor: 'price',
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row: any) => (
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            row.status === 'Completed'
              ? 'bg-green-100 text-green-600'
              : row.status === 'Processing'
                ? 'bg-yellow-100 text-yellow-600'
                : 'bg-gray-100 text-gray-600'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: 'Payment',
      accessor: 'total_price',
      render: (_row: any) => (
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
          Paid
        </span>
      ),
    },
    {
      header: 'Shipping',
      accessor: 'shipping',
      render: (row: any) => (
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            row.shipping === 'Shipped'
              ? 'bg-green-100 text-green-600'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Shipped
        </span>
      ),
    },
    {
      header: 'Date',
      accessor: 'ordered_at',
      render: (row: any) =>
        new Date(row.ordered_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <TableComponent
      data={sellerOrders.orders}
      columns={columns}
      rowsPerPage={5}
      title="Seller Orders"
      viewAllLink="/seller/orders"
    />
  );
};

export default SellerOrder;
