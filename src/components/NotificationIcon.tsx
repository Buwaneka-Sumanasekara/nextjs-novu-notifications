'use client';

import { Bell } from 'lucide-react';

interface NotificationIconProps {
  subscriberId: string;
  unreadCount: number;
  onNotificationClick?: () => void;
}

export function NotificationIcon({ unreadCount, onNotificationClick }: NotificationIconProps) {
  return (
    <button
      onClick={onNotificationClick}
      className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
      aria-label="Notifications"
    >
      <Bell className="h-6 w-6 text-gray-600" />
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
          {unreadCount}
        </span>
      )}
    </button>
  );
} 