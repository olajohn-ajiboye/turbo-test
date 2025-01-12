import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';

interface Notification {
  id: number;
  date: string;
  title: string;
  message: string;
  isRead: boolean;
}

const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the dropdown visibility
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      date: '23rd October, 2024 | 11:15am',
      title: 'New Order Received 🎉',
      message:
        'You have a new order #12345. Check the details and prepare for shipment.',
      isRead: false,
    },
    {
      id: 2,
      date: '22nd October, 2024 | 9:30am',
      title: 'Product Review ⭐️',
      message:
        'Your product "Art Canvas" received a 5-star review. Check the feedback!',
      isRead: false,
    },
    {
      id: 3,
      date: '21st October, 2024 | 6:10pm',
      title: 'Low Stock Alert ⚠️',
      message:
        'Your product "Handmade Mug" is running low on stock. Only 5 left!',
      isRead: false,
    },
    {
      id: 4,
      date: '20th October, 2024 | 12:00pm',
      title: 'Promotion Extended 🏷️',
      message:
        'The 10% discount on all products has been extended until the end of the month!',
      isRead: true,
    },
    {
      id: 5,
      date: '18th October, 2024 | 3:45pm',
      title: 'Order Shipped 🚚',
      message:
        'Order #12344 has been shipped. Track the progress from the order details page.',
      isRead: true,
    },
  ]);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to mark all notifications as read
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      isRead: true,
    }));
    setNotifications(updatedNotifications);
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        className="relative rounded-full bg-gray-100 p-2 hover:bg-gray-200 focus:outline-none"
        onClick={toggleDropdown}
      >
        <FaBell size={24} />
        {/* Badge for unread notifications */}
        {notifications.some(notification => !notification.isRead) && (
          <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-red-500"></span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-lg bg-white shadow-lg">
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold text-[#030A70]">
              Notifications
            </h2>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {/* Notifications List */}
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`border-b p-4 ${notification.isRead ? 'bg-gray-100' : 'bg-white'}`}
              >
                <p className="text-sm text-gray-500">{notification.date}</p>
                <h3 className="font-medium text-[#030A70]">
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-700">{notification.message}</p>
              </div>
            ))}
          </div>
          {/* Mark all as read button */}
          <div className="p-4 text-center">
            <button
              className="w-full rounded-md bg-gray-200 py-2 text-gray-700 hover:bg-gray-300"
              onClick={markAllAsRead}
            >
              Mark all as read
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
