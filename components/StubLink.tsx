"use client";

import type { ComponentProps } from "react";

// A placeholder link for pages that do not exist yet in the concept.
// Default is prevented so a click during the pitch never jumps the page.
export function StubLink(props: Omit<ComponentProps<"a">, "href" | "onClick">) {
  return <a {...props} href="#" onClick={(e) => e.preventDefault()} />;
}
