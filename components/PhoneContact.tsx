"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Button } from "./Button";
import { site } from "@/lib/site";

// The one phone component (header, hero, contact, footer).
// We cannot know whether a device can place calls (tablets and touchscreen
// laptops usually cannot), so the number is always readable text.
//  - Phones, defined as (max-width: 699px) AND (pointer: coarse): the number is a
//    normal tap-to-call link, and full Call and Text buttons show beside it.
//  - Everything else: clicking the number copies it and a small "Copied" bubble
//    appears for about two seconds.
// The Call and Text button layout rule lives in globals.css (portrait phones only).
// PHONE_QUERY below decides tap-to-call versus copy, and also covers phones held sideways.

// A phone held sideways (short and touch) is still a phone, so tapping the number calls.
const PHONE_QUERY =
  "(pointer: coarse) and (max-width: 699px), (pointer: coarse) and (max-height: 500px)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(PHONE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  // Fallback for non-HTTPS pages and older browsers.
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

export function PhoneContact({
  label,
  actions = false,
  className = "",
}: {
  /** Words before the number, such as "Call or text". Hidden on phones that show Call and Text buttons. */
  label?: string;
  /** Include the phone-only Call and Text buttons. */
  actions?: boolean;
  className?: string;
}) {
  const isPhone = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(PHONE_QUERY).matches,
    () => false,
  );
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const num = useRef<HTMLAnchorElement>(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (isPhone) return; // phones: let the tel: link place the call
    e.preventDefault();
    const ok = await copyText(site.phoneDisplay);
    if (ok) {
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } else if (num.current) {
      // Copying is blocked: select the number so the person can copy it themselves.
      window.getSelection()?.selectAllChildren(num.current);
    }
  }

  return (
    <div className={`pc ${className}`.trim()}>
      {actions && (
        <div className="pc-actions">
          <Button variant="secondary" href={site.tel}>
            Call
          </Button>
          <Button variant="secondary" href={site.sms}>
            Text
          </Button>
        </div>
      )}
      <p className="pc-line">
        {label && <span className="pc-label">{label}</span>}
        <span className="pc-numwrap">
          <a
            ref={num}
            className="pc-num"
            href={site.tel}
            onClick={onClick}
            title={isPhone ? undefined : "Click to copy"}
            aria-label={
              isPhone
                ? `Call ${site.phoneDisplay}`
                : `${site.phoneDisplay}, click to copy`
            }
          >
            {site.phoneDisplay}
          </a>
          <span className="pc-bubble" data-show={copied} role="status" aria-live="polite">
            {copied ? "Copied" : ""}
          </span>
        </span>
      </p>
    </div>
  );
}
