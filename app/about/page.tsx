import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import RevealObserver from "@/components/RevealObserver";
import PageShell from "@/components/PageShell";
import AboutPageContent from "@/components/AboutPageContent";
import CtaStrip from "@/components/CtaStrip";

export const metadata: Metadata = {
  title: "About — Avinterra Expeditions",
  description:
    "From a borrowed matatu in 2013 to a decade of cinematic expeditions. The story of Avinterra — Nairobi-born, globally curated.",
};

export default function AboutPage() {
  return (
    <>
      <RevealObserver />
      <Nav />
      <PageShell>
        <AboutPageContent />
        <CtaStrip />
      </PageShell>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
