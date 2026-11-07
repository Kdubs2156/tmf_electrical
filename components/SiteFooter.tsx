import { FacebookIcon, InstagramIcon } from "./Icons";
import { Logo } from "./Logo";
import { PhoneContact } from "./PhoneContact";
import { StubLink } from "./StubLink";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer on-dark">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <span className="footer-logo">
              <Logo />
            </span>
            <p className="footer-line">
              Licensed electrician serving Vernon and the North Okanagan.
            </p>
            <p className="footer-member">
              Member, North Okanagan Referral Association
            </p>
          </div>

          <div>
            <p className="footer-label">Contact</p>
            <ul className="footer-list">
              <li>
                <a href={site.mapsRoad} target="_blank" rel="noopener noreferrer">
                  {site.road}, {site.place}
                </a>
              </li>
              <li>
                <PhoneContact />
              </li>
              <li>
                <a className="footer-email" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
              <li>{site.hours}</li>
            </ul>
          </div>

          <nav aria-label="Footer">
            <p className="footer-label">Explore</p>
            <ul className="footer-list footer-list--tight">
              {nav.map((item) => (
                <li key={item.label}>
                  {item.kind === "stub" ? (
                    <StubLink>{item.label}</StubLink>
                  ) : (
                    <a href={item.href}>{item.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="footer-label">Follow</p>
            <ul className="footer-list">
              <li>
                <a
                  className="footer-social"
                  href={site.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TMF Electric on Facebook (opens in a new tab)"
                >
                  <FacebookIcon />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  className="footer-social"
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TMF Electric on Instagram (opens in a new tab)"
                >
                  <InstagramIcon />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2026 TMF Electric</span>
          <span>Homepage concept by Prylo</span>
        </div>
      </div>
    </footer>
  );
}
