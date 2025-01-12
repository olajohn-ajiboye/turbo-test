import { FiUpload } from 'react-icons/fi';
import ManageShop from '../../../../assets/dashboard-icons/followed-shop.svg';
import ProductTag from '../../../../assets/dashboard-icons/product-tag.svg';
import OutOfStock from '../../../../assets/dashboard-icons/stoock.svg';
import Card from '../Card';
import Button from '../Button';
import { convertToCSV, downloadCSV } from '@/utils/csvUtils';
import { selectSellerOrders } from '@/services/redux/slices/sellers/sellerOrderSlice';
import { useAppSelector } from '@/services/hooks/useAppDispatch';

interface OrderOverviewProps {
  orderData: Array<Record<string, any>>;
}

const OrderOverview: React.FC<OrderOverviewProps> = ({ orderData }) => {
  const sellerOrders = useAppSelector(selectSellerOrders);

  const handleExportCSV = () => {
    const csv = convertToCSV(orderData);
    downloadCSV(csv, 'orders.csv');
  };

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold text-[#19183A]">Orders</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Reuse the Card component */}
        <Card
          icon={ManageShop}
          title="Total orders"
          value={sellerOrders.total_orders}
          className="pb-7 pl-0 pt-0"
        />
        <Card
          icon={ProductTag}
          title="Completed orders"
          value={sellerOrders.total_completed_orders}
          className="pb-7 pl-0 pt-0"
        />
        <Card
          icon={OutOfStock}
          title="Pending orders"
          value={sellerOrders.total_pending_orders}
          className="pb-7 pl-0 pt-0"
        />

        {/* Quick Actions */}
        <div className="grid gap-4">
          <p>Quick Actions</p>
          <Button
            icon={<FiUpload size={20} />}
            label="Export CSV"
            onClick={handleExportCSV}
          />
        </div>
      </div>
    </section>
  );
};

export default OrderOverview;
