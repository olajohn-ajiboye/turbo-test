import { FiPlus, FiUpload } from 'react-icons/fi';
import ManageShop from '../../../../assets/dashboard-icons/followed-shop.svg';
import ProductTag from '../../../../assets/dashboard-icons/product-tag.svg';
import OutOfStock from '../../../../assets/dashboard-icons/stoock.svg';
import Card from '../Card';
import Button from '../Button';
import { useNavigate } from 'react-router';
import { useAppSelector } from '@/services/hooks/useAppDispatch';
import { selectSellerOrders } from '@/services/redux/slices/sellers/sellerOrderSlice';

const ProductOverview = () => {
  const sellerOrders = useAppSelector(selectSellerOrders);
  const navigate = useNavigate();
  const createProduct = () => {
    navigate('./add');
  };

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold text-[#19183A]">Products</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Reuse the Card component */}
        <Card
          icon={ManageShop}
          title="Total Inventory Value"
          value={sellerOrders.total_inventory_value}
        />
        <Card
          icon={ProductTag}
          title="Products Sold"
          value={sellerOrders.total_products_sold}
        />
        <Card
          icon={OutOfStock}
          title="Out of Stock"
          value={sellerOrders.total_out_of_stock_products}
        />

        {/* Quick Actions */}
        <div className="grid gap-4">
          <p>Quick Actions</p>
          <Button
            icon={<FiPlus size={20} />}
            label="Add new product"
            primary
            onClick={createProduct}
          />
          <Button
            icon={<FiUpload size={20} />}
            label="Export CSV"
            onClick={() => console.log('Export CSV clicked')}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductOverview;
