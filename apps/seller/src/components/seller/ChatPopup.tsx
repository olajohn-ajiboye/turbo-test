import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdSend } from 'react-icons/md';
import { RiImageAddLine } from 'react-icons/ri';

interface ChatPopupProps {
  onClose: () => void;
  storeName: string;
  profileImage: string;
}

const ChatPopup: React.FC<ChatPopupProps> = ({
  onClose,
  storeName,
  profileImage,
}) => {
  return (
    <section className="fixed bottom-16 right-4 z-50 w-80 rounded-lg border bg-white p-2 shadow-lg">
      {/* Chat Header */}
      <div className="bg-[#ECECEC]">
        <div className="flex items-center justify-between border-b bg-[#FFF] p-4">
          <div className="flex items-center">
            <img
              src={profileImage}
              alt={`${storeName} Profile`}
              className="h-8 w-8 rounded-full"
            />
            <div className="ml-2">
              <h3 className="text-sm font-semibold text-[#19183A]">
                {storeName}
              </h3>
              <span className="text-xs text-gray-500">10m Ago</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="h-64 overflow-y-auto p-4">
          {' '}
          <div className="flex flex-col space-y-4">
            {/* Store Message */}
            <div className="flex flex-col items-start">
              <div className="max-w-xs rounded-lg bg-white p-2 shadow-sm">
                <span className="text-xs text-gray-600">
                  {storeName} • 10:23 AM
                </span>
                <p className="mt-1">
                  Wide selection of beads in various sizes.
                </p>
              </div>
            </div>

            {/* User Message */}
            <div className="flex flex-col items-end">
              <div className="max-w-xs rounded-lg bg-[#030A70] p-2 text-white shadow-sm">
                <span className="text-xs text-gray-300">You • 10:23 AM</span>
                <p className="mt-1">I'm looking for beads that are durable.</p>
              </div>
            </div>

            <div className="flex flex-col items-start">
              <div className="max-w-xs rounded-lg bg-white p-2 shadow-sm">
                <span className="text-xs text-gray-600">
                  {storeName} • 10:24 AM
                </span>
                <p className="mt-1">
                  We offer a wide selection of durable beads!
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="max-w-xs rounded-lg bg-[#030A70] p-2 text-white shadow-sm">
                <span className="text-xs text-gray-300">You • 10:25 AM</span>
                <p className="mt-1">Perfect, thank you!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="bg-[white]">
          <div className="flex items-center border-t bg-[#FAFAFA] p-4">
            <button className="text-gray-500 hover:text-gray-700">
              <RiImageAddLine size={20} />
            </button>
            <input
              type="text"
              placeholder="Type here"
              className="ml-2 w-full rounded-l-md bg-[#fafafa] px-3 py-2 focus:outline-none"
              style={{ border: 'none' }}
            />
            <button className="rounded-r-md px-4 py-2">
              <MdSend color="#030A70" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatPopup;
