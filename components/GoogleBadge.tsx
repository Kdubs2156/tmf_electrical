"use client";

import { Stars } from "./Icons";

// Client component only so the placeholder "#" link can stop the page jumping.
// Horizontal card: large score, gold stars over "26 reviews on Google".
// Placement (see globals.css): over the photo on phones and tablets, in the
// copy column below the buttons from 1200 to 1519px, and right of Taylor's
// head in the open sky from 1520px up. It never covers Taylor or the van lettering.
export function GoogleBadge({ href }: { href: string }) {
  const isStub = href === "#";
  return (
    <a
      className="hero-badge"
      href={href}
      aria-label="Rated 5.0 out of 5, from 26 reviews on Google"
      onClick={isStub ? (e) => e.preventDefault() : undefined}
      {...(isStub ? {} : { target: "_blank", rel: "noopener noreferrer" })}
    >
      <span className="hero-badge-score" aria-hidden="true">
        5.0
      </span>
      <span className="hero-badge-meta" aria-hidden="true">
        <span className="hero-badge-stars">
          <Stars />
        </span>
        <span className="hero-badge-text">26 reviews on Google</span>
      </span>
    </a>
  );
}
