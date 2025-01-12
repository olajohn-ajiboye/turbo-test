import { MdOutlineMailOutline } from 'react-icons/md';
import { RxInstagramLogo } from 'react-icons/rx';
import { FaFacebook } from 'react-icons/fa6';
import DotSeparator from './UI/dotSeperator';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="bg-[#FCC230] px-4 py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center md:flex-row md:gap-11">
          {/* Text Section */}
          <div className="mb-4 text-center md:mb-0 md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">
              Join Our Newsletter
            </h2>
            <p className="mt-1 text-gray-800">
              Receive pricing updates, shopping tips & more!
            </p>
          </div>

          {/* Input Section */}
          <div className="flex w-full items-center overflow-hidden rounded-md bg-white p-2 shadow-md md:w-auto md:p-2">
            <div className="px-4 text-gray-500">
              <MdOutlineMailOutline />
            </div>
            <input
              type="email"
              placeholder="Enter email address..."
              className="w-full px-4 py-2 focus:outline-none md:w-80"
            />
            <button className="w-32 bg-[#030A70] px-3 py-3 text-sm font-medium text-white hover:bg-blue-800 md:px-6 md:py-2 md:text-base">
              Join Now
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#19183A] p-10 px-5 text-white md:px-24">
        <div className="justify-between pb-5 md:flex">
          <div className="flex justify-center gap-3 text-sm md:gap-5">
            <a href="">Home</a>
            <a
              href="https://giritoday.com/about-us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              About Us
            </a>
            <a
              href="https://giritoday.com/shop/#faq"
              target="_blank"
              rel="noopener noreferrer"
            >
              FAQ
            </a>
            <a href="">Contact Us</a>
            <Link to="/">Blog</Link>
            <Link to="/forum">Forum</Link>
            <Link to="/inbox">Inbox</Link>

            <a
              href="https://giritoday.com/careers/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Careers
            </a>
          </div>
          <div className="flex justify-center gap-2 pt-2 md:pt-0">
            <div className="rounded-full bg-[#C4C4C5] p-2">
              <FaFacebook color="#19183A" />
            </div>
            <div className="rounded-full bg-[#C4C4C5] p-2">
              <RxInstagramLogo color="#19183A" />
            </div>
          </div>
        </div>
        <hr className="bg-[#C4C4C5] px-1 font-thin" />
        <div className="grid justify-center pt-5 md:flex md:justify-between">
          <div className="flex gap-5">
            <p>Privacy Policy</p>
            <DotSeparator />
            <Link to="/terms&conditions">terms & Conditions</Link>
          </div>
          <p>Copyrights© 2024 All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
