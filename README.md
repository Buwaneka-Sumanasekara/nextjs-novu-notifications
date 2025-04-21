# Next.js with Novu Notifications

A modern Next.js application integrated with Novu for real-time notifications. This project demonstrates how to implement a notification system using Novu's JavaScript SDK with Next.js 15.

## Features

- Real-time notifications using Novu
- Notification center with unread count
- Real-time updates for new notifications
- Clean and modern UI with Tailwind CSS
- TypeScript support
- Client-side components with 'use client' directive
- Proper event handling and cleanup

## Prerequisites

- Node.js 18+ and npm
- Novu account and API key
- Next.js 15

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd nextjs-novu-noti
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Novu API key:
```env
NEXT_PUBLIC_NOVU_API_KEY=your_novu_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── NotificationContainer.tsx  # Main notification wrapper
│   ├── NotificationIcon.tsx      # Notification bell icon
│   └── NotificationDropdown.tsx  # Notification dropdown
└── lib/                  # Utility files
    └── novu.service.ts   # Novu service class
```

## Components

### NotificationContainer
The main wrapper component that manages the notification state and coordinates between the icon and dropdown.

### NotificationIcon
A presentational component that displays the notification bell icon with unread count badge.

### NotificationDropdown
Displays the list of notifications in a dropdown menu.

## NovuService
The service class that handles all Novu-related functionality:

```typescript
const novuService = NovuService.getInstance(subscriberId);

// Get unread count
const count = await novuService.getUnreadCount();

// Get notifications
const notifications = await novuService.getNotifications();

// Listen for unread count changes
novuService.onUnreadCountChange((data) => {
  console.log('Unread count:', data.unreadCount);
});

// Listen for new notifications
novuService.onNotificationReceived((data) => {
  console.log('New notification:', data);
});
```

## Event Handling

The service provides two main event handlers:

1. `onUnreadCountChange`: Handles changes in unread notification count
2. `onNotificationReceived`: Handles new notification events

Both methods return cleanup functions that should be called when the component unmounts.

## Styling

The project uses Tailwind CSS for styling. The notification components are styled with a modern, clean design that includes:

- Responsive layout
- Hover effects
- Smooth transitions
- Proper z-indexing
- Shadow effects
- Rounded corners

## Best Practices

1. Always use the cleanup functions returned by event handlers
2. Use the singleton pattern for NovuService
3. Handle errors appropriately
4. Use TypeScript for type safety
5. Keep components focused and single-responsibility

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Novu](https://novu.co/) for the notification service
- [Next.js](https://nextjs.org/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
