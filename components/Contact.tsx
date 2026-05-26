interface ContactCell {
  label: string;
  value: string;
  sub: string;
  href?: string;
  small?: boolean;
}

const CELLS: ContactCell[] = [
  {
    label: "PHONE",
    value: "+254 712 894 097",
    sub: "Mon–Sat · 8am – 7pm EAT",
    href: "tel:+254712894097",
  },
  {
    label: "WHATSAPP",
    value: "+254 712 894 097",
    sub: "24/7 — usually a few minutes",
    href: "https://wa.me/254712894097",
  },
  {
    label: "EMAIL",
    value: "avinterraexpeditions@gmail.com",
    sub: "Replies within 24h",
    href: "mailto:avinterraexpeditions@gmail.com",
    small: true,
  },
  {
    label: "OFFICE",
    value: "Nairobi, Kenya",
    sub: "Visit by appointment",
  },
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
          {CELLS.map(({ label, value, sub, href, small }) => {
            const content = (
              <>
                <div className="label">{label}</div>
                <div className="value" style={small ? { fontSize: 18 } : undefined}>
                  {value}
                </div>
                <div className="sub">{sub}</div>
              </>
            );
            return href ? (
              <a
                key={label}
                className="contact-cell contact-cell-link"
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {content}
              </a>
            ) : (
              <div className="contact-cell" key={label}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
