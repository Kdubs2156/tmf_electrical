// STAND-IN. No vector of the TMF logo exists yet. This is rebuilt by eye from
// public/images/logo-reference.jpg: bold wide TMF, small ELECTRIC, a thin
// rectangle outline made of one cord that ends in a bulb and a plug.
// Replace with the client's vector file when it arrives.
export function Logo({ title = "TMF Electric" }: { title?: string }) {
  return (
    <svg
      viewBox="0 0 604 316"
      role="img"
      aria-label={title}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* cord: plug, along the bottom, up the left, across the top, down to the bulb */}
      <path
        d="M499 310H5V6H599V224"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinejoin="miter"
      />
      {/* bulb */}
      <rect x="591" y="222" width="16" height="9" />
      <circle cx="599" cy="250" r="18" />
      {/* plug */}
      <rect x="499" y="300" width="23" height="20" rx="2" />
      <rect x="522" y="303" width="14" height="4.5" />
      <rect x="522" y="313" width="14" height="4.5" />
      {/* TMF */}
      <path d="M105 108H210V136H171.5V196H143.5V136H105Z" />
      <path d="M225 196V108H258L296 156L334 108H367V196H339V150L312 186H280L253 150V196Z" />
      <path d="M394 108H488V134H422V143H478V166H422V196H394Z" />
      {/* bar and ELECTRIC */}
      <rect x="105" y="223" width="219" height="18" />
      <text
        x="338"
        y="240"
        fontSize="19"
        fontWeight="500"
        textLength="148"
        lengthAdjust="spacing"
        style={{ fontFamily: "var(--font-body)" }}
      >
        ELECTRIC
      </text>
    </svg>
  );
}
