import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import RevealObserver from "@/components/RevealObserver";
import PageShell from "@/components/PageShell";
import Why from "@/components/Why";
import Testimonials from "@/components/Testimonials";
import CtaStrip from "@/components/CtaStrip";

export const metadata: Metadata = {
  title: "Why Avinterra — Avinterra Expeditions",
  description:
    "Six reasons our guests come back. Real travel stories from beloved clients, in their own words.",
};

export default function WhyPage() {
  return (
    <>
      <RevealObserver />
      <Nav />
      <PageShell>
        <Why />
        <Testimonials />
        <CtaStrip />
      </PageShell>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
