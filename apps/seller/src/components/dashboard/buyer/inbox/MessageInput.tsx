import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { FiPaperclip, FiSmile } from 'react-icons/fi';

const MessageInput: React.FC = () => {
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = () => {
    // Handle message send functionality here
    console.log('Sending message:', messageText);
    setMessageText('');
  };

  return (
    <div className="flex items-center border-t p-4">
      <input
        type="text"
        placeholder="Type message here..."
        value={messageText}
        onChange={e => setMessageText(e.target.value)}
        className="flex-1 rounded-lg border p-2 focus:outline-none"
      />
      <button className="ml-2 text-gray-400">
        <FiPaperclip size={20} />
      </button>
      <button className="ml-2 text-gray-400">
        <FiSmile size={20} />
      </button>
      <button
        className="ml-2 rounded-lg bg-[#030A70] p-2 text-white"
        onClick={handleSendMessage}
      >
        <IoSend size={20} />
      </button>
    </div>
  );
};

export default MessageInput;
