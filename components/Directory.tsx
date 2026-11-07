import type { ReactNode } from "react";
import { StubLink } from "./StubLink";

// CONFIRM WITH CLIENT BEFORE LAUNCH: every service label, description, the
// intro line and the business row below are drafts. Taylor approves the wording.

// One hand-drawn icon set: 24px grid, 1.5px stroke, round caps and joins, no fill,
// no background shape. Never mix in icons from another style.
// Decorative only (aria-hidden): the card title carries the meaning.
const icons: Record<string, ReactNode> = {
  // wall outlet
  outlet: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      {/* a short and a tall slot, then the round ground hole, like a real outlet */}
      <path d="M9.25 8.25v2.5M14.75 7.75v3.5" />
      <circle cx="12" cy="15.5" r="1.25" />
    </>
  ),
  // light bulb
  bulb: (
    <>
      <path d="M12 3.5a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3.5Z" />
      <path d="M9.75 19h4.5M10.75 21.25h2.5" />
    </>
  ),
  // floor plan
  plan: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
      <path d="M10 3.5V10.5M10 13.5h10.5M15.25 13.5v7" />
    </>
  ),
  // breaker panel
  panel: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M12 3v18M8 7h1.5M8 11h1.5M8 15h1.5M14.5 7H16M14.5 11H16M14.5 15H16" />
    </>
  ),
  // house with a basement line
  house: (
    <>
      <path d="M3.5 11 12 4l8.5 7" />
      <path d="M5.5 9.5v11h13v-11" />
      <path d="M5.5 15h13" />
      <path d="M10.5 20.5V18h3v2.5" />
    </>
  ),
  // garage or shop building
  garage: (
    <>
      <path d="M3.5 9.5 12 4l8.5 5.5v11h-17Z" />
      <path d="M7.5 20.5v-8h9v8" />
      <path d="M7.5 15.25h9M7.5 17.875h9" />
    </>
  ),
};

const services = [
  {
    label: "Repairs and service calls",
    desc: "An outlet that quit or a breaker that keeps tripping. I’ll find the cause and fix it for good.",
    icon: "outlet",
  },
  {
    label: "Lighting and fixtures",
    desc: "New fixtures, pot lights and old ceiling fans swapped for LED.",
    icon: "bulb",
  },
  {
    label: "Kitchens and renovations",
    desc: "I’ll help plan the layout with you, then wire it so everything looks clean when the walls close up.",
    icon: "plan",
  },
  {
    label: "Panel and service upgrades",
    desc: "Updating an older panel or adding capacity. I’ll explain what’s needed before any work starts.",
    icon: "panel",
  },
  {
    label: "Basement suites and older homes",
    desc: "Suites wired to code, and older homes brought up to date safely.",
    icon: "house",
  },
  {
    label: "Shops, hot tubs and outbuildings",
    desc: "Hot tub hookups, compressors and power out to the shop or garage.",
    icon: "garage",
  },
];

function Icon({ name }: { name: string }) {
  return (
    <svg
      className="svc-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {icons[name]}
    </svg>
  );
}

export function Directory() {
  return (
    <section className="wrap services" id="services" aria-labelledby="services-title">
      <h2 id="services-title" className="t-display t-statement">
        What I do
      </h2>
      <p className="section-intro">If it&rsquo;s electrical, it&rsquo;s worth a call.</p>
      <ul className="svc-grid">
        {services.map((s) => (
          <li key={s.label}>
            <StubLink className="svc">
              <Icon name={s.icon} />
              <span className="svc-label">{s.label}</span>
              <span className="svc-desc">{s.desc}</span>
            </StubLink>
          </li>
        ))}
      </ul>
      <a className="commercial" href="#enquiry">
        I also work with local businesses. Get in touch about yours.
      </a>
    </section>
  );
}
