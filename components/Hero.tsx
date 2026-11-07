import Image from "next/image";
import { Button } from "./Button";
import { GoogleBadge } from "./GoogleBadge";
import { PhoneContact } from "./PhoneContact";
import { site, yearsText } from "@/lib/site";

// Fixed four-line headline. The lines never rewrap, so the reveal needs no
// measuring and nothing shifts. Screen readers get the one full sentence.
const headline = "Your first call for electrical work in Vernon.";
const lines = ["Your first call", "for electrical", "work in", "Vernon."];

// Trust bar. Four short facts, no icons.
// PLACEHOLDERS, do not invent values:
//  - Licence: the licence number is still to confirm. Until then the second
//    line shows the town, so nothing on the page reads as a stub.
//  - Years: both lines come from lib/site.ts (yearsInTrade is a PLACEHOLDER,
//    tmfRunning is "over three years"). Change the config, not this file.
//  - Commercial: "Commercial experience / National retail sites" is PENDING
//    CLIENT APPROVAL. No retailer names.
const facts = [
  { strong: "North Okanagan Referral Association", muted: "Member" },
  { strong: "Licensed electrician", muted: "Vernon, BC" },
  { strong: `${yearsText(site.yearsInTrade)} in the trade`, muted: `Running TMF for ${site.tmfRunning}` },
  { strong: "Commercial experience", muted: "National retail sites" },
];

type Cssvars = React.CSSProperties & Record<`--${string}`, string | number>;

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-main">
        <div className="hero-media">
          <div className="hero-photo">
            <div className="hero-img-wrap">
              <Image
                className="hero-img"
                src="/images/hero-taylor-wide.jpg"
                alt="Taylor, smiling in a black TMF Electric jacket, standing beside the TMF Electric van with soft hills behind him"
                fill
                preload
                fetchPriority="high"
                quality={85}
                sizes="(min-width: 1200px) max(100vw, 1560px), (min-width: 640px) 100vw, 175vw"
              />
            </div>
          </div>
          <div className="hero-scrim" aria-hidden="true" />
        </div>

        <div className="hero-copy">
          <p
            className="t-label hero-label hero-rise"
            style={{ "--d": "300ms" } as Cssvars}
          >
            Licensed electrician, Vernon, BC
          </p>

          <h1 id="hero-title" className="hero-title">
            <span className="sr-only">{headline}</span>
            {lines.map((line, i) => (
              <span
                key={line}
                className="hero-line"
                aria-hidden="true"
                style={{ "--i": i } as Cssvars}
              >
                <span>{line}</span>
              </span>
            ))}
          </h1>

          <p
            className="hero-lede hero-rise"
            style={{ "--d": "360ms" } as Cssvars}
          >
            I&rsquo;m Taylor. From a quick repair to a full renovation, you get
            straight advice and careful work, and I leave the place clean.
          </p>

          <div
            className="hero-actions hero-rise"
            style={{ "--d": "420ms" } as Cssvars}
          >
            <Button href="#enquiry" arrow>
              Get in touch
            </Button>
            <PhoneContact className="pc--hero" actions label="Call or text" />
          </div>

          {/* The rating badge sits last in the copy column so CSS can put it under
              the buttons on mid-size desktops. It is placed elsewhere at other widths. */}
          <GoogleBadge href={site.googleProfile} />
        </div>
      </div>

      <div className="wrap hero-bar">
        <ul className="hero-facts">
          {facts.map((f, i) => (
            <li
              key={f.strong}
              className="hero-fact"
              style={{ "--i": i } as Cssvars}
            >
              <b>{f.strong}</b>
              <span>{f.muted}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
