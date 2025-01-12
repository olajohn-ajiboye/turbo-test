import { useState } from 'react';
import { RiMagicFill } from 'react-icons/ri';
import logo from '../../assets/1_High_Resolution_Image.jpg';

function WelcomePopup() {
  const [isPopupVisible, setPopupVisible] = useState(true);

  const closePopup = () => {
    setPopupVisible(false);
  };
  return (
    <div>
      {/* Popup Overlay */}
      {isPopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div>
            <div className="flex justify-center">
              <img
                src={logo}
                alt="giri logo"
                width={100}
                className="m-8 rounded-full border-4"
              />
            </div>

            <div className="relative mx-auto max-w-md rounded-lg bg-[#EDF1FB] p-8 shadow-lg">
              <div className="flex flex-col items-center">
                <div className="mb-4 rounded-full bg-white p-4">
                  <RiMagicFill size={32} color="#030A70" />
                </div>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  Welcome aboard!
                </h2>
                <p className="mb-8 text-center text-gray-700">
                  Your account is ready to use. Set up a store and explore Giri
                  now!
                </p>
                <button
                  className="w-full rounded-md bg-[#030A70] px-6 py-3 text-lg font-semibold text-white"
                  onClick={closePopup}
                >
                  Explore Giri
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WelcomePopup;
