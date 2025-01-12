import React from 'react';
import { Message } from '@/types/types';
import { BiCheckDouble } from 'react-icons/bi';
interface MessageListItemProps {
  message: Message;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ message }) => {
  return (
    <div className="flex items-center space-x-4">
      <img
        src={message.storeProfile}
        alt={message.storeName}
        className="h-10 w-10 rounded-full"
      />
      <div className="flex-1">
        <h4 className="text-sm font-semibold">{message.storeName}</h4>
        <p className="truncate text-xs text-gray-600">{message.snippet}</p>
      </div>
      <div className="text-right">
        {/* Use lastMessageTime instead of lastMessage */}
        <p className="text-xs text-gray-500">{message.lastMessageTime}</p>

        {/* Conditional rendering: show unread count or tick icon */}
        {message.unreadCount > 0 ? (
          <span className="inline-block h-6 w-6 rounded-full bg-[#030A70] text-center text-xs leading-6 text-white">
            {message.unreadCount}
          </span>
        ) : (
          <BiCheckDouble size={25} className="text-end text-[#030A70]" /> // Render the tick icon when no unread messages
        )}
      </div>
    </div>
  );
};

export default MessageListItem;
