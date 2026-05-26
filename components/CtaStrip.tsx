import Link from "next/link";

export default function CtaStrip() {
  return (
    <section className="cta-strip">
      <div className="container">
        <div className="cta-strip-inner">
          <div>
            <h3>Ready to plan your expedition?</h3>
            <p>A real human replies within 24 hours — often faster on WhatsApp.</p>
          </div>
          <div className="cta-strip-btns">
            <Link href="/contact" className="btn btn-primary">
              Book a tour ↗
            </Link>
            <a
              href="https://wa.me/254712894097"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
