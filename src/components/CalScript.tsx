"use client";

import Script from "next/script";

/**
 * Loads the Cal.com embed once per page and initialises the "15min"
 * namespace used by every CalLink on the site. Uses the EU instance
 * (app.cal.eu) with the oxblood brand colour, matching the v3c design.
 */
export default function CalScript() {
  return (
    <Script id="cal-embed" strategy="afterInteractive">
      {`
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.eu/embed/embed.js", "init");
Cal("init", "15min", {origin:"https://app.cal.eu"});
Cal("init", "15min-inline", {origin:"https://app.cal.eu"});
Cal.config = Cal.config || {};
Cal.config.forwardQueryParams = true;
Cal.ns["15min"]("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#6e222d"}},"hideEventTypeDetails":false,"layout":"month_view"});
Cal.ns["15min-inline"]("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#6e222d"}},"hideEventTypeDetails":true,"layout":"month_view"});
      `}
    </Script>
  );
}
