import { Novu } from "@novu/js";

if (!process.env.NEXT_PUBLIC_NOVU_API_KEY) {
  throw new Error("Missing NEXT_PUBLIC_NOVU_API_KEY environment variable");
}

export function initializeNovu(subscriberId: string) {
  return new Novu({
    applicationIdentifier: process.env.NEXT_PUBLIC_NOVU_API_KEY!,
    subscriberId: subscriberId
  });
} 