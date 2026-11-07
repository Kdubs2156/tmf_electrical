export function PhoneIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

// Arrows live inside CTA components only.
export function ArrowDown({ size = 18 }: { size?: number }) {
  return (
    <svg
      className="arrow"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d="M12 4v15M6 13l6 6 6-6" />
    </svg>
  );
}

// Five stars, coloured by the parent (gold, via --star-gold). Decorative: the rating is always stated in text beside them.
export function Stars() {
  return (
    <svg viewBox="0 0 90 16" fill="currentColor" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          transform={`translate(${i * 18.5} 0)`}
          d="M8 .8l2.2 4.7 5.1.7-3.7 3.6.9 5.1L8 12.4l-4.5 2.5.9-5.1L.7 6.2l5.1-.7z"
        />
      ))}
    </svg>
  );
}

// Outline social icons for the footer. Monochrome, same 17px box as each other.
export function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <path
        d="M13.4 20.5v-6.2h2l.35-2.45H13.4V10.3c0-.7.25-1.15 1.2-1.15h1.25V7c-.25 0-1-.1-1.8-.1-1.8 0-3 1.1-3 3.1v1.85H9v2.45h2.05v6.2Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}
