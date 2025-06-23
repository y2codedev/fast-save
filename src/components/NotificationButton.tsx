// components/NotificationBell.tsx
'use client';

import { useState, useEffect } from 'react';
import useSound from 'use-sound';
import { FaBell, FaBellSlash } from 'react-icons/fa';

interface NotificationButtonProps {
  title?: string;
  message?: string;
  onNotificationClick?: () => void;
}

// Extend the NotificationOptions interface to include vibrate
declare global {
  interface NotificationOptions {
    vibrate?: number[];
  }
}

export default function NotificationBell({
  title = 'New Notification',
  message = 'You have a new message!',
  onNotificationClick,
}: NotificationButtonProps) {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isEnabled, setIsEnabled] = useState(false);
 const [play, { stop }] = useSound('/audio/bell.mp3', {
    volume: 0.5,
    onloaderror: () => console.warn('Sound failed to load'),
    onplayerror: () => console.warn('Sound failed to play'),
  });

  // Check notification permission on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
      setIsEnabled(Notification.permission === 'granted');
      
      // Set up notification click handler
      if (Notification.permission === 'granted') {
        navigator.serviceWorker?.getRegistration().then(reg => {
          reg?.addEventListener('notificationclick', (event: Event) => {
            const notificationEvent = event as unknown as { notification: Notification };
            notificationEvent.notification.close();
            onNotificationClick?.();
          });
        });
      }
    }
  }, [onNotificationClick]);

  const requestPermission = () => {
    Notification.requestPermission().then((result) => {
      setPermission(result);
      setIsEnabled(result === 'granted');
    });
  };

  const triggerNotification = () => {
    if (permission !== 'granted') {
      requestPermission();
      return;
    }

    try {
      // Play the bell sound
      play();

      // Create notification options with type assertion
      const options: NotificationOptions & { vibrate?: number[] } = {
        body: message,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        vibrate: [200, 100, 200],
      };

      // Show the notification
      const notification = new Notification(title, options);

      // Handle notification click
      notification.onclick = () => {
        notification.close();
        onNotificationClick?.();
      };
    } catch (error) {
      console.error('Notification failed:', error);
      // Fallback to alert if notifications fail
      alert(message);
    }
  };

  const toggleNotifications = () => {
    if (isEnabled) {
      setIsEnabled(false);
    } else {
      requestPermission();
    }
  };

  return (
    <div className=" relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <button
        onClick={toggleNotifications}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label={isEnabled ? 'Disable notifications' : 'Enable notifications'}
      >
        {isEnabled ? (
          <FaBell className="text-indigo-600 dark:text-indigo-400" size={20} />
        ) : (
          <FaBellSlash className="text-gray-500" size={20} />
        )}
      </button>

      {isEnabled && (
        <button
          onClick={triggerNotification}
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center hover:bg-red-600 transition-colors"
          aria-label="Test notification"
        >
          !
        </button>
      )}
    </div>
  );
}