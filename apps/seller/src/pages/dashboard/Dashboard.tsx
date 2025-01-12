import { useState } from 'react';
import { useAppSelector } from '@/services/hooks/useAppDispatch';
import { selectIsSellerAuthenticated } from '@/services/redux/slices/sellers/sellerAuthSlice';
import { selectIsAuthenticated } from '@/services/redux/slices/buyers/authSlice';
import Header from '@/components/Nav';
import Sidebar from '../../components/dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import SellerHeader from '@/components/SellerHeader';
import { RootState } from '@/services/redux/store';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check if the user is a seller or a buyer
  const isAuthenticated = useAppSelector((state: RootState) =>
    selectIsAuthenticated(state)
  );
  const isSellerAuthenticated = useAppSelector((state: RootState) =>
    selectIsSellerAuthenticated(state)
  );

  // Determine `isSeller` status
  const isSeller = isSellerAuthenticated && !isAuthenticated;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Render SellerHeader if the user is a seller; otherwise, render Header */}
      {isSeller ? <SellerHeader /> : <Header />}

      <div className="min-h-screen flex-col bg-[#EDF1FB]">
        {/* Sidebar Component */}
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          closeSidebar={closeSidebar}
          isSeller={isSeller}
        />

        {/* Main Content Area */}
        <div
          className={`flex-1 overflow-y-auto p-4 lg:ml-72 lg:px-10 lg:py-6 ${
            isSidebarOpen ? 'hidden lg:block' : 'block'
          }`}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
