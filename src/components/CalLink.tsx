import type { CSSProperties, ReactNode } from "react";

const CAL_LINK = "inesburrell/15min";
const CAL_NAMESPACE = "15min";
const CAL_CONFIG = JSON.stringify({
  layout: "month_view",
  useSlotsViewOnSmallScreen: "true",
});

/**
 * A "Book a call" trigger. Renders an anchor with Cal.com data attributes;
 * the embed script loaded by CalScript turns clicks into the booking modal.
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
    <a
      href="https://app.cal.eu/inesburrell/15min"
      data-cal-link={CAL_LINK}
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-config={CAL_CONFIG}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
