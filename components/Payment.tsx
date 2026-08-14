"use client";

import { useState } from "react";
import { MPESA_PAYBILL, MPESA_ACCOUNT, WA_NUMBER, WA_DISPLAY } from "@/lib/data";

const FIELDS: { label: string; value: string }[] = [
  { label: "PAYBILL NO", value: MPESA_PAYBILL },
  { label: "ACCOUNT NO", value: MPESA_ACCOUNT },
];

const STEPS = [
  "Open M-Pesa on your phone and choose Lipa na M-Pesa.",
  "Select Pay Bill and enter business number " + MPESA_PAYBILL + ".",
  "Enter account number " + MPESA_ACCOUNT + ".",
  "Enter the amount, your PIN, and confirm.",
  "Send us the confirmation message on WhatsApp to secure your booking.",
];

export default function Payment() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied((c) => (c === label ? null : c)), 1800);
    } catch {
      // Clipboard unavailable (insecure context / permissions) — numbers stay readable on screen
    }
  };

  return (
    <section id="payment" className="payment">
      <div className="container">
        <div className="section-head reveal" style={{ marginBottom: 40 }}>
          <div>
            <div className="eyebrow">10 · Payment</div>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>
              Pay via <em>M-Pesa.</em>
            </h2>
          </div>
        </div>

        <div className="pay-grid reveal">
          <div className="pay-card">
            <div className="pay-card-head">
              <span className="pay-badge">LIPA NA M-PESA · PAY BILL</span>
            </div>
            <div className="pay-numbers">
              {FIELDS.map(({ label, value }) => (
                <button
                  key={label}
                  type="button"
                  className="pay-num"
                  onClick={() => copy(label, value)}
                  aria-label={`Copy ${label} ${value}`}
                >
                  <span className="pay-num-label">{label}</span>
                  <span className="pay-num-value">{value}</span>
                  <span className="pay-num-copy">
                    {copied === label ? (
                      "Copied ✓"
                    ) : (
                      <>
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <rect x="5.5" y="5.5" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" />
                          <path d="M10.5 3.5v-1a1 1 0 00-1-1h-7a1 1 0 00-1 1v7a1 1 0 001 1h1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                        Tap to copy
                      </>
                    )}
                  </span>
                </button>
              ))}
            </div>
            <p className="pay-note">
              Payments go to <strong>Avinterra Expeditions Limited</strong>. A 30% deposit
              secures your booking; the balance is due 14 days before departure.
            </p>
          </div>

          <div className="pay-steps">
            <h5>HOW TO PAY</h5>
            <ol>
              {STEPS.map((s, i) => (
                <li key={i}>
                  <span className="pay-step-n">{String(i + 1).padStart(2, "0")}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            <a
              className="pay-wa"
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                "Hi! I've made an M-Pesa payment for my booking. Here is my confirmation message:"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Send confirmation on WhatsApp
              <span className="pay-wa-num">{WA_DISPLAY}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
