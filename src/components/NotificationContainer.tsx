'use client';

import { useEffect } from 'react';
import { NovuService } from '@/lib/novu.service';
import { NotificationIcon } from './NotificationIcon';
import { NotificationDropdown } from './NotificationDropdown';
import { useState } from 'react';

interface NotificationContainerProps {
  subscriberId: string;
}

export function NotificationContainer({ subscriberId }: NotificationContainerProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const novuService = NovuService.getInstance(subscriberId);

    // Set up unread count handler
    const cleanupUnreadCount = novuService.onUnreadCountChange((data) => {

      setUnreadCount(data?.result);
    });

    const cleanup = novuService.onNotificationReceived((data) => {
      console.log('Notification received:', data);
    });

    // Initial fetch of unread count
    novuService.getUnreadCount().then((count) => {
    
      setUnreadCount(count?.data?.count);
    });

    return () => {
      cleanupUnreadCount();
      cleanup();
    };
  }, [subscriberId]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <NotificationIcon
        subscriberId={subscriberId}
        unreadCount={unreadCount}
        onNotificationClick={() => setIsDropdownOpen(!isDropdownOpen)}
      />
      <NotificationDropdown
        subscriberId={subscriberId}
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
      />
    </div>
  );
} 