import { Novu } from "@novu/js";

type EventHandler = (data: any) => void;
type UnreadCountHandler = (data: { unreadCount: number }) => void;
type NotificationReceivedHandler = (data: any) => void;

export class NovuService {
  private static instance: NovuService | null = null;
  private readonly novu: Novu;
  private cleanupFunctions: Map<string, (() => void)[]> = new Map();
  private unreadCountHandlers: Set<UnreadCountHandler> = new Set();
  private notificationReceivedHandlers: Set<NotificationReceivedHandler> = new Set();

  private constructor(subscriberId: string) {
    if (!process.env.NEXT_PUBLIC_NOVU_API_KEY) {
      throw new Error("Missing NEXT_PUBLIC_NOVU_API_KEY environment variable");
    }

    this.novu = new Novu({
      applicationIdentifier: process.env.NEXT_PUBLIC_NOVU_API_KEY,
      subscriberId
    });

    this.setupDefaultEventListeners();
  }

  private setupDefaultEventListeners(): void {
    // Setup unread count changed listener
    this.on('notifications.unread_count_changed', (data: { unreadCount: number }) => {
      this.unreadCountHandlers.forEach(handler => handler(data));
    });

    // Setup notification received listener
    this.on('notifications.notification_received', (data: any) => {
      this.notificationReceivedHandlers.forEach(handler => handler(data));
    });
  }

  public static getInstance(subscriberId: string): NovuService {
    if (!this.instance) {
      this.instance = new NovuService(subscriberId);
    }
    return this.instance;
  }

  public on(event: string, handler: EventHandler): () => void {
    // @ts-ignore - Types are not properly defined in the SDK
    const cleanup = this.novu.on(event, handler);

    // Store the cleanup function
    if (!this.cleanupFunctions.has(event)) {
      this.cleanupFunctions.set(event, []);
    }
    this.cleanupFunctions.get(event)?.push(cleanup);

    // Return cleanup function
    return () => {
      cleanup();
      const cleanups = this.cleanupFunctions.get(event);
      if (cleanups) {
        const index = cleanups.indexOf(cleanup);
        if (index > -1) {
          cleanups.splice(index, 1);
        }
      }
    };
  }

  public onUnreadCountChange(handler: UnreadCountHandler): () => void {
    this.unreadCountHandlers.add(handler);
    return () => {
      this.unreadCountHandlers.delete(handler);
    };
  }

  public onNotificationReceived(handler: NotificationReceivedHandler): () => void {
    this.notificationReceivedHandlers.add(handler);
    return () => {
      this.notificationReceivedHandlers.delete(handler);
    };
  }

  public async getUnreadCount(): Promise<number> {
    // @ts-ignore - Types are not properly defined in the SDK
    return this.novu.notifications.count();
  }

  public async getNotifications(): Promise<any[]> {
    // @ts-ignore - Types are not properly defined in the SDK
    const response = await this.novu.notifications.list({limit:10,order:'desc'});
    console.log(response);
    return response?.data?.notifications || [];
  }

  public async markAsRead(notificationId: string): Promise<void> {
    // @ts-ignore - Types are not properly defined in the SDK
    await this.novu.notifications.markAsRead(notificationId);
  }

  public async markAllAsRead(): Promise<void> {
    // @ts-ignore - Types are not properly defined in the SDK
    await this.novu.notifications.markAllAsRead();
  }

  public cleanup(): void {
    // Execute all cleanup functions
    this.cleanupFunctions.forEach((cleanups) => {
      cleanups.forEach(cleanup => cleanup());
    });
    this.cleanupFunctions.clear();
    this.unreadCountHandlers.clear();
    this.notificationReceivedHandlers.clear();
  }

  public getNovu(): Novu {
    return this.novu;
  }
} 