import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import RevealObserver from "@/components/RevealObserver";
import PageShell from "@/components/PageShell";
import Packages from "@/components/Packages";
import CtaStrip from "@/components/CtaStrip";
import Payment from "@/components/Payment";

export const metadata: Metadata = {
  title: "Packages — Avinterra Expeditions",
  description:
    "This season's most-booked escapes. Hand-picked, fully outfitted itineraries with full inclusion lists.",
};

export default function PackagesPage() {
  return (
    <>
      <RevealObserver />
      <Nav />
      <PageShell>
        <Packages />
        <Payment />
        <CtaStrip />
      </PageShell>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
