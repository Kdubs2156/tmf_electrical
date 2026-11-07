import { PhoneContact } from "./PhoneContact";
import { ContactForm } from "./ContactForm";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="wrap contact" aria-labelledby="contact-title">
      <div className="contact-grid">
        <div>
          <h2 id="contact-title" className="t-display t-statement">
            <span className="heading-break">Got a job in mind?</span>{" "}
            <span>Tell me about it.</span>
          </h2>
          <p className="prose section-intro">
            Big or small, a few lines is plenty. I&rsquo;ll get back to you and
            we&rsquo;ll find a time that works.
          </p>
          <p className="prose section-intro">
            Not sure what the job involves? That&rsquo;s fine. Tell me what
            you&rsquo;re seeing and we&rsquo;ll go from there.
          </p>
          <div className="contact-phone">
            <span className="contact-callout">Call or text</span>
            <PhoneContact actions />
            {/* Only where a click or tap copies the number. Phones call instead. */}
            <p className="contact-hint">
              <span className="hint-click">Click the number to copy it</span>
              <span className="hint-tap">Tap the number to copy it</span>
            </p>
          </div>
          <p className="contact-hours">{site.hours}</p>
        </div>
        <div id="enquiry" className="form-card">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
