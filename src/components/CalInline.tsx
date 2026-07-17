"use client";

import { useEffect } from "react";

type CalApi = ((...args: unknown[]) => void) & {
  ns?: Record<string, (...args: unknown[]) => void>;
};

const CONTAINER_ID = "my-cal-inline-15min";

/**
 * Mounts the Cal.com inline calendar into the booking column on /contact.
 * Uses the dedicated "15min-inline" namespace (initialised by CalScript)
 * so event type details stay hidden here without affecting the popup
 * embeds elsewhere; polls briefly until the embed queue is available.
 */
export default function CalInline({ style }: { style?: React.CSSProperties }) {
  useEffect(() => {
    const tryInit = (): boolean => {
      const el = document.getElementById(CONTAINER_ID);
      if (!el) return true; // unmounted — stop trying
      if (el.childElementCount > 0) return true; // already embedded
      const cal = (window as unknown as { Cal?: CalApi }).Cal;
      const ns = cal?.ns?.["15min-inline"];
      if (!ns) return false; // CalScript not ready yet
      ns("inline", {
        elementOrSelector: `#${CONTAINER_ID}`,
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
        calLink: "inesburrell/15min",
      });
      return true;
    };

    if (tryInit()) return;
    const id = window.setInterval(() => {
      if (tryInit()) window.clearInterval(id);
    }, 250);
    return () => window.clearInterval(id);
  }, []);

  return <div id={CONTAINER_ID} style={style} />;
}
