import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import RevealObserver from "@/components/RevealObserver";
import PageShell from "@/components/PageShell";
import Destinations from "@/components/Destinations";
import CtaStrip from "@/components/CtaStrip";

export const metadata: Metadata = {
  title: "Destinations — Avinterra Expeditions",
  description:
    "Local Kenyan safaris and international getaways. Every package fully outfitted — transport, lodging, guide.",
};

export default function DestinationsPage() {
  return (
    <>
      <RevealObserver />
      <Nav />
      <PageShell>
        <Destinations />
        <CtaStrip />
      </PageShell>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
