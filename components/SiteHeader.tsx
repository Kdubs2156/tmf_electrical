"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { PhoneIcon } from "./Icons";
import { PhoneContact } from "./PhoneContact";
import { nav, site } from "@/lib/site";
import type { NavItem } from "@/lib/site";

function stop(e: MouseEvent) {
  e.preventDefault();
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const drawer = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkProps = (item: NavItem, closeDrawer = false) => ({
    href: item.href,
    onClick: (e: MouseEvent) => {
      if (item.kind === "stub") stop(e);
      if (closeDrawer) drawer.current?.close();
    },
    "aria-current": item.kind === "top" ? ("page" as const) : undefined,
  });

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="wrap header-inner">
        <a className="logo-link" href="#top" aria-label="TMF Electric, back to top">
          <Logo />
        </a>

        <nav className="nav-links" aria-label="Main">
          {nav.map((item) => (
            <a key={item.label} className="nav-link" {...linkProps(item)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <PhoneContact className="pc--header" />
          <Button size="sm" href="#enquiry" className="header-cta">
            Get in touch
          </Button>
        </div>

        <div className="header-mobile">
          {/* Tablets cannot reliably place calls: number and Copy from 700px. */}
          <PhoneContact className="pc--header-mobile" />
          <a className="icon-btn icon-btn-call" href={site.tel} aria-label={`Call ${site.phoneDisplay}`}>
            <PhoneIcon />
          </a>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => drawer.current?.showModal()}
            aria-haspopup="dialog"
          >
            Menu
          </Button>
        </div>
      </div>

      <dialog
        ref={drawer}
        className="drawer"
        aria-label="Menu"
        onClick={(e) => {
          // click on the backdrop closes it
          if (e.target === drawer.current) drawer.current?.close();
        }}
      >
        <div className="drawer-body">
          <div className="flex items-center justify-between">
            <span className="logo-link">
              <Logo />
            </span>
            <Button variant="secondary" size="sm" onClick={() => drawer.current?.close()}>
              Close
            </Button>
          </div>
          <ul className="drawer-links mt-6 list-none p-0">
            {nav.map((item) => (
              <li key={item.label}>
                <a {...linkProps(item, true)}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8">
            <PhoneContact actions label="Call or text" />
          </div>
        </div>
      </dialog>
    </header>
  );
}
