import React from 'react';
import { Message } from '@/types/types';
import MessageInput from './MessageInput';

interface MessageDetailProps {
  message: Message;
}

const MessageDetail: React.FC<MessageDetailProps> = ({ message }) => {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center border-b bg-[#F5F5F5] p-4">
        <img
          src={message.storeProfile}
          alt={message.storeName}
          className="mr-4 h-10 w-10 rounded-full"
        />
        <div>
          <h3 className="font-semibold">{message.storeName}</h3>
          <p className="text-sm text-gray-500">{message.storeLocation}</p>
        </div>
      </div>

      {/* Message History */}
      <div className="scrollbar-hidden flex-1 space-y-4 overflow-y-auto p-4">
        {message.messageHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.isStore ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`rounded-lg p-3 ${msg.isStore ? 'bg-gray-200 text-black' : 'bg-[#030A70] text-white'}`}
            >
              <p>{msg.content}</p>
              <span className="mt-2 block text-xs text-gray-500">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <MessageInput />
    </div>
  );
};

export default MessageDetail;
