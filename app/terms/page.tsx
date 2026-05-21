import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions — Avinterra Expeditions",
  description:
    "Terms and conditions governing the use of Avinterra Expeditions Ltd services.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Definitions",
    paragraphs: [
      "Company = Avinterra Expeditions Ltd. Customer = any individual or organisation using our services. Services = tour bookings, hotel reservations, safari packages, Airbnb bookings, car rentals, and flight reservations.",
    ],
  },
  {
    heading: "2. Acceptance",
    paragraphs: [
      "By using our website or booking services you confirm that:",
    ],
    list: [
      "You are at least 18 years of age.",
      "You have the legal authority to enter into agreements.",
      "You agree to these Terms.",
    ],
  },
  {
    heading: "3. Booking Terms",
    paragraphs: [
      "All bookings are subject to availability and confirmation. Customers must provide accurate information. The Company reserves the right to reject or cancel bookings due to incorrect information, fraud, or policy violations.",
    ],
  },
  {
    heading: "4. Payments",
    paragraphs: [
      "Full or partial payment is required to confirm reservations. Prices are subject to change due to exchange rates, supplier pricing, taxes, or market conditions.",
      "Accepted payment methods:",
    ],
    list: [
      "Credit and Debit Cards",
      "Mobile Money",
      "Bank Transfers",
      "Online Payment Platforms",
    ],
  },
  {
    heading: "5. Cancellations",
    paragraphs: [
      "Cancellation requests must go through official company channels. Refund eligibility depends on supplier terms, booking conditions, and timing. Some services are non-refundable.",
    ],
  },
  {
    heading: "6. Travel Documents",
    paragraphs: [
      "Customers are responsible for ensuring they hold:",
    ],
    list: [
      "Valid passports",
      "Visas",
      "Vaccination certificates",
      "Any required travel permits",
    ],
  },
  {
    heading: "7. Limitation of Liability",
    paragraphs: [
      "The Company is not liable for:",
    ],
    list: [
      "Delays or cancellations caused by airlines, hotels, or third-party providers.",
      "Natural disasters or political unrest.",
      "Theft, injury, illness, or loss during travel.",
      "Website interruptions.",
    ],
    trailing: [
      "Travel insurance is strongly recommended for all customers.",
    ],
  },
  {
    heading: "8. Customer Conduct",
    paragraphs: [
      "Customers must not engage in unlawful or disruptive behaviour, abuse staff or guides, or damage property. Violation may result in removal from a trip without a refund.",
    ],
  },
  {
    heading: "9. Intellectual Property",
    paragraphs: [
      "All content on this website belongs to Avinterra Expeditions Ltd.",
    ],
  },
  {
    heading: "10. Privacy",
    paragraphs: [
      "Personal information is handled in accordance with our Privacy Policy.",
    ],
  },
  {
    heading: "11. Changes to Terms",
    paragraphs: [
      "The Company may modify these Terms at any time. Continued use of the website or services constitutes acceptance of the updated Terms.",
    ],
  },
  {
    heading: "12. Governing Law",
    paragraphs: ["These Terms are governed by the laws of Kenya."],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="May 2026"
      sections={SECTIONS}
    />
  );
}
