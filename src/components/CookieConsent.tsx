"use client";

import { useEffect } from "react";
import Script from "next/script";

const CSS_HREF = "https://cdn.jsdelivr.net/gh/silktide/consent-manager@v2.0.1/silktide-consent-manager.css";
const CSS_INTEGRITY = "sha384-EdMq+R+YOnsbelo08wPenoTlnxbAyxI11NMIxzugx/qAsbh64KcOkqxYqq6pfvO/";
const JS_SRC = "https://cdn.jsdelivr.net/gh/silktide/consent-manager@v2.0.1/silktide-consent-manager.js";
const JS_INTEGRITY = "sha384-5Pt34uiIbCsvfiiZXoLi4HRf/YBXjr9c8e+gYeVo9smUaInNHYVtc8NZ8wUnXJIq";

type SilktideWindow = Window & {
  silktideConsentManager?: { init: (config: unknown) => void };
};

function initConsentManager() {
  const manager = (window as SilktideWindow).silktideConsentManager;
  if (!manager) return;
  manager.init({
    backdrop: { show: true },
    icon: { position: "bottomLeft" },
    prompt: { position: "bottomLeft" },
    consentTypes: [
      {
        id: "essential",
        label: "Essential",
        description:
          "<p>These cookies are necessary for the website to function properly and cannot be switched off. They help with things like setting your privacy preferences.</p>",
        required: true,
      },
      {
        id: "analytics",
        label: "Analytics",
        description:
          "<p>These cookies help us improve the site by tracking which pages are most popular and how visitors move around the site.</p>",
        required: false,
        gtag: "analytics_storage",
      },
      {
        id: "marketing",
        label: "Marketing",
        description:
          "<p>These cookies are used by us and our advertising partners to show you relevant ads on this site and elsewhere, and to measure how those campaigns perform.</p>",
        required: false,
        gtag: ["ad_storage", "ad_user_data", "ad_personalization", "analytics_storage"],
      },
    ],
    text: {
      prompt: {
        description:
          "<p>We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic.</p>",
        acceptAllButtonText: "Accept all",
        acceptAllButtonAccessibleLabel: "Accept all cookies",
        rejectNonEssentialButtonText: "Reject non-essential",
        rejectNonEssentialButtonAccessibleLabel: "Reject all non-essential cookies",
        preferencesButtonText: "Preferences",
        preferencesButtonAccessibleLabel: "Toggle preferences",
      },
      preferences: {
        title: "Customize your cookie preferences",
        description:
          "<p>We respect your right to privacy. You can choose not to allow some types of cookies. Your cookie preferences will apply across our website.</p>",
        saveButtonText: "Save and close",
        saveButtonAccessibleLabel: "Save your cookie preferences",
        creditLinkText: "",
        creditLinkAccessibleLabel: "",
      },
    },
  });
}

/** Silktide cookie banner, themed to the site. Works with the Consent Mode
 *  defaults set in GoogleTagManager.tsx: everything is denied until the
 *  visitor accepts, then Silktide updates consent via gtag(). */
export default function CookieConsent() {
  useEffect(() => {
    if (document.getElementById("silktide-consent-manager-css")) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.id = "silktide-consent-manager-css";
    link.href = CSS_HREF;
    link.integrity = CSS_INTEGRITY;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <style id="silktide-consent-manager-overrides">{`
#stcm-wrapper {
  --boxShadow: -5px 5px 10px 0px #00000012, 0px 0px 50px 0px #0000001a;
  --fontFamily: var(--font-sans), 'Source Sans 3', Helvetica Neue, Segoe UI, Arial, sans-serif;
  --primaryColor: #6E222D;
  --backgroundColor: #ffffff;
  --textColor: #4b494b;
  --backdropBackgroundColor: #00000033;
  --backdropBackgroundBlur: 0px;
  --iconColor: #6e222d;
  --iconBackgroundColor: #ffffff;
}
/* Hide the Silktide credit link entirely (belt and braces alongside the
   empty creditLinkText config). */
#stcm-wrapper a[href*="silktide"] { display: none !important; }
      `}</style>
      <Script
        src={JS_SRC}
        integrity={JS_INTEGRITY}
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onReady={initConsentManager}
      />
    </>
  );
}
