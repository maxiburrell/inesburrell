"use client";

import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-KQDTG6S6";

/**
 * Google Tag Manager — loaded on site pages only (not /studio).
 *
 * Consent Mode v2 defaults are set to "denied" in the same script, before
 * the GTM loader runs, so no tag stores anything until the Silktide cookie
 * banner (see CookieConsent.tsx) updates consent via gtag().
 */
export default function GoogleTagManager() {
  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
