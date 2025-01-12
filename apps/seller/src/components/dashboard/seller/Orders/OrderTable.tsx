import { useState } from 'react';
import TableComponent from '../../TableComponent';
import { orderData } from '.././../../../services/api/ordersData';
import { truncateText } from '@/utils/textUtils';

const OrderTable = () => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  // Handle individual checkbox change
  const handleCheckboxChange = (orderId: string) => {
    setSelectedOrders(
      prev =>
        prev.includes(orderId)
          ? prev.filter(id => id !== orderId) // Uncheck
          : [...prev, orderId] // Check
    );
  };

  // Handle select all
  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allOrderIds = orderData.map(order => order.orderId);
      setSelectedOrders(allOrderIds);
    } else {
      setSelectedOrders([]);
    }
  };

  // Define columns for the Order Table
  const columns = [
    {
      header: (
        <input
          type="checkbox"
          checked={selectedOrders.length === orderData.length}
          onChange={handleSelectAllChange}
        />
      ),
      accessor: 'checkbox',
      render: (row: any) => (
        <input
          type="checkbox"
          checked={selectedOrders.includes(row.orderId)}
          onChange={() => handleCheckboxChange(row.orderId)}
        />
      ),
    },
    {
      header: 'Order ID',
      accessor: 'orderId',
      render: (row: any) => (
        <span className="font-medium text-[#030A70]">{`#${row.orderId}`}</span>
      ),
    },
    {
      header: 'Product',
      accessor: 'productName',
      render: (row: any) => (
        <div className="flex items-center space-x-4">
          <img
            src={row.productImage}
            alt={row.productName}
            className="h-12 w-12 rounded object-cover"
          />
          <span>{truncateText(row.productName, 37)}</span>
        </div>
      ),
    },
    {
      header: 'Price',
      accessor: 'price',
      render: (row: any) => <span>{row.price}</span>,
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row: any) => (
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            row.status === 'Completed'
              ? 'bg-[#E5F9E7] text-[#1B5E20]'
              : row.status === 'Pending'
                ? 'bg-[#FFF3CD] text-[#856404]'
                : 'bg-[#F8D7DA] text-[#721C24]'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: 'Payment',
      accessor: 'payment',
      render: (row: any) => (
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            row.payment === 'Paid'
              ? 'bg-[#E5F9E7] text-[#1B5E20]'
              : 'bg-[#F8D7DA] text-[#721C24]'
          }`}
        >
          {row.payment}
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
              ? 'bg-[#E5F9E7] text-[#1B5E20]'
              : 'bg-[#FFF3CD] text-[#856404]'
          }`}
        >
          {row.shipping}
        </span>
      ),
    },
    { header: 'Date', accessor: 'date' },
  ];

  return (
    <TableComponent
      data={orderData}
      columns={columns}
      title="Orders"
      rowsPerPage={8} // Customize rows per page if needed
    />
  );
};

export default OrderTable;
