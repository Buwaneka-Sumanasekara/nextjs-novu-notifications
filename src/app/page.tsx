import { NotificationContainer } from '@/components/NotificationContainer';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Next.js with Novu Notifications</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Welcome to the Demo</h2>
          <p className="text-gray-600">
            This is a demo page showing Novu notifications integration with Next.js.
            The notification icon is positioned in the top-right corner.
          </p>
        </div>
      </div>

      {/* Notification container */}
      <NotificationContainer subscriberId="c8547790-a3a1-490d-aefd-bb07649abbef" />
    </main>
  );
}
