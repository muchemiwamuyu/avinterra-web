import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import RevealObserver from "@/components/RevealObserver";
import PageShell from "@/components/PageShell";
import About from "@/components/About";
import CtaStrip from "@/components/CtaStrip";

export const metadata: Metadata = {
  title: "About — Avinterra Expeditions",
  description:
    "A Kenyan-grown travel house with a decade of experience designing cinematic journeys, locally rooted and globally curated.",
};

export default function AboutPage() {
  return (
    <>
      <RevealObserver />
      <Nav />
      <PageShell>
        <About />

        <section className="mission">
          <div className="container">
            <div className="mission-inner reveal">
              <div className="eyebrow">Our mission</div>
              <h2>
                Travel that returns you <em>changed</em>, not just rested.
              </h2>
              <p>
                Avinterra Expeditions exists to make extraordinary travel feel
                effortless. We believe a great journey is engineered long before
                the wheels leave the tarmac — in the route chosen, the guide
                matched to your pace, and the hundred small details handled so
                you never have to think about them.
              </p>
              <p>
                Every itinerary is signed off by a human who has walked it. We
                partner directly with local lodges, guides, and operators across
                Kenya and beyond, so the money you spend strengthens the places
                you visit. From a first-time safari to a milestone trip across
                continents, our promise is the same: arrive curious, leave with
                a story worth retelling for years.
              </p>
            </div>
          </div>
        </section>

        <CtaStrip />
      </PageShell>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
