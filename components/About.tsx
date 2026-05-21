import { PHOTOS } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-copy reveal">
            <div className="eyebrow">02 · About us</div>
            <h2>
              Cinematic journeys, <em>locally rooted,</em> globally curated.
            </h2>
            <p>
              Avinterra Expeditions Limited is a Kenyan-grown travel house with
              a decade of experience designing trips that actually feel like the
              brochure photos. We handle every detail — flights, visas,
              transfers, guides — so you only carry the memories home.
            </p>
            <div className="about-list">
              {[
                { t: "Professional planning",  d: "Itineraries tailored to your pace and budget." },
                { t: "Affordable packages",    d: "Group rates, lipa-polepole, and no hidden fees." },
                { t: "Local + international",  d: "From Mara to Mykonos, with a single point of contact." },
                { t: "Memorable always",       d: "Trips engineered for the story you'll retell for years." },
              ].map(({ t, d }) => (
                <div className="about-list-item" key={t}>
                  <h4>{t}</h4>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-vis reveal">
            <div className="about-vis-inner">
              <div className="av-img av-1" style={{ backgroundImage: `url(${PHOTOS.aboutA})` }} />
              <div className="av-img av-2" style={{ backgroundImage: `url(${PHOTOS.aboutB})` }} />
              <div className="av-tag t1">
                <span className="num">12</span>
                <span style={{ color: "var(--ink-3)", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.16em" }}>
                  YRS GUIDING
                </span>
              </div>
              <div className="av-tag t2">
                <span className="num">98%</span>
                <span style={{ color: "var(--ink-3)", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.16em" }}>
                  RETURNING GUESTS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
