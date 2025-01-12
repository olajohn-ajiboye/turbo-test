import React from 'react';
import { BiMessageAltDetail } from 'react-icons/bi';

interface ChatIconProps {
  onClick: () => void;
}

const ChatIcon: React.FC<ChatIconProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-10 right-5 rounded-full bg-[#030A70] p-3 text-white shadow-lg transition duration-300 md:right-10"
    >
      <BiMessageAltDetail size={40} />
    </button>
  );
};

export default ChatIcon;
