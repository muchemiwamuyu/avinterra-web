import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import RevealObserver from "@/components/RevealObserver";
import PageShell from "@/components/PageShell";
import Gallery from "@/components/Gallery";
import CtaStrip from "@/components/CtaStrip";

export const metadata: Metadata = {
  title: "Gallery — Avinterra Expeditions",
  description:
    "Frames from the field. Shot by our guides and guests across six continents.",
};

export default function GalleryPage() {
  return (
    <>
      <RevealObserver />
      <Nav />
      <PageShell>
        <Gallery />
        <CtaStrip />
      </PageShell>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
