"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const MAX_TRANSITION_MS = 10_000;

export function RouteTransitionIndicator() {
  const pathname = usePathname();
  const [pending, setPending] = useState(false);
  const safetyTimer = useRef<number | null>(null);

  const stopPending = () => {
    setPending(false);
    document.documentElement.removeAttribute("data-route-pending");
    if (safetyTimer.current !== null) {
      window.clearTimeout(safetyTimer.current);
      safetyTimer.current = null;
    }
  };

  const startPending = () => {
    setPending(true);
    document.documentElement.setAttribute("data-route-pending", "true");
    if (safetyTimer.current !== null) window.clearTimeout(safetyTimer.current);
    safetyTimer.current = window.setTimeout(stopPending, MAX_TRANSITION_MS);
  };

  useEffect(() => {
    const timer = window.setTimeout(stopPending, 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;

      startPending();
    };

    const handlePopState = () => startPending();
    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);
    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);
      if (safetyTimer.current !== null) window.clearTimeout(safetyTimer.current);
      document.documentElement.removeAttribute("data-route-pending");
    };
  }, []);

  if (!pending) return null;

  return (
    <div className="route-transition" role="status" aria-live="polite" aria-label="Chargement de la prochaine étape">
      <div className="route-transition__bar" />
      <div className="route-transition__card">
        <span className="route-transition__spinner" aria-hidden="true" />
        <div>
          <strong>En route vers la suite…</strong>
          <small>Ton aventure se prépare</small>
        </div>
      </div>
    </div>
  );
}
