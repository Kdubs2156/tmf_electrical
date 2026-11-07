import { Contact } from "@/components/Contact";
import { Directory } from "@/components/Directory";
import { Hero } from "@/components/Hero";
import { Reviews } from "@/components/Reviews";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Story } from "@/components/Story";
import { Work } from "@/components/Work";

// Order: Hero, What I do, About Taylor, Recent work, Reviews, Contact, Footer.
export default function Home() {
  return (
    <>
      <span id="top" />
      <SiteHeader />
      <main>
        <Hero />
        <Directory />
        <Story />
        <Work />
        <Reviews />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
