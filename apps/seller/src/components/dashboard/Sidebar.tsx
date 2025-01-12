import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useAppDispatch } from '@/services/hooks/useAppDispatch';
import { logout } from '@/services/redux/slices/sellers/sellerAuthSlice';

import Overview from '../../assets/dashboard-icons/overview.svg';
import Inbox from '../../assets/dashboard-icons/message.svg';
import Orders from '../../assets/dashboard-icons/shopping-cart.svg';
import ManageShop from '../../assets/dashboard-icons/followed-shop.svg';
import Clock from '../../assets/dashboard-icons/clock.svg';
import Heart from '../../assets/dashboard-icons/heart.svg';
import Settings from '../../assets/dashboard-icons/account-settings.svg';
import DiscussionForum from '../../assets/dashboard-icons/discussion-forum.svg';
import ProductTag from '../../assets/dashboard-icons/product-tag.svg';
import AddressBook from '../../assets/dashboard-icons/address-book.svg';
import SMEHelp from '../../assets/dashboard-icons/sme-loan.svg';
import Logout from '../../assets/dashboard-icons/logout.svg';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  isSeller?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  closeSidebar,
  isSeller = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Menu items for buyers
  const buyerMenuItems = [
    { name: 'Overview', icon: Overview, path: '/dashboard' },
    { name: 'Orders', icon: Orders, path: '/dashboard/orders' },
    { name: 'Inbox', icon: Inbox, path: '/dashboard/inbox' },
    { name: 'Saved items', icon: Heart, path: '/dashboard/saved-items' },
    {
      name: 'Recently viewed',
      icon: Clock,
      path: '/dashboard/recently-viewed',
    },
    {
      name: 'Followed shops',
      icon: ManageShop,
      path: '/dashboard/followed-shops',
    },
    {
      name: 'Address book',
      icon: AddressBook,
      path: '/dashboard/address-book',
    },
    {
      name: 'Account settings',
      icon: Settings,
      path: '/dashboard/account-settings',
    },
    {
      name: 'Discussion forum',
      icon: DiscussionForum,
      path: '/dashboard/discussion-forum',
    },
  ];

  // Menu items for sellers
  const sellerMenuItems = [
    { name: 'Overview', icon: Overview, path: '/seller-dashboard' },
    { name: 'Products', icon: ProductTag, path: '/seller-dashboard/products' },
    { name: 'Orders', icon: Orders, path: '/seller-dashboard/orders' },
    { name: 'Inbox', icon: Inbox, path: '/seller-dashboard/inbox' },
    {
      name: 'Manage Shop',
      icon: ManageShop,
      path: '/seller-dashboard/manage-shop',
    },
    {
      name: 'Discussion forum',
      icon: DiscussionForum,
      path: '/seller-dashboard/discussion-forum',
    },
    { name: 'Settings', icon: Settings, path: '/seller-dashboard/settings' },
    {
      name: 'SME-Loan Help',
      icon: SMEHelp,
      path: '/seller-dashboard/sme-loan-help',
    },
  ];

  // Choose correct menu based on user type
  const menuItems = isSeller ? sellerMenuItems : buyerMenuItems;

  // Handle logout
  const handleLogout = async () => {
    try {
      await dispatch(logout());
      closeSidebar(); // Close the sidebar
      navigate(isSeller ? '/seller/signin' : '/signin'); // Redirect to sign-in page
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <div className="fixed flex lg:hidden">
        {!isOpen && (
          <button
            onClick={toggleSidebar}
            className="p-3 focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            <RxHamburgerMenu size={30} />
          </button>
        )}
      </div>

      {/* Sidebar Menu */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } fixed left-0 top-24 z-40 mt-6 w-full bg-white p-5 shadow-md md:top-28 md:h-[screen] lg:left-10 lg:top-32 lg:block lg:w-64 xl:top-36`}
      >
        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-lg font-semibold">Hello, John Smith</p>
            <button onClick={closeSidebar} className="lg:hidden">
              <IoMdClose size={30} />
            </button>
          </div>
          <nav>
            {menuItems.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                className={`mb-2 flex items-center rounded-md p-3 text-base transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-[#EDF1FB] text-[#19183A]'
                    : 'text-[#19183A] hover:bg-[#EDF1FB] hover:text-[#030A70]'
                }`}
                onClick={closeSidebar}
              >
                <span className="mr-3">
                  <img src={item.icon} alt={item.name} />
                </span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-4">
          <button
            className="flex w-full items-center rounded-md bg-[#F6F6F6] p-3 text-blue-800 transition-colors duration-200 hover:bg-white hover:text-blue-600"
            onClick={handleLogout}
          >
            <img src={Logout} alt="logout" className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
