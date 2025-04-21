'use client';

import { useState, useEffect } from 'react';
import { NovuService } from '@/lib/novu.service';

interface Notification {
  _id: string;
  subject: string;
  body: string;
  createdAt: string;
  read: boolean;
}

interface NotificationDropdownProps {
  subscriberId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationDropdown({ subscriberId, isOpen, onClose }: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    const novuService = NovuService.getInstance(subscriberId);

    const fetchNotifications = async () => {
      try {
        const notifications = await novuService.getNotifications();
        console.log('Notifications:fetchNotifications', notifications);
        setNotifications(notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    // Set up notification received handler
    const cleanupNotificationReceived = novuService.onNotificationReceived((handler) => {
      console.log('Notification received1:', handler);
      const notif=handler?.result
      console.log('Notification received2:', notif);
      setNotifications(prevNotifications => [notif, ...prevNotifications]);
     // fetchNotifications();
    });

    return () => {
      cleanupNotificationReceived();
    };
  }, [subscriberId, isOpen]);

  if (!isOpen) return null;

  console.log('Notifications:', notifications);

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No notifications</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className={`p-3 rounded-lg ${
                  notification.read ? 'bg-gray-50' : 'bg-blue-50'
                }`}
              >
                <h3 className="font-medium text-gray-900">{notification.subject}</h3>
                <p className="text-sm text-gray-500 mt-1">{notification.body}</p>
                <time className="text-xs text-gray-400 mt-2 block">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </time>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 