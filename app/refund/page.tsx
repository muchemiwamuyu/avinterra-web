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
      "More than 14 days before departure: up to 70% refund.",
      "7–14 days before departure: up to 50% refund.",
      "Less than 7 days before departure: limited or no refund.",
    ],
  },
  {
    heading: "3. Deposit",
    paragraphs: [
      "A non-refundable deposit of 30% of the total booking value is required to secure your booking and date.",
      "The deposit is payable upon confirmation of the itinerary and is non-refundable under all cancellation scenarios.",
    ],
  },
  {
    heading: "4. Final Balance Deadline",
    paragraphs: [
      "The remaining balance of 70% is due no later than 14 days before the scheduled departure or event date.",
      "Failure to settle the final balance by this deadline may result in automatic cancellation of the booking without refund of the deposit.",
    ],
  },
  {
    heading: "5. Flight Refunds",
    paragraphs: [
      "Flight refunds are subject to airline rules and fare conditions. Some discounted tickets may be non-refundable.",
    ],
  },
  {
    heading: "6. Hotel & Accommodation Refunds",
    paragraphs: [
      "Refunds for accommodation depend on the cancellation policies of the relevant hotels, lodges, and Airbnb hosts.",
    ],
  },
  {
    heading: "7. Non-Refundable Charges",
    paragraphs: ["The following charges are non-refundable:"],
    list: [
      "Visa processing fees",
      "Insurance charges",
      "Transaction fees",
      "Administrative charges",
    ],
  },
  {
    heading: "8. Refund Processing",
    paragraphs: [
      "Approved refunds are processed within 7–14 business days for mobile money or bank transfers.",
    ],
  },
  {
    heading: "9. Force Majeure",
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
    heading: "10. Refund Requests",
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
