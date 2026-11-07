"use client";

// TEMPORARY concept tool. Remove before launch.
//
// What it does: lets a client try the shortlisted colour and type options on
// the live concept by swapping CSS custom properties on <html>.
//
// TO REMOVE (3 steps, nothing else in the site depends on this file):
//   1. Delete this file (components/StyleSwitcher.tsx).
//   2. In app/layout.tsx delete the import line and the
//      {process.env.NEXT_PUBLIC_STYLE_SWITCHER === "true" && <StyleSwitcher />} line.
//   3. Delete NEXT_PUBLIC_STYLE_SWITCHER from .env.local and the host's env settings.
// suppressHydrationWarning on <html> in layout.tsx can stay (harmless) or go.
// The hero size tokens (--hero-*) and --on-accent in globals.css have Archivo /
// Coldstream pine defaults and are meant to stay.
//
// State: ?palette=pine&type=a in the URL (wins), then localStorage, then defaults.

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Atkinson_Hyperlegible,
  Figtree,
  Fraunces,
  Zilla_Slab,
} from "next/font/google";
import { display as archivo } from "@/app/fonts";

// The three pairings are loaded through next/font here (not preloaded; they are
// warmed after mount so switching does not flash). Zilla Slab and Atkinson have
// real 400 and 700 files only, so nothing is synthesised: headings use 700.
const fraunces = Fraunces({ subsets: ["latin"], axes: ["opsz"], weight: "variable", display: "swap", preload: false });
const figtree = Figtree({ subsets: ["latin"], weight: "variable", display: "swap", preload: false });
const zilla = Zilla_Slab({ subsets: ["latin"], weight: ["400", "700"], display: "swap", preload: false });
const atkinson = Atkinson_Hyperlegible({ subsets: ["latin"], weight: ["400", "700"], display: "swap", preload: false });

type Palette = { id: string; name: string; bg: string; ink: string; tint: string; accent: string; on: string };

const PALETTES: Palette[] = [
  { id: "lake", name: "Okanagan Lake", bg: "#F5F7F6", ink: "#141A1C", tint: "#DCE6E5", accent: "#1F5F6B", on: "#F5F7F6" },
  { id: "pine", name: "Coldstream pine", bg: "#F4F3EE", ink: "#171A18", tint: "#DFE4DB", accent: "#2F4A3C", on: "#F4F3EE" },
  // Copper takes white button text: page-colour text on this accent misses AA.
  { id: "copper", name: "Copper wire", bg: "#F7F3EC", ink: "#1C1917", tint: "#EBE3D6", accent: "#A0562F", on: "#FFFFFF" },
  { id: "olive", name: "Work shirt olive", bg: "#F6F4EE", ink: "#1A1A18", tint: "#E6E2D6", accent: "#5B6339", on: "#F6F4EE" },
  { id: "basalt", name: "Basalt", bg: "#F7F5F2", ink: "#161412", tint: "#E6E1DB", accent: "#4A433D", on: "#F7F5F2" },
];

// Hero headline tokens per pairing. The headline is four fixed lines, so these
// are sized from the widest line ("for electrical" / "Your first call") so it
// can never overflow. `extra` is a bigger height allowance for the taller faces.
type Hero = { weight: number; wdth: number; em: number; max: string; lh: number; track: string; extra: string };
type TypeSet = { id: string; name: string; display: string | null; body: string | null; wdth: number; hero: Hero };

const TYPES: TypeSet[] = [
  {
    id: "a", name: "Van lettering", display: null, body: null, wdth: 112,
    hero: { weight: 800, wdth: 118, em: 7.38, max: "5.75rem", lh: 0.93, track: "-0.02em", extra: "0rem" },
  },
  {
    id: "b", name: "Good neighbour", display: fraunces.style.fontFamily, body: figtree.style.fontFamily, wdth: 100,
    hero: { weight: 700, wdth: 100, em: 5.6, max: "6.25rem", lh: 1, track: "-0.015em", extra: "1.5rem" },
  },
  {
    id: "c", name: "Workshop sign", display: zilla.style.fontFamily, body: atkinson.style.fontFamily, wdth: 100,
    hero: { weight: 700, wdth: 100, em: 6, max: "6rem", lh: 0.98, track: "-0.01em", extra: "1.5rem" },
  },
];

const KEY = "tmf-style";
const palettePick = (id: string | null | undefined) => PALETTES.find((p) => p.id === id);
const typePick = (id: string | null | undefined) => TYPES.find((t) => t.id === id);

function apply(paletteId: string, typeId: string) {
  const s = document.documentElement.style;
  const p = palettePick(paletteId) ?? PALETTES[1];
  const t = typePick(typeId) ?? TYPES[0];
  s.setProperty("--bg", p.bg);
  s.setProperty("--ink", p.ink);
  s.setProperty("--tint", p.tint);
  s.setProperty("--accent", p.accent);
  s.setProperty("--on-accent", p.on);
  if (t.display && t.body) {
    s.setProperty("--font-display-loaded", t.display);
    s.setProperty("--font-body-loaded", t.body);
  } else {
    s.removeProperty("--font-display-loaded");
    s.removeProperty("--font-body-loaded");
  }
  s.setProperty("--display-wdth", String(t.wdth));
  s.setProperty("--hero-weight", String(t.hero.weight));
  s.setProperty("--hero-wdth", String(t.hero.wdth));
  s.setProperty("--hero-em", String(t.hero.em));
  s.setProperty("--hero-max", t.hero.max);
  s.setProperty("--hero-lh", String(t.hero.lh));
  s.setProperty("--hero-track", t.hero.track);
  s.setProperty("--hero-rest-extra", t.hero.extra);
}

function readInitial(): { palette: string; type: string } {
  let stored: { palette?: string; type?: string } | null = null;
  try {
    stored = JSON.parse(localStorage.getItem(KEY) || "null");
  } catch {
    stored = null;
  }
  const q = new URLSearchParams(window.location.search);
  const palette = palettePick(q.get("palette"))?.id ?? palettePick(stored?.palette)?.id ?? "pine";
  const type = typePick(q.get("type"))?.id ?? typePick(stored?.type)?.id ?? "a";
  return { palette, type };
}

// Runs before first paint (it sits at the top of <body>) so a shared link does
// not flash the default colours. Fonts follow once the component mounts.
const BOOT = `(function(){try{var P=${JSON.stringify(PALETTES)},T=${JSON.stringify(
  TYPES.map((t) => ({ id: t.id, wdth: t.wdth, hero: t.hero })),
)};var q=new URLSearchParams(location.search),st=null;try{st=JSON.parse(localStorage.getItem("${KEY}")||"null")}catch(e){}
function f(a,i){for(var k=0;k<a.length;k++)if(a[k].id===i)return a[k]}
var p=f(P,q.get("palette"))||f(P,st&&st.palette)||f(P,"pine"),t=f(T,q.get("type"))||f(T,st&&st.type)||f(T,"a"),s=document.documentElement.style,h=t.hero;
s.setProperty("--bg",p.bg);s.setProperty("--ink",p.ink);s.setProperty("--tint",p.tint);s.setProperty("--accent",p.accent);s.setProperty("--on-accent",p.on);
s.setProperty("--display-wdth",String(t.wdth));s.setProperty("--hero-weight",String(h.weight));s.setProperty("--hero-wdth",String(h.wdth));s.setProperty("--hero-em",String(h.em));s.setProperty("--hero-max",h.max);s.setProperty("--hero-lh",String(h.lh));s.setProperty("--hero-track",h.track);s.setProperty("--hero-rest-extra",h.extra)}catch(e){}})();`;

const CSS = `
.sw-trigger{position:fixed;z-index:45;top:calc(var(--header-h) + .75rem);right:.75rem;display:grid;place-items:center;width:40px;height:40px;padding:0;border-radius:50%;background:var(--paper);color:var(--ink);border:1px solid var(--rule);box-shadow:var(--shadow-card);cursor:pointer}
.sw-trigger:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
.sw-panel{position:fixed;z-index:45;top:calc(var(--header-h) + 3.5rem);left:0;width:17.5rem;max-height:calc(100dvh - var(--header-h) - 4.5rem);overflow:auto;padding:.875rem .75rem 1rem;background:var(--paper);color:var(--ink);border:1px solid var(--rule);border-left:0;border-radius:0 var(--radius-card) var(--radius-card) 0;box-shadow:var(--shadow-card);font-size:.9375rem;line-height:1.3}
.sw-group{margin:0 0 .75rem}
.sw-group:last-of-type{margin-bottom:0}
.sw-label{margin:0 0 .25rem .5rem;font-size:.75rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-soft)}
.sw-list{display:grid;gap:.125rem}
.sw-opt{display:flex;align-items:center;gap:.625rem;width:100%;min-height:2.5rem;padding:0 .5rem;border:0;border-radius:8px;background:transparent;color:inherit;font:inherit;text-align:left;cursor:pointer}
.sw-opt:hover{background:color-mix(in srgb,var(--tint) 55%,transparent)}
.sw-opt[aria-pressed="true"]{background:var(--tint)}
.sw-opt:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
.sw-chip{display:flex;flex:none;overflow:hidden;border:1px solid var(--rule);border-radius:5px}
.sw-chip i{display:block;width:.8rem;height:1.1rem}
.sw-done{display:none}
@media (prefers-reduced-motion:no-preference){.sw-panel{animation:sw-in 160ms var(--ease) both}}
@keyframes sw-in{from{opacity:0;transform:translateX(-10px)}}
@media (max-width:39.99rem){
 .sw-panel{top:auto;bottom:0;left:0;right:0;width:auto;max-height:none;padding:.5rem .75rem calc(.75rem + env(safe-area-inset-bottom));border:1px solid var(--rule);border-bottom:0;border-radius:var(--radius-card) var(--radius-card) 0 0}
 .sw-head{display:flex;align-items:center;justify-content:space-between;margin:0 0 .25rem .5rem;font-weight:600}
 .sw-done{display:inline-flex;align-items:center;min-height:2.5rem;padding:0 .75rem;border:0;background:transparent;color:inherit;font:inherit;font-weight:600;cursor:pointer}
 .sw-group{margin-bottom:.375rem}
 .sw-list{display:flex;gap:.5rem;overflow-x:auto;padding-bottom:.25rem;scrollbar-width:thin}
 .sw-opt{flex:none;width:auto;min-height:2.75rem;padding:0 .75rem;border:1px solid var(--rule);border-radius:10px;white-space:nowrap}
}
@media (min-width:40rem){.sw-head{display:none}}
@keyframes sw-up{from{opacity:0;transform:translateY(12px)}}
@media (max-width:39.99rem) and (prefers-reduced-motion:no-preference){.sw-panel{animation:sw-up 160ms var(--ease) both}}
`;

export function StyleSwitcher() {
  const [open, setOpen] = useState(false);
  // Read lazily on the client. Nothing rendered before the panel opens depends on
  // these, so there is no hydration mismatch.
  const [palette, setPalette] = useState(() => (typeof window === "undefined" ? "pine" : readInitial().palette));
  const [type, setType] = useState(() => (typeof window === "undefined" ? "a" : readInitial().type));
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Apply the saved or shared choice (fonts included), then warm the alternates.
  useEffect(() => {
    const init = readInitial();
    apply(init.palette, init.type);
    const warm = () => {
      for (const t of TYPES) {
        if (!t.display || !t.body) continue;
        for (const stack of [t.display, t.body]) {
          for (const w of [400, 700]) document.fonts.load(`${w} 1em ${stack}`).catch(() => {});
        }
      }
    };
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    if (idle) idle(warm);
    else window.setTimeout(warm, 600);
  }, []);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) trigger.current?.focus();
  }, []);

  // Escape and outside click close it. Focus goes back to the trigger.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (panel.current?.contains(target) || trigger.current?.contains(target)) return;
      close(panel.current?.contains(document.activeElement) ?? false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    panel.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open, close]);

  function choose(nextPalette: string, nextType: string) {
    setPalette(nextPalette);
    setType(nextType);
    apply(nextPalette, nextType);
    try {
      localStorage.setItem(KEY, JSON.stringify({ palette: nextPalette, type: nextType }));
    } catch {
      /* storage can be blocked; the URL still carries the choice */
    }
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("palette", nextPalette);
      url.searchParams.set("type", nextType);
      window.history.replaceState(window.history.state, "", url);
    } catch {
      /* ignore */
    }
  }

  const typeFont = (t: TypeSet) =>
    t.id === "a"
      ? { fontFamily: archivo.style.fontFamily, fontWeight: 800, fontVariationSettings: '"wdth" 118' }
      : { fontFamily: t.display ?? undefined, fontWeight: 700 };

  return (
    <>
      <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: BOOT }} />
      <style>{CSS}</style>
      <button
        ref={trigger}
        type="button"
        className="sw-trigger"
        aria-label="Style options"
        aria-expanded={open}
        aria-controls="sw-panel"
        onClick={() => (open ? close(true) : setOpen(true))}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
          <circle cx="16" cy="7" r="2" />
          <circle cx="8" cy="17" r="2" />
        </svg>
      </button>
      {open && (
        <div ref={panel} id="sw-panel" role="dialog" aria-label="Style options" className="sw-panel">
          <div className="sw-head">
            <span>Style options</span>
            <button type="button" className="sw-done" onClick={() => close(true)}>
              Done
            </button>
          </div>
          <div className="sw-group">
            <p className="sw-label">Colour</p>
            <div className="sw-list">
              {PALETTES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="sw-opt"
                  aria-pressed={p.id === palette}
                  onClick={() => choose(p.id, type)}
                >
                  <span className="sw-chip" aria-hidden="true">
                    {[p.bg, p.ink, p.tint, p.accent].map((c) => (
                      <i key={c} style={{ background: c }} />
                    ))}
                  </span>
                  {p.name}
                </button>
              ))}
            </div>
          </div>
          <div className="sw-group">
            <p className="sw-label">Type</p>
            <div className="sw-list">
              {TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className="sw-opt"
                  style={typeFont(t)}
                  aria-pressed={t.id === type}
                  onClick={() => choose(palette, t.id)}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
