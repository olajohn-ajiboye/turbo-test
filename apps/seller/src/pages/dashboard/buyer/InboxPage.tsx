import React, { useState } from 'react';
import { messages } from '../../../services/api/message';
import MessageDetail from '../../../components/dashboard/buyer/inbox/MessageDetail';
import InboxSidebar from '../../../components/dashboard/buyer/inbox/InboxSidebar';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const InboxPage: React.FC = () => {
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null
  );
  const [isMessageView, setIsMessageView] = useState(false);

  // Find the selected message based on the id
  const selectedMessage = messages.find(
    message => message.id === selectedMessageId
  );

  // Function to handle selecting a message and switching views on mobile
  const handleSelectMessage = (messageId: number) => {
    setSelectedMessageId(messageId);
    setIsMessageView(true); // Switch to the message view on mobile
  };

  const handleBackToChatList = () => {
    setIsMessageView(false); // Switch back to the chat list on mobile
  };

  return (
    <div className="fixed flex h-[78%] w-[95%] overflow-hidden lg:w-[70%] xl:w-[75%]">
      {/* Sidebar (Left Section) */}
      <div
        className={`${
          isMessageView ? 'hidden' : 'block'
        } w-full border-r bg-white lg:block lg:w-[30%]`}
      >
        <InboxSidebar
          messages={messages}
          selectedMessageId={selectedMessageId}
          setSelectedMessageId={handleSelectMessage}
        />
      </div>

      {/* Main Section (Message details) */}
      <div
        className={`${
          isMessageView ? 'block' : 'hidden'
        } flex-1 bg-white lg:block`}
      >
        {/* Back button on mobile */}
        {isMessageView && (
          <div className="flex items-center border-b p-4 lg:hidden">
            <button onClick={handleBackToChatList} className="mr-4">
              <AiOutlineArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold">Messages</h2>
          </div>
        )}

        {/* Message Detail View */}
        {selectedMessage ? (
          <MessageDetail message={selectedMessage} />
        ) : (
          <p className="p-4 text-center text-gray-500">
            Select a message to view the conversation
          </p>
        )}
      </div>
    </div>
  );
};

export default InboxPage;
