import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Giri from '../assets/1_High_Resolution_Image.jpg';
import { Link, useNavigate } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import { IoMdArrowDropdown } from 'react-icons/io';
import {
  logout,
  selectIsSellerAuthenticated,
} from '@/services/redux/slices/sellers/sellerAuthSlice';
import {
  fetchSellerProfile,
  selectSellerProfile,
} from '@/services/redux/slices/sellers/sellerProfileSlice';

function SellerHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsSellerAuthenticated);
  const sellerProfile = useAppSelector(selectSellerProfile);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchSellerProfile());
    }
  }, [isAuthenticated, dispatch]);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(logout());
    setIsMobileMenuOpen(false); // Close the mobile menu on logout
    navigate('/seller/signin');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="sticky left-0 right-0 top-0 z-50 bg-white shadow-md">
      <nav className="px-6 py-2 md:px-10">
        <div className="mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/seller">
              <img
                src={Giri}
                alt="Giri logo"
                className="h-12 w-auto md:h-16 rounded-lg"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden flex-grow items-center justify-end gap-6 md:flex">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center rounded-md border border-[#030A70] bg-white px-4 py-2 text-sm font-medium text-[#19183A] hover:bg-[#F8F9FB] focus:outline-none"
                >
                  Hi, {sellerProfile?.first_name || 'User'}
                  <IoMdArrowDropdown className="ml-2" size={20} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-white shadow-md">
                    <Link
                      to="/seller-dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/seller/signin"
                  className="text-sm font-medium text-[#19183A] hover:text-[#030A70]"
                >
                  Login
                </Link>
                <Link
                  to="/seller/signup"
                  className="rounded-md border border-[#030A70] px-6 py-2 text-sm font-medium text-[#030A70] hover:bg-[#030A70] hover:text-white"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="flex items-center text-[#030A70] md:hidden"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 right-0 z-40 transform bg-[#FAFAFA] shadow-lg transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <Link to="/seller" onClick={() => setIsMobileMenuOpen(false)}>
              <img src={Giri} alt="Giri logo" className="h-12 w-auto" />
            </Link>
            {/* Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#030A70]"
            >
              <FaTimes size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center space-y-6 py-12">
            {isAuthenticated ? (
              <>
                <Link
                  to="/seller-dashboard"
                  className="text-sm font-medium text-[#19183A] hover:text-[#030A70]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-[#19183A] hover:text-[#030A70]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/seller/signin"
                  className="text-sm font-medium text-[#19183A] hover:text-[#030A70]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/seller/signup"
                  className="rounded-md border border-[#030A70] px-6 py-2 text-sm font-medium text-[#030A70] hover:bg-[#030A70] hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default SellerHeader;
