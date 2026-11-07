import Image from "next/image";
import { site, yearsText } from "@/lib/site";

export function Story() {
  return (
    <div className="wrap story">
      <section className="story-panel" aria-labelledby="story-title">
        <div className="story-media">
          <div className="story-card">
            {/*
              CONFIRM WITH THE CLIENT that this portrait is Taylor. Kyle has not
              confirmed it yet (it may show a different person from the hero
              photo). Do not show this to the client until that is confirmed.
            */}
            <Image
              src="/images/taylor-portrait-bw.jpg"
              alt="Taylor in a TMF Electric hoodie, with the TMF Electric van and the lake behind him, in black and white"
              fill
              /* The landscape photo is cover-cropped into a portrait card, so it is
                 drawn about 1.5x the card height wide: about 790px on desktop,
                 and 440 to 630px on a phone. Describing the card (420px) made the optimizer
                 serve a file that was then stretched, which looked soft. */
              sizes="(min-width: 64rem) 800px, min(630px, calc(1.46 * (100vw - 88px)))"
              quality={85}
            />
          </div>
          <div className="story-site">
            {/*
              CONFIRM WITH THE CLIENT that this is Taylor (his face is not
              visible, so it cannot settle the portrait question) and that the
              homeowner is happy for this job site photo to be used.
            */}
            <Image
              src="/images/taylor-on-site.jpg"
              alt="Taylor in a TMF Electric shirt, fitting an outlet at a kitchen counter"
              fill
              /* Zoomed in 1.55x inside a 220px card, so it needs about 340px of image. */
              sizes="(min-width: 64rem) 350px, 260px"
              quality={85}
            />
          </div>
        </div>
        <div className="story-text">
          <h2 id="story-title" className="t-display t-statement">
            I do the work myself.
          </h2>
          <div className="prose section-intro">
            <p>
              When you call TMF Electric, you&rsquo;re talking directly to me.
              I&rsquo;ll take the time to understand the job, walk you through
              your options and do the work myself, start to finish.
            </p>
            {/* Years come from lib/site.ts (yearsInTrade is a PLACEHOLDER). */}
            <p>
              I&rsquo;ve worked as an electrician for{" "}
              {yearsText(site.yearsInTrade)} and have been running TMF Electric
              for the past three years. Most of my work comes through word of
              mouth, and I&rsquo;m proud of that.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
