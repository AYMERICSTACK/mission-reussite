"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type AdventurePrefetchProps = {
  hrefs: string[];
};

export function AdventurePrefetch({ hrefs }: AdventurePrefetchProps) {
  const router = useRouter();

  useEffect(() => {
    const uniqueHrefs = [...new Set(hrefs.filter(Boolean))];
    const preload = () => uniqueHrefs.forEach((href) => router.prefetch(href));

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(preload, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timer: ReturnType<typeof setTimeout> = setTimeout(preload, 250);
    return () => clearTimeout(timer);
  }, [hrefs, router]);

  return null;
}
