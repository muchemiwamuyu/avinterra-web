import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Refund Policy — Avinterra Expeditions",
  description:
    "Refund eligibility, processing timelines, and cancellation terms for Avinterra Expeditions Ltd bookings.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "1. General Terms",
    paragraphs: ["Refund eligibility depends on:"],
    list: [
      "Type of booking",
      "Supplier refund conditions",
      "Time of cancellation",
      "Applicable processing fees",
    ],
  },
  {
    heading: "2. Tour & Safari Packages",
    paragraphs: ["Refunds for tour and safari packages are tiered by timing:"],
    list: [
      "More than 14 days before departure: up to 80% refund.",
      "7–14 days before departure: up to 50% refund.",
      "Less than 7 days before departure: limited or no refund.",
    ],
  },
  {
    heading: "3. Flight Refunds",
    paragraphs: [
      "Flight refunds are subject to airline rules and fare conditions. Some discounted tickets may be non-refundable.",
    ],
  },
  {
    heading: "4. Hotel & Accommodation Refunds",
    paragraphs: [
      "Refunds for accommodation depend on the cancellation policies of the relevant hotels, lodges, and Airbnb hosts.",
    ],
  },
  {
    heading: "5. Non-Refundable Charges",
    paragraphs: ["The following charges are non-refundable:"],
    list: [
      "Visa processing fees",
      "Insurance charges",
      "Transaction fees",
      "Administrative charges",
    ],
  },
  {
    heading: "6. Refund Processing",
    paragraphs: [
      "Approved refunds are processed within 7–14 business days for mobile money or bank transfers.",
    ],
  },
  {
    heading: "7. Force Majeure",
    paragraphs: [
      "Refunds may not apply for events beyond reasonable control, including:",
    ],
    list: [
      "Natural disasters",
      "Government restrictions",
      "Pandemics",
      "Political instability",
      "Airline strikes",
    ],
  },
  {
    heading: "8. Refund Requests",
    paragraphs: ["To request a refund you must provide:"],
    list: [
      "Booking details",
      "Proof of payment",
      "Reason for cancellation",
    ],
    trailing: [
      "Requests must be submitted through official company communication channels.",
      "Email: avinterraexpeditions@gmail.com",
    ],
  },
];

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund Policy"
      updated="May 2026"
      sections={SECTIONS}
    />
  );
}
