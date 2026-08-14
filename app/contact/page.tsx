import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import RevealObserver from "@/components/RevealObserver";
import PageShell from "@/components/PageShell";
import Contact from "@/components/Contact";
import Booking from "@/components/Booking";
import Payment from "@/components/Payment";

export const metadata: Metadata = {
  title: "Contact & Booking — Avinterra Expeditions",
  description:
    "One office, every continent. Send an inquiry and a real human replies within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <RevealObserver />
      <Nav />
      <PageShell>
        <Contact />
        <Booking />
        <Payment />
      </PageShell>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
