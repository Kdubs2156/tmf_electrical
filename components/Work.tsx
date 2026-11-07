import Image from "next/image";

// BEFORE LAUNCH, with the client:
//  - HOMEOWNER PERMISSION is needed for every interior work photo below. The
//    chandelier shot also includes someone else's artwork on the wall.
//  - CONFIRM all four photos are Taylor's own jobs.
// Captions describe only the electrical work visible. Never imply he built the
// kitchen or the room. There is no hot tub photo, so none is shown.
// work-panel.jpg and work-lighting-1.jpg stay in public/images but are not used here.
const photos = [
  {
    src: "/images/work-pendants-brass.jpg",
    alt: "Two brass pendant lights hanging over a kitchen island",
    caption: "Pendant lighting over a kitchen island",
    pos: "50% 12%",
    sizes: "(min-width: 48rem) 54vw, 100vw",
    cls: "work-fig--lead",
  },
  {
    src: "/images/work-chandelier.jpg",
    alt: "A large white chandelier with candle-style bulbs under a sloped ceiling",
    caption: "Chandelier installation",
    pos: "50% 0%",
    sizes: "(min-width: 48rem) 40vw, 100vw",
    cls: "work-fig--wide",
  },
  {
    src: "/images/work-shelf-led.jpg",
    alt: "Floating corner shelves with a strip of LED light under each shelf",
    caption: "LED lighting under the floating shelves",
    pos: "50% 8%",
    sizes: "(min-width: 48rem) 20vw, 50vw",
    cls: "work-fig--small",
  },
  {
    src: "/images/work-lighting-2.jpg",
    alt: "A house at night with exterior lights washing down its walls",
    caption: "Exterior lighting at night",
    sizes: "(min-width: 48rem) 20vw, 50vw",
    cls: "work-fig--small",
  },
];

export function Work() {
  return (
    <section className="wrap work" aria-labelledby="work-title">
      <h2 id="work-title" className="t-display t-statement">
        Recent work
      </h2>
      <div className="work-grid">
        {photos.map((p) => (
          <figure key={p.src} className={`work-fig ${p.cls}`}>
            <div className="work-img">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes={p.sizes}
                style={{ objectPosition: p.pos }}
                loading="lazy"
              />
            </div>
            <figcaption className="work-cap t-caption">{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
