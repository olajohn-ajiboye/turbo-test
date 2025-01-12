import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/1_High_Resolution_Image.jpg';


function AuthNav() {
  const location = useLocation();

  // Determine the link based on the current route
  const route = location.pathname === '/seller/signin' ? '/seller' : '/';

  return (
    <nav className="pl-10 pt-5 md:pl-16">
      <Link to={route}>
        <img src={logo} alt="logo" className="h-16 rounded-lg" />
      </Link>
    </nav>
  );
}

export default AuthNav;
