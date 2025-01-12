import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Message } from '@/types/types';
import MessageListItem from './MessageListItem';

interface InboxSidebarProps {
  messages: Message[];
  selectedMessageId: number | null;
  setSelectedMessageId: (messageId: number) => void;
}

const InboxSidebar: React.FC<InboxSidebarProps> = ({
  messages,
  selectedMessageId,
  setSelectedMessageId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  // Filter messages based on the search query and active filter
  const filteredMessages = messages
    .filter(
      message =>
        message.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.snippet.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(message => filter === 'all' || message.unreadCount > 0);

  // Count of unread messages
  const unreadMessagesCount = messages.filter(
    message => message.unreadCount > 0
  ).length;

  return (
    <div className="flex h-full flex-col border-r border-gray-200 bg-white p-4">
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search seller name, message etc..."
          className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#030A70]"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <BiSearch size={25} className="absolute left-3 top-3 text-gray-400" />
      </div>

      {/* Badge section for All and Unread messages */}
      <div className="mb-4 flex items-center space-x-4">
        <button
          onClick={() => setFilter('all')}
          className={`font-base rounded-lg px-4 py-2 ${
            filter === 'all'
              ? 'bg-[#030A70] text-white'
              : 'bg-gray-100 text-[#030A70]'
          }`}
        >
          All ({messages.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`font-base rounded-lg px-4 py-2 ${
            filter === 'unread'
              ? 'bg-[#030A70] text-white'
              : 'bg-gray-100 text-[#030A70]'
          }`}
        >
          Unread messages ({unreadMessagesCount})
        </button>
      </div>

      {/* Message List */}
      <div className="scrollbar-hidden flex-1 overflow-y-auto">
        {filteredMessages.map(message => (
          <div
            key={message.id}
            onClick={() => setSelectedMessageId(message.id)}
            className={`mb-2 cursor-pointer rounded-md p-2 ${
              selectedMessageId === message.id ? 'bg-[#EDF1FB]' : 'bg-white'
            }`}
          >
            <MessageListItem message={message} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxSidebar;
