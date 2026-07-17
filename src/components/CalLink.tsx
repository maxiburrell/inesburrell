import type { CSSProperties, ReactNode } from "react";

const CAL_LINK = "inesburrell/15min";
const CAL_NAMESPACE = "15min";
const CAL_CONFIG = JSON.stringify({
  layout: "month_view",
  useSlotsViewOnSmallScreen: "true",
});

/**
 * A "Book a call" trigger. Renders a button with Cal.com data attributes;
 * the embed script loaded by CalScript opens the booking popup on click.
 * Deliberately not an anchor: it must never navigate to app.cal.eu, only
 * open the popup. Base button resets live in the .cal-btn class.
 */
export default function CalLink({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <button
      type="button"
      data-cal-link={CAL_LINK}
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-config={CAL_CONFIG}
      className={className ? `cal-btn ${className}` : "cal-btn"}
      style={style}
    >
      {children}
    </button>
  );
}
