import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Avinterra Expeditions",
  description:
    "How Avinterra Expeditions Ltd collects, uses, and protects your personal information.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Information We Collect",
    paragraphs: ["We may collect the following information:"],
    list: [
      "Full names",
      "Phone numbers",
      "Email addresses",
      "Passport details",
      "Payment information",
      "Travel preferences",
      "Device and browser information",
    ],
  },
  {
    heading: "2. How We Use Your Information",
    paragraphs: ["We use your information to:"],
    list: [
      "Process bookings and payments",
      "Provide customer support",
      "Send travel confirmations and updates",
      "Improve our services and website",
      "Prevent fraud",
    ],
  },
  {
    heading: "3. Sharing of Information",
    paragraphs: ["We may share information with:"],
    list: [
      "Airlines",
      "Hotels",
      "Safari and transport operators",
      "Payment processors",
      "Government authorities where legally required",
    ],
    trailing: ["We do not sell customer data to third parties."],
  },
  {
    heading: "4. Data Security",
    paragraphs: [
      "We implement reasonable security measures to protect your information against unauthorised access, misuse, or disclosure.",
    ],
  },
  {
    heading: "5. Cookies",
    paragraphs: ["Cookies are used to:"],
    list: [
      "Improve user experience",
      "Analyse website traffic",
      "Store user preferences",
    ],
    trailing: ["Users may disable cookies through their browser settings."],
  },
  {
    heading: "6. Data Retention",
    paragraphs: [
      "Information is retained only as long as necessary for operational, legal, and business purposes.",
    ],
  },
  {
    heading: "7. User Rights",
    paragraphs: [
      "You may request access to, correction of, or deletion of your personal information where legally permitted.",
    ],
  },
  {
    heading: "8. Third-Party Links",
    paragraphs: [
      "We are not responsible for the privacy practices of third-party websites linked from our platform.",
    ],
  },
  {
    heading: "9. Updates",
    paragraphs: ["This policy may be updated periodically."],
  },
  {
    heading: "10. Contact",
    paragraphs: [
      "For privacy-related enquiries, contact us at avinterraexpeditionsltd@gmail.com.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="May 2026"
      sections={SECTIONS}
    />
  );
}
