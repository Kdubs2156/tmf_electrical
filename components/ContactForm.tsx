"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "./Button";
import { site } from "@/lib/site";

// CONFIRM WITH CLIENT BEFORE LAUNCH. Matches the six services on the page, plus Other.
const jobTypes = [
  "Repairs and service calls",
  "Lighting and fixtures",
  "Kitchens and renovations",
  "Panel and service upgrades",
  "Basement suites and older homes",
  "Shops, hot tubs and outbuildings",
  "Other",
];

// Concept only: there is no backend. Submitting shows a preview notice.
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <form className="grid gap-5" onSubmit={onSubmit} aria-label="Enquiry form">
      <div className="field">
        <label htmlFor="job">Job type</label>
        <select id="job" name="job" className="control" defaultValue="" required>
          <option value="" disabled>
            Choose one
          </option>
          {jobTypes.map((j) => (
            <option key={j} value={j}>
              {j}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" className="control" type="text" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="reach">Phone or email</label>
        <input id="reach" name="reach" className="control" type="text" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" className="control" rows={5} />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit">Send message</Button>
      </div>
      <div role="status" aria-live="polite">
        {sent && (
          <p className="form-note">
            This is a homepage preview, so nothing was sent. To reach Taylor now,
            call or text{" "}
            <a className="link" href={site.tel}>
              {site.phoneDisplay}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
