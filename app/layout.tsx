import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { StyleSwitcher } from "@/components/StyleSwitcher";
import { body, display } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "TMF Electric, licensed electrician in Vernon, BC",
  description:
    "TMF Electric is run by Taylor, a licensed electrician in Vernon and the North Okanagan. Repairs, lighting, kitchens and renovations, panel upgrades, basement suites, shops and hot tubs.",
  // Concept page: keep it out of search until the real site replaces it.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the concept style switcher (components/StyleSwitcher.tsx)
    // sets colour tokens on <html> before React loads. Harmless to leave after it is removed.
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <body>
        {children}
        {process.env.NEXT_PUBLIC_STYLE_SWITCHER === "true" && <StyleSwitcher />}
        <Analytics />
      </body>
    </html>
  );
}
