import React from 'react';
import { Message } from '../../../../types/types';
import { BiSolidChat } from 'react-icons/bi';
import { AiOutlineSend } from 'react-icons/ai';
import { MdAttachFile } from 'react-icons/md';
import { BsEmojiSmile } from 'react-icons/bs';

interface MessageWindowProps {
  selectedMessage: Message;
}

const MessageWindow: React.FC<MessageWindowProps> = ({ selectedMessage }) => {
  const { messageHistory } = selectedMessage; // Get messageHistory from selectedMessage

  return (
    <div className="flex h-full flex-col">
      {' '}
      {/* Full height window */}
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 shadow-md">
        <div className="flex items-center">
          <img
            src={selectedMessage.storeProfile}
            alt={selectedMessage.storeName}
            className="mr-3 h-10 w-10 rounded-full"
          />
          <div>
            <h4 className="font-bold text-[#19183A]">
              {selectedMessage.storeName}
            </h4>
            <p className="text-xs text-gray-500">
              {selectedMessage.storeLocation}
            </p>
          </div>
        </div>
        <div className="cursor-pointer text-gray-400">
          <BiSolidChat size={20} />
        </div>
      </div>
      {/* Message History (Scrollable) */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        {' '}
        {/* Flexible and scrollable */}
        {messageHistory.map(message => (
          <div
            key={message.id}
            className={`mb-4 ${message.isStore ? '' : 'text-right'}`}
          >
            <div
              className={`inline-block max-w-[70%] rounded-lg p-2 ${
                message.isStore ? 'bg-gray-100' : 'bg-[#030A70] text-white'
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {message.time}{' '}
              {message.isStore && <span>• {selectedMessage.storeName}</span>}
              {!message.isStore && <span>• John Smith</span>}
            </p>
          </div>
        ))}
      </div>
      {/* Message Input */}
      <div className="flex items-center space-x-4 bg-white p-4 shadow-md">
        <input
          type="text"
          placeholder="Type message here..."
          className="flex-1 rounded-lg border p-2 focus:outline-none"
        />
        <BsEmojiSmile className="text-gray-400" size={24} />
        <MdAttachFile className="text-gray-400" size={24} />
        <button className="rounded-lg bg-[#030A70] p-2 text-white">
          <AiOutlineSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default MessageWindow;
