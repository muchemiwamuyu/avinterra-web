"use client";

import { useState, useEffect } from "react";
import { PHOTOS } from "@/lib/data";

interface FormState {
  name: string;
  email: string;
  phone: string;
  dest: string;
  date: string;
  travelers: string;
  notes: string;
}

const INITIAL: FormState = {
  name: "", email: "", phone: "",
  dest: "Masai Mara Safari · 3D/2N · KSH 19,500",
  date: "", travelers: "2", notes: "",
};

export default function Booking() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  // Auto-clear success banner so user can submit again
  useEffect(() => {
    if (status?.ok) {
      const t = setTimeout(() => setStatus(null), 6000);
      return () => clearTimeout(t);
    }
  }, [status]);

  const set = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setStatus({ ok: false, msg: "Please fill in name, email and phone." });
      return;
    }
    const lines = [
      `*New Inquiry — Avinterra Expeditions*`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Destination: ${form.dest}`,
      `Travellers: ${form.travelers}`,
      form.date ? `Date: ${form.date}` : null,
      form.notes ? `Notes: ${form.notes}` : null,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/254141920923?text=${encodeURIComponent(lines)}`, "_blank", "noopener,noreferrer");
    setStatus({ ok: true, msg: `Opening WhatsApp with your inquiry, ${form.name.split(" ")[0]}! We'll reply within 24 hours.` });
    setForm(INITIAL);
  };

  return (
    <section id="booking" className="booking">
      <div className="container">
        <div className="booking-inner">
          {/* Art panel */}
          <div
            className="booking-art reveal"
            style={{ backgroundImage: `url(${PHOTOS.bookingArt})` }}
          >
            <div className="booking-art-overlay">
              <div className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>
                READY WHEN YOU ARE
              </div>
              <h3>Tell us where you&rsquo;d like to wake up next.</h3>
              <p>A real human replies within 24 hours, often faster on WhatsApp.</p>
              <div style={{ marginTop: 24, display: "flex", gap: 12, alignItems: "center", fontSize: 13, color: "rgba(255,255,255,0.85)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 14.4l-2.4-1.2c-.4-.2-.9-.1-1.2.2l-1 1c-1.5-.8-2.7-2-3.5-3.5l1-1c.3-.3.4-.8.2-1.2L9.4 6.3c-.3-.6-1-.8-1.5-.4-1.6 1-2.5 2.8-2.1 4.8.7 4 4 7.3 8 8 2 .4 3.8-.5 4.8-2.1.3-.5.1-1.2-.4-1.5z" />
                </svg>
                <span>+254 141 920923 · WhatsApp 24/7</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="booking-form" onSubmit={submit}>
            <div className="eyebrow">08 · Inquiry &amp; booking</div>
            <h2
              style={{
                fontSize: "clamp(36px, 4.4vw, 56px)",
                fontFamily: "var(--serif)",
                fontWeight: 300,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                margin: "10px 0 22px",
              }}
            >
              Plan my <em style={{ fontStyle: "italic", color: "var(--accent-2)" }}>expedition.</em>
            </h2>

            <div className="form-row">
              <div className="field">
                <label htmlFor="bf-name">Full name</label>
                <input id="bf-name" type="text" placeholder="Jane Doe" value={form.name} onChange={set("name")} />
              </div>
              <div className="field">
                <label htmlFor="bf-email">Email</label>
                <input id="bf-email" type="email" placeholder="jane@email.com" value={form.email} onChange={set("email")} />
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="bf-phone">Phone / WhatsApp</label>
                <input id="bf-phone" type="tel" placeholder="+254 7XX XXX XXX" value={form.phone} onChange={set("phone")} />
              </div>
              <div className="field">
                <label htmlFor="bf-travelers">Travellers</label>
                <select id="bf-travelers" value={form.travelers} onChange={set("travelers")}>
                  {["1","2","3-5","6-10","10+"].map((v) => <option key={v}>{v}</option>)}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="bf-dest">Destination interest</label>
                <select id="bf-dest" value={form.dest} onChange={set("dest")}>
                  <optgroup label="Local · Kenya">
                    {[
                      "Masai Mara Safari · 3D/2N · KSH 19,500",
                      "Masai Mara National Park · 3D/2N · KSH 37,500",
                      "Amboseli · 3D/2N · KSH 19,600",
                      "Tsavo Safari · 3D/2N · KSH 18,700",
                      "Tsavo National Park · 3D/2N · KSH 18,700",
                      "Serengeti · 3D/2N · KSH 45,500",
                      "Nairobi National Park · 1 day · KSH 3,200",
                      "Lake Nakuru National Park · 1 day · KSH 4,500",
                      "Mt Kenya Hike & Castle Forest · 1 day · KSH 3,500",
                      "Mt. Longonot Hiking · 1 day · KSH 4,500",
                      "Kiambicho Hills & Murang'a Gorges · 1 day · KSH 5,200",
                      "Karuru Falls Adventure · 1 day · KSH 3,900",
                      "Salty's on the Creek · Kilifi · KSH 52,950",
                      "PrideInn Paradise Beach & Spa · Mombasa · KSH 56,990",
                      "Pangoni Beach Resort & Spa · Mombasa · KSH 51,700",
                      "Jambo Travellers Hotel · Mombasa · KSH 22,700",
                      "Southern Palms Beach Resort · KSH 48,900",
                      "Sun & Sand Beach Resort · Diani · KSH 42,850",
                      "The Ark Lodge · Mt Kenya · KSH 32,670",
                    ].map((v) => <option key={v}>{v}</option>)}
                  </optgroup>
                  <optgroup label="International">
                    {[
                      "Greece · 8D/7N · USD 2,269",
                      "Mexico · 8D/7N · USD 6,570",
                      "Japan · 10D/11N · Contact us",
                      "Dubai · UAE",
                      "Egypt",
                      "Zanzibar",
                    ].map((v) => <option key={v}>{v}</option>)}
                  </optgroup>
                  <option>Not sure — surprise me</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="bf-date">Preferred date</label>
                <input id="bf-date" type="date" value={form.date} onChange={set("date")} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="bf-notes">Anything we should know?</label>
              <textarea
                id="bf-notes"
                rows={3}
                placeholder="Honeymoon, anniversary, dietary needs, dream itinerary…"
                value={form.notes}
                onChange={set("notes")}
              />
            </div>

            <button type="submit" className="booking-submit">
              Send inquiry
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>

            {status && (
              <div
                style={{
                  marginTop: 8,
                  padding: "12px 16px",
                  borderRadius: 12,
                  background: status.ok ? "rgba(78,195,184,0.1)" : "rgba(232,92,43,0.1)",
                  border: `1px solid ${status.ok ? "rgba(78,195,184,0.35)" : "rgba(232,92,43,0.4)"}`,
                  fontSize: 13,
                  color: status.ok ? "var(--teal)" : "var(--accent)",
                }}
              >
                {status.msg}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
