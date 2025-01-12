import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Giri from '../assets/1_High_Resolution_Image.jpg';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/UI/select';
import SearchInput from './UI/searchInput';
import { IoMdArrowDropdown, IoMdHeartEmpty } from 'react-icons/io';
import { BsCart } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import CartSidebar from './buyer/CartSidebar';
import {
  selectIsAuthenticated,
  logout,
} from '../services/redux/slices/buyers/authSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import {
  fetchUserProfile,
  selectUserProfile,
} from '@/services/redux/slices/buyers/profileSlice';
import {
  fetchCategories,
  selectCategories,
} from '@/services/redux/slices/categoriesSlice';
import {
  fetchWishlist,
  selectWishlistItems,
} from '@/services/redux/slices/buyers/wishlistSlice';
import TopHeader from './TopHeader';



function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userProfile = useAppSelector(selectUserProfile);
  const categories = useAppSelector(selectCategories);
  const wishlistItems = useAppSelector(selectWishlistItems);
  const cartItems = useAppSelector(state => state.cart.items);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
      dispatch(fetchWishlist());
    }
    // Fetch categories on component mount
    dispatch(fetchCategories());
  }, [isAuthenticated, dispatch]);

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  const handleSearchChange = (keyword: string) => {
    setSearchTerm(keyword);
  };

  // Function to handle search navigation
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/product?query=${searchTerm.trim()}`);
    }
  };

  const cartItemsCount = cartItems.length;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  return (
    <header className="sticky left-0 right-0 top-0 z-50 bg-white shadow-md">
      {/* Top Info Bar */}
      <TopHeader />

      {/* Navigation */}
      <nav className="bg-[white] px-5 py-2 md:px-10">
        <div className="mx-auto flex items-center justify-between md:gap-60">
          <div>
            <Link to="/" className="flex-shrink-0">
              <img
                src={Giri}
                alt="Giri logo"
                className="h-12 rounded-lg md:h-16"
              />
            </Link>
          </div>

          {/* Category and Search Input */}
          <div className="hidden 2xl:flex">
            <Select>
              <SelectTrigger className="w-[180px] bg-[#FAFAFA] font-archivo text-[#19183A]">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="All Categories">All Categories</SelectItem>
                  {/* Dynamically render categories from the Redux store */}
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <SearchInput
              className="w-full bg-[#FAFAFA] lg:w-[32rem]"
              value={searchTerm}
              onChange={e => handleSearchChange(e.target.value)}
              onSearch={handleSearch}
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden flex-grow items-center gap-5 2xl:flex">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center rounded-lg border border-[#030A70] px-3 py-2 text-[#19183A] focus:outline-none"
                >
                  Hi, {userProfile?.first_name || 'User'}{' '}
                  <IoMdArrowDropdown size={24} color="#030A70" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white shadow-lg">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/signin" className="text-[#19183A]">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-lg border px-8 py-3 text-[#19183A] ring-2 ring-[#030A70]"
                >
                  Sign Up
                </Link>
              </>
            )}

            {isAuthenticated && (
              <Link
                to="/dashboard/saved-items"
                className="relative rounded-lg bg-[#EDF1FB] p-3"
              >
                <IoMdHeartEmpty size={30} color="#030A70" />
                {wishlistItems.length > 0 && (
                  <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#030A70] text-xs text-white">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={toggleCart}
              className="relative rounded-lg bg-[#EDF1FB] p-3"
            >
              <BsCart size={30} color="#030A70" />
              <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#030A70] text-xs text-white">
                {cartItemsCount}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button and Icons */}
          <div className="flex items-center gap-3 2xl:hidden">
            {isAuthenticated && (
              <Link
                to="/dashboard/saved-items"
                className="relative rounded-lg bg-[#EDF1FB] p-3"
              >
                <IoMdHeartEmpty size={30} color="#030A70" />
                {wishlistItems.length > 0 && (
                  <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#030A70] text-xs text-white">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={toggleCart}
              className="relative rounded-lg bg-[#EDF1FB] p-3"
            >
              <BsCart size={30} color="#030A70" />
              <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#030A70] text-xs text-white">
                {cartItemsCount}
              </span>
            </button>
            <button
              onClick={toggleMobileMenu}
              className="relative z-50 text-[#030A70]"
            >
              {isMobileMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed left-0 right-0 top-0 z-40 pb-24 transform bg-[#FAFAFA] shadow-lg transition-transform ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          } max-h-full w-full overflow-auto 2xl:hidden`}
        >
          <div className="space-y-4 px-5 py-4 pb-10 pt-32">
            <Select>
              <SelectTrigger className="w-full bg-[#FAFAFA] font-archivo text-[#19183A]">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="All Categories">All Categories</SelectItem>
                  {/* Dynamically render categories from the Redux store */}
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <SearchInput
              className="w-full bg-[#FAFAFA] lg:w-[32rem]"
              value={searchTerm}
              onChange={e => handleSearchChange(e.target.value)}
              onSearch={handleSearch}
            />
            <div>
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center rounded-lg border border-[#030A70] px-3 py-2 text-[#19183A] focus:outline-none"
                  >
                    Hi, {userProfile?.first_name || 'User'}{' '}
                    <IoMdArrowDropdown size={24} color="#030A70" />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute left-0 w-40 rounded-lg bg-white shadow-lg">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                
                <>
                  <Link to="/signin" className="text-[#19183A] block text-center w-full">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded-lg border mt-3 px-8 py-3 text-[#19183A] ring-2 ring-[#030A70] block w-full text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Dark overlay when Cart is open */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50"
          style={{ top: '112px' }}
          onClick={closeCart}
        />
      )}

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={toggleCart} />
    </header>

  );
}

export default Header;
