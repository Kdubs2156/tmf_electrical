import { Button } from "./Button";
import { Stars } from "./Icons";
import { site } from "@/lib/site";

// TESTIMONIALS NEED CLIENT APPROVAL BEFORE LAUNCH. Quoted exactly as written.
// Do not correct spelling, punctuation or wording.
const testimonials = [
  {
    quote:
      "Taylor did a great job for us today. Arrived on time and offered great advice as he installed a new chandelier for us. Will definitely put him on our first call list.",
    name: "Paul M.",
    job: "Chandelier installation",
  },
  {
    quote:
      "Honest, punctual, knowledgeable and very clean. Would recommend 100% for any electrical work.",
    name: "J. Harty",
    job: "Shop compressor hookup",
  },
  {
    quote:
      "The communication was clear, the workspace was kept clean, and the final result looks fantastic. Everything is working perfectly, and I feel confident in the quality of the work.",
    name: "Choi D.",
    job: "Basement suite",
  },
];

// BEACHCOMBER LINE: this names one local business. It needs permission from
// Beachcomber Marketing AND the client before launch. It is a known exception
// to the no-business-names rule (see PLAN.md). No carousel, no
// aggregateRating schema.

export function Reviews() {
  return (
    <section className="wrap reviews" aria-labelledby="reviews-title">
      <div className="reviews-head">
        <h2 id="reviews-title" className="t-display t-statement">
          What people say once the job&rsquo;s done.
        </h2>
        <div className="reviews-proof">
          <span className="sr-only">Rated 5.0 out of 5 on Google.</span>
          <span className="reviews-score" aria-hidden="true">
            5.0
          </span>
          <span className="reviews-meta">
            <span className="reviews-stars">
              <Stars />
            </span>
            <span>26 reviews on Google</span>
          </span>
          <Button variant="secondary" size="sm" href={site.googleProfile}>
            Read them on Google
          </Button>
        </div>
      </div>

      <div className="review-grid">
        {testimonials.map((t) => (
          <figure key={t.name} className="review-card">
            {/* All three are 5-star Google reviews. Gold stars in every palette. The
                visible label is hidden from screen readers because the hidden text
                already says it. */}
            <div className="review-rating">
              <span className="sr-only">Rated 5 out of 5 on Google</span>
              <span className="review-stars" aria-hidden="true">
                <Stars />
              </span>
              <span className="review-source" aria-hidden="true">
                Google review
              </span>
            </div>
            <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption>
              <b>{t.name}</b>
              <span>{t.job}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <figure className="reviews-local">
        <p className="reviews-local-label">From a local business</p>
        <blockquote>
          &ldquo;We choose TMF for all of our hot tub installs.&rdquo;
        </blockquote>
        <figcaption>Beachcomber Marketing</figcaption>
      </figure>
    </section>
  );
}
