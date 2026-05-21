const CELLS = [
  { label: "PHONE",     value: "+254 143 218 102",              sub: "Mon–Sat · 8am – 7pm EAT" },
  { label: "WHATSAPP",  value: "+254 143 218 102",              sub: "24/7 — usually a few minutes" },
  { label: "EMAIL",     value: "avinterraexpeditions@gmail.com", sub: "Replies within 24h", small: true },
  { label: "OFFICE",    value: "Nairobi, Kenya",                sub: "Visit by appointment" },
];

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-head reveal" style={{ marginBottom: 40 }}>
          <div>
            <div className="eyebrow">09 · Reach us</div>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>
              One office. <em>Every continent.</em>
            </h2>
          </div>
        </div>
        <div className="contact-grid reveal">
          {CELLS.map(({ label, value, sub, small }) => (
            <div className="contact-cell" key={label}>
              <div className="label">{label}</div>
              <div className="value" style={small ? { fontSize: 18 } : undefined}>
                {value}
              </div>
              <div className="sub">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
