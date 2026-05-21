import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WildlifeMarquee from "@/components/WildlifeMarquee";
import About from "@/components/About";
import StatsInfographic from "@/components/StatsInfographic";
import DestinationsGlobe from "@/components/DestinationsGlobe";
import Marquee from "@/components/Marquee";
import Why from "@/components/Why";
import Testimonials from "@/components/Testimonials";
import CtaStrip from "@/components/CtaStrip";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import RevealObserver from "@/components/RevealObserver";

export default function Home() {
  return (
    <>
      <RevealObserver />
      <Nav />
      <main>
        <Hero />
        <WildlifeMarquee />
        <About />
        <StatsInfographic />
        <DestinationsGlobe />
        <Marquee />
        <Why />
        <Testimonials />
        <CtaStrip />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
