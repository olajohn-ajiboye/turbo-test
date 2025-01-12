import TabsNav from '@/components/dashboard/buyer/TabsNav';
import { useState } from 'react';
import PersonalInformation from '@/components/dashboard/buyer/accountSettings/PersonalInformation';
import SecuritySettings from '@/components/dashboard/buyer/accountSettings/SecuritySettings';

const AccountSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal-information');

  const tabs = [
    { key: 'personal-information', label: 'Personal information' },
    { key: 'security-settings', label: 'Security Settings' },
  ];

  // Function to render the appropriate component based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal-information':
        return <PersonalInformation />;
      case 'security-settings':
        return <SecuritySettings />;
      default:
        return <PersonalInformation />;
    }
  };

  return (
    <div>
      {/* Tabs Navigation */}
      <TabsNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
        showSearch={false} // Disable the search bar for this case
        title="Settings"
      />

      {/* Content that changes based on the active tab */}
      <div className="mt-6">{renderTabContent()}</div>
    </div>
  );
};

export default AccountSettings;
