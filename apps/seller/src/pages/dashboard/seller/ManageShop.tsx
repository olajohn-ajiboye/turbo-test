import { useState } from 'react';
import TabsNav from '@/components/dashboard/buyer/TabsNav';
import ShopInformation from '@/components/dashboard/seller/manageShop/ShopInformation';
import CustomizeShop from '@/components/dashboard/seller/manageShop/CustomizeShop';
import GetPaid from '@/components/dashboard/seller/manageShop/GetPaid';

// Define tabs
const manageShopTabs = [
  { key: 'shop-information', label: 'Shop information' },
  { key: 'customize-shop', label: 'Customize shop' },
  { key: 'get-paid', label: 'Get paid' },
];

const ManageShop = () => {
  const [activeTab, setActiveTab] = useState('shop-information');

  // Function to render the content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'shop-information':
        return <ShopInformation />;
      case 'customize-shop':
        return <CustomizeShop />;
      case 'get-paid':
        return <GetPaid />;
      default:
        return null;
    }
  };

  return (
    <section>
      {/* Use the TabsNav component */}
      <TabsNav
        title="Shop information"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={manageShopTabs}
        showSearch={false} // Hide search for this use case
      />

      {/* Render the content for the active tab */}
      <div className="mt-6">{renderContent()}</div>
    </section>
  );
};

export default ManageShop;
