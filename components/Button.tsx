"use client";

import type { ComponentProps, MouseEvent, ReactNode } from "react";
import { ArrowDown } from "./Icons";

// The one button for the whole site. Styles live in globals.css (.btn).
// Primary: accent with a faint sheen and accent-tinted depth.
// Secondary: paper with a hairline border and ink-tinted depth.
// Arrows live inside buttons only, and only where the `arrow` prop asks for one.
// A client component so a placeholder href of "#" can be inert instead of
// jumping the page.
type Base = {
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};
type AsLink = Base & Omit<ComponentProps<"a">, keyof Base> & { href: string };
type AsButton = Base &
  Omit<ComponentProps<"button">, keyof Base> & { href?: undefined };

export function Button(props: AsLink | AsButton) {
  const {
    variant = "primary",
    size = "md",
    arrow = false,
    className,
    children,
    ...rest
  } = props;
  const cls = ["btn", `btn-${variant}`, size === "sm" ? "btn-sm" : "", className]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      {children}
      {arrow && <ArrowDown />}
    </>
  );

  if (typeof rest.href === "string") {
    const anchor = rest as ComponentProps<"a">;
    return (
      <a
        className={cls}
        {...anchor}
        onClick={(e: MouseEvent<HTMLAnchorElement>) => {
          if (anchor.href === "#") e.preventDefault();
          anchor.onClick?.(e);
        }}
      >
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as ComponentProps<"button">)}>
      {content}
    </button>
  );
}
