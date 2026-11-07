# TMF Electric homepage concept: approved plan

Status: approved by Kyle, ready to build.
Purpose: a homepage concept to win the job. If Taylor says yes, Prylo builds a full 5 page site. The concept must look like the finished homepage of that site. Nothing should read as a stub; skip any section that would be mostly placeholders.

Governing standard: prylo-web-standard. It wins any conflict with other skills.
Read PRODUCT.md for the brief. This file is the plan.

## 1. Playbook and scales

- Playbook 02, quoted local service, tuned for a referral driven business. The visitor is confirming a person, not shortlisting firms.
- One action: get in touch about a job. Button text "Get in touch", scrolls to the form. Call and text always available.
- Leads with: service (the person, then the work as proof).
- Finish: top end of Polished.
- Motion: 2, quiet. One signature moment.
- Depth: lean homepage. Nav shows page one of a 5 page site.

## 2. The one idea

Taylor's work is judged by what he leaves behind: a clean, labelled panel. The homepage borrows the panel directory, so tidy is shown, not claimed. The TMF logo's own device (a thin rectangle outline with a cord and plug at one corner) ties it together.

- Hero photo is framed by a thin rectangular line offset around it, like the logo. A cord line leaves one corner and runs down the page to become the spine of the panel directory.
- Lines are thin and in the text colour, never the accent.

## 3. Format and tech

- Existing Next.js 16 + Tailwind 4 app, App Router. Homepage is app/page.tsx. Not a standalone HTML file.
- Hosted later on a tryprylo subdomain. noindex via metadata robots.
- Fonts via next/font/google.
- All colours and fonts as tokens in one place (Tailwind @theme or CSS variables in globals.css) so the client's pick is a one line swap.
- Images via next/image with proper sizes.
- Footer line: "Homepage concept by Prylo".

## 4. Colour and type

Active palette, Coldstream pine:
- Background #F4F3EE
- Text #171A18
- Tint #DFE4DB
- Accent #2F4A3C (buttons and links only)

Keep these as commented out token sets beside it:
- Okanagan Lake: #F5F7F6, #141A1C, #DCE6E5, #1F5F6B
- Copper wire: #F7F3EC, #1C1917, #EBE3D6, #A0562F
- Work shirt olive: #F6F4EE, #1A1A18, #E6E2D6, #5B6339
- Basalt: #F7F5F2, #161412, #E6E1DB, #4A433D

Type (placeholder until the client picks):
- Headings: Archivo, wide (width 112%)
- Body: Public Sans
- Commented alternates: Fraunces + Figtree; Zilla Slab + Atkinson Hyperlegible

One continuous canvas. At most one tint section. Footer is the only dark section.

## 5. Header

- Desktop: logo, nav (Home, Services, Work, Reviews, About, Contact), phone number set apart.
- Phone: logo, call icon, Menu button. No sticky bottom bar.
- Links: the hero button and Contact scroll to the form; Home goes to the top. All other links go to "#" with default prevented, so a click during the pitch never jumps the page.

## 6. Hero

- Label: "Residential electrician, Vernon and the North Okanagan"
- Headline: "Tidy electrical work, done by Taylor."
- Button: "Get in touch". Beside it: "Call or text 250-306-6936".
- Proof rows, in the same ruled label and value style as the directory, stacked vertically (not a stat strip):
  - Google: 5.0 from 26 reviews
  - Based on: Silver Star Road
  - Running TMF: over three years
- Photo: public/images/hero-taylor-van.jpg, 1440x960 landscape. Taylor just right of centre, van's TMF lettering on the left, soft mountains on the right. Keep Taylor and at least part of the TMF lettering in every crop.
- Desktop: large framed photo at roughly 60% of content width, type on the page background beside it. Not full width, not a background image; the file is only sharp to about 1440 wide.
- Phone: photo first at 4:5, cropped around Taylor with the edge of the TMF lettering, height capped so the button stays above the fold on 375x667.
- Motion: photo fades in, frame line draws once. Nothing delays the headline or button.

## 7. Sections, in order

1. Hero (above).
2. I do the work myself. Statement line "I do the work myself.", a short first person paragraph, one sentence naming the North Okanagan Referral Association. Photo: public/images/taylor-portrait-bw.jpg, kept black and white. If missing, run type only.
3. What I do: the panel directory (the signature section).
   - A central spine (continuing the hero's cord line) with services branching left and right like breakers.
   - Each entry: fine line drawn breaker handle, large label, one plain line of description. The whole row is a link.
   - Order: Hot tub hookups (top left, first on phone), Lighting, Panel upgrades, Small jobs around the home.
   - One quiet row under the spine for commercial work. No retailer names.
   - No amp ratings or circuit numbers.
   - Phone: spine moves to the left edge, one column.
   - Signature moment: handles flip one after another, once, as the section enters view.
   - Descriptions marked as sample copy in a code comment.
4. Recent work: three real photos with short captions.
   - work-panel.jpg (lead), work-lighting-1.jpg (kitchen pendants), work-lighting-2.jpg (exterior lighting at night).
   - Captions describe only the electrical work visible. Never imply he built the kitchen or room.
   - No hot tub photo exists; do not fake one. No full bleed band.
5. Reviews: a large "5.0 from 26 Google reviews", one sentence on what customers mention (on time, tidy, honest, fair price), link to Google. No quotes and no empty quote slot.
6. How it works: three short steps, marked in a code comment as sample copy to confirm. Draft: Get in touch. I take a look and talk it through. The work gets done and the place is left tidy. No reply time, no pricing.
7. Contact and footer: call, text, and the form. Silver Star Road and the concept line in the footer.

Left out on purpose: licence and insurance lines, service area town list, map, FAQ, sticky contact bar, photo upload.

## 8. Contact

- Call: tel:+12503066936. Text: sms:+12503066936 (opens the visitor's own messaging app; no texting service).
- Form fields: job type (Hot tub hookup, Lighting, Panel upgrade, Other), name, phone or email, message. Real labels on every field.
- No backend in the concept. On submit, show a message that this is a preview and nothing was sent.

## 9. Facts and copy rules

- "Licensed" can be used, with no licence number.
- Vernon is confirmed (Silver Star Road). The wider service area is an assumption; do not list towns.
- Do not quote individual reviews.
- First person voice in body copy. The headline is the one third person exception.
- No em dashes, en dashes, AI phrases or filler. Arrows only inside CTA components.

## 10. Logo

No vector exists. Rebuild the TMF mark as an inline SVG from public/images/logo-reference.jpg: bold wide "TMF", small "ELECTRIC", thin rectangle outline with a cord and plug at the corner. Mark it as a stand-in in a code comment.

## 11. Photos (public/images/)

| File | Where |
|---|---|
| hero-taylor-van.jpg | Hero |
| taylor-portrait-bw.jpg | Section 2 |
| work-panel.jpg | Recent work, lead |
| work-lighting-1.jpg | Recent work |
| work-lighting-2.jpg | Recent work |
| logo-reference.jpg | Reference for the SVG logo only |

## 12. Quality bar

- After building, run an /impeccable critique pass and fix what it finds, within this plan.
- Check with Playwright at 375, 768, 1280, 1440, 1920 and 2560 wide: no horizontal scroll, button above the fold on a 375x667 phone, frame line and directory animation read correctly, Taylor and the TMF lettering survive every crop, reduced motion shows the final state, no console errors.
- Search all visible text for em dashes, en dashes and arrows outside CTAs. Fix any.

## 13. Still needed from Taylor if he says yes

Licence and insurance details, start year, confirmed service area and address decision, reply time and real process, review quote approval, original photos and homeowner permission, which work photos show him, logo files.

## 14. Later changes and known exceptions

- Section order, copy, the services list, reviews and the footer were reworked after this plan (see the restructure pass). The one idea (cord and panel directory) was dropped; the breaker icon survives as a static mark on each service card.
- KNOWN EXCEPTION, pending permission: the reviews section names one local business (Beachcomber Marketing, hot tub installs). Permission is needed from Beachcomber Marketing and the client before launch. This otherwise stays a no-business-names site.
- Individual reviews are quoted in the concept, exactly as written. The client must approve them before launch.
- Business name: the site uses TMF Electric. Confirm the registered name with the client.
