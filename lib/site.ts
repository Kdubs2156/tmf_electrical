// Single source for facts used in more than one place.
export const site = {
  // PENDING: confirm the registered business name with the client (TMF Electric
  // vs TMF Electrical). The logo and this site use "TMF Electric".
  name: "TMF Electric",
  phoneDisplay: "250-306-6936",
  tel: "tel:+12503066936",
  sms: "sms:+12503066936",
  email: "tmfelectricalservices@gmail.com",
  hours: "Mon to Sat, 7am to 5pm",
  facebook: "https://www.facebook.com/profile.php?id=100089536520985",
  instagram: "https://www.instagram.com/tmf.electric/",
  // PLACEHOLDER: years in the trade is NOT confirmed. Kyle will confirm the real
  // figure with the client. Change it here and every place it appears updates
  // (trust bar fact 3 and the About paragraph).
  yearsInTrade: 10,
  // How long Taylor has run TMF. "Over three years" is the confirmed wording.
  tmfRunning: "over three years",
  // Road name only. No full street address on the site.
  road: "Silver Star Road",
  place: "Vernon, BC",
  // PLACEHOLDER: Kyle to supply the real Google Business Profile link.
  // "#" keeps the hero rating badge and the reviews button inert until then.
  googleProfile: "#",
  mapsRoad:
    "https://www.google.com/maps/search/?api=1&query=Silver+Star+Road+Vernon+BC",
} as const;

// "10 years", "1 year". Keeps a changed placeholder from printing "1 years".
export function yearsText(n: number): string {
  return `${n} ${n === 1 ? "year" : "years"}`;
}

export type NavItem =
  | { label: string; kind: "top"; href: string }
  | { label: string; kind: "form"; href: string }
  | { label: string; kind: "stub"; href: "#" };

// Home goes to the top, Contact scrolls to the form. Everything else is a
// dead "#" link for the pitch, with default prevented so the page never jumps.
export const nav: NavItem[] = [
  { label: "Home", kind: "top", href: "#top" },
  { label: "Services", kind: "stub", href: "#" },
  { label: "Work", kind: "stub", href: "#" },
  { label: "Reviews", kind: "stub", href: "#" },
  { label: "About", kind: "stub", href: "#" },
  { label: "Contact", kind: "form", href: "#enquiry" },
];
