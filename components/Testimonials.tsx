import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">06 · Real travel stories</div>
            <h2>
              From <em>beloved clients,</em> in their own words.
            </h2>
          </div>
          <p>Over ten thousand travellers across six continents. Here are three.</p>
        </div>

        <div className="test-track">
          {TESTIMONIALS.map((t, i) => (
            <div className="test-card reveal" key={i}>
              <span className="test-quote-mark">&ldquo;</span>
              <p className="test-quote">{t.q}</p>
              <div className="test-author">
                <div
                  className="test-avatar"
                  style={{ backgroundImage: `url(${t.av})` }}
                />
                <div>
                  <p className="test-name">{t.n}</p>
                  <p className="test-role">{t.role}</p>
                </div>
                <div className="test-stars">{"★".repeat(t.s)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
