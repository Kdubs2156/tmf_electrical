import { Archivo, Public_Sans } from "next/font/google";
// Alternates the client may pick instead. To swap, replace the two exports below with one of these pairs.
// import { Fraunces, Figtree } from "next/font/google";
// import { Zilla_Slab, Atkinson_Hyperlegible } from "next/font/google";

// Placeholder type until the client picks. Headings: Archivo, wide (the width axis is set to 112% in globals.css).
export const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  weight: "variable",
  display: "swap",
  variable: "--font-display-loaded",
});

// Body: Public Sans.
export const body = Public_Sans({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-body-loaded",
});

// Fraunces + Figtree (alternate):
// export const display = Fraunces({ subsets: ["latin"], weight: "variable", display: "swap", variable: "--font-display-loaded" });
// export const body = Figtree({ subsets: ["latin"], weight: "variable", display: "swap", variable: "--font-body-loaded" });

// Zilla Slab + Atkinson Hyperlegible (alternate):
// export const display = Zilla_Slab({ subsets: ["latin"], weight: ["500", "600", "700"], display: "swap", variable: "--font-display-loaded" });
// export const body = Atkinson_Hyperlegible({ subsets: ["latin"], weight: ["400", "700"], display: "swap", variable: "--font-body-loaded" });
