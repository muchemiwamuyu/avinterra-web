"use client";

import { PHOTOS } from "@/lib/data";

const WA = "254141920923";

function wa(msg: string) {
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
}

export default function AboutPageContent() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="about-hero">
        <div
          className="about-hero-bg"
          style={{ backgroundImage: `url(${PHOTOS.hotel1})` }}
        />
        <div className="about-hero-overlay" />
        <div className="container about-hero-inner">
          <div className="eyebrow" style={{ color: "rgba(255,255,255,0.55)" }}>
            OUR STORY
          </div>
          <h1 className="about-hero-h1">
            The Art of<br /><em>Untamed Journeys.</em>
          </h1>
          <p className="about-hero-sub">
            Born in Nairobi. Built for the world. A decade of cinematic
            expeditions — and we&rsquo;re only getting started.
          </p>
        </div>
      </section>

      {/* ── Origin story ─────────────────────────────────── */}
      <section className="about-origin">
        <div className="container">
          <div className="about-origin-grid">
            <div className="about-origin-images reveal">
              <div
                className="aoi-main"
                style={{ backgroundImage: `url(${PHOTOS.lodge1})` }}
              />
              <div
                className="aoi-secondary"
                style={{ backgroundImage: `url(${PHOTOS.hotel2})` }}
              />
            </div>
            <div className="about-origin-copy reveal">
              <div className="eyebrow">Our story</div>
              <h2>
                Architects of memory, <em>guardians of the wild.</em>
              </h2>
              <p>
                Every great journey begins with a heartbeat — the thrum of a
                safari vehicle crossing the savannah, the rhythmic crunch of
                boots on Mount Kenya&rsquo;s scree, or the gentle lap of the
                Indian Ocean against a dhow&rsquo;s hull.
              </p>
              <p>
                Avinterra Expeditions was born out of a simple, profound
                realisation: the modern traveller does not just want to{" "}
                <em>see</em> Africa — they want to be{" "}
                <em>changed by it</em>. Founded by{" "}
                <strong>Mangala M. David</strong>, a tech-forward visionary with
                deep roots in East African heritage, Avinterra bridges the gap
                between old-world wilderness adventure and cutting-edge,
                seamless trip design.
              </p>
              <p>
                We are not just tour operators. We are architects of memory,
                guardians of the landscape, and your ultimate hosts in the
                wild.
              </p>
              <div className="about-pillars-inline">
                {[
                  { label: "Intelligent Design", sub: "Fluid, hassle-free logistics" },
                  { label: "Immersive Luxury",   sub: "Deep comfort without isolation" },
                  { label: "Conscious Footprint",sub: "Conservation built into every mile" },
                ].map((p) => (
                  <div className="api-row" key={p.label}>
                    <span className="api-arrow">&#9658;</span>
                    <span className="api-label">{p.label}</span>
                    <span className="api-sep">───►</span>
                    <span className="api-sub">{p.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Founder quote ────────────────────────────────── */}
      <section className="about-quote-block">
        <div className="container">
          <div className="about-quote reveal">
            <div className="about-quote-mark">&ldquo;</div>
            <blockquote>
              The modern traveller does not just want to see Africa — they
              want to be changed by it. Our role is to make that
              transformation not just possible, but inevitable.
            </blockquote>
            <div className="about-quote-attr">
              <div className="about-quote-name">Mangala M. David</div>
              <div className="about-quote-role">Founder &amp; Lead Expedition Designer</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Three pillars ────────────────────────────────── */}
      <section className="about-pillars">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">What we stand for</div>
              <h2>
                Three principles that shape <em>every trip.</em>
              </h2>
            </div>
            <p>
              From the first inquiry to the final transfer home, these aren&rsquo;t
              values we put on a wall — they&rsquo;re decisions we make on
              every call, every itinerary, every partnership.
            </p>
          </div>
          <div className="about-pillars-grid">
            {[
              {
                num: "01",
                title: "Intelligent Design",
                body: "Fluid, hassle-free logistics — every itinerary starts with a conversation, not a template. We use data and digital optimisation to eliminate the traditional frictions of African travel, so you get a flawless, stress-free trip from the moment you land.",
                icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v10m0 0h10M9 13H5m4 0v6m0 0H5a2 2 0 01-2-2v-4m14 6h-4m4 0a2 2 0 002-2v-4m-6 6v-6",
              },
              {
                num: "02",
                title: "Immersive Luxury",
                body: "Deep comfort without isolation — it's the guide who knows the lion by name, the sundowner in the exact right spot, the dinner table set fifty metres from the herd. We source experiences that feel earned, not merely expensive.",
                icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
              },
              {
                num: "03",
                title: "Conscious Footprint",
                body: "Conservation built into every mile — we selectively partner with eco-certified sanctuaries and community-led operators. Every expedition we run actively funds local conservation efforts and education programmes, ensuring your footprint is entirely positive.",
                icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064",
              },
            ].map((p) => (
              <div className="about-pillar reveal" key={p.num}>
                <div className="about-pillar-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d={p.icon} stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="about-pillar-num">{p.num}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we do ───────────────────────────────────── */}
      <section className="about-services">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">What we do</div>
              <h2>
                Three worlds, <em>one expedition house.</em>
              </h2>
            </div>
            <p>
              We design boutique safaris, high-altitude mountain expeditions,
              and bespoke coastal getaways across East Africa&rsquo;s iconic
              landscapes — stripping away rigid, generic packages and replacing
              them with highly personalised, fluid journeys tailored to your
              rhythm.
            </p>
          </div>

          <div className="about-services-grid">
            <div
              className="about-service-card reveal"
              style={{ backgroundImage: `url(${PHOTOS.aboutA})` }}
            >
              <div className="asc-overlay" />
              <div className="asc-body">
                <div className="eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>SERVICE 01</div>
                <h3>🌿 Sovereign Safaris</h3>
                <p>
                  From the legendary river crossings of the Maasai Mara to the
                  red elephants of Tsavo and the Amboseli swamplands beneath
                  Kilimanjaro, we bring you face-to-face with the wild.
                  Indigenous trackers. World-class wildlife photography.
                  Intimate encounters — no crowds.
                </p>
                <button
                  className="asc-cta"
                  onClick={() => wa("Hi! I'm interested in a safari package. Could you share what's available?")}
                >
                  Explore safaris ↗
                </button>
              </div>
            </div>

            <div
              className="about-service-card reveal"
              style={{ backgroundImage: `url(${PHOTOS.mtkenya})` }}
            >
              <div className="asc-overlay" />
              <div className="asc-body">
                <div className="eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>SERVICE 02</div>
                <h3>🏔️ Peak Expeditions</h3>
                <p>
                  World-class ascents up Mount Kenya and Mount Kilimanjaro, led
                  by certified high-altitude guides with premium alpine gear.
                  We prioritise safety, physiological acclimatisation, and the
                  raw joy of standing on top of Africa.
                </p>
                <button
                  className="asc-cta"
                  onClick={() => wa("Hi! I'm interested in a mountain trekking expedition. Could you tell me more?")}
                >
                  Explore peaks ↗
                </button>
              </div>
            </div>

            <div
              className="about-service-card reveal"
              style={{ backgroundImage: `url(${PHOTOS.lodge2})` }}
            >
              <div className="asc-overlay" />
              <div className="asc-body">
                <div className="eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>SERVICE 03</div>
                <h3>⚓ Coastal &amp; Cultural Immersions</h3>
                <p>
                  Discover the Swahili coast where white sands meet centuries
                  of maritime history. Exclusive retreats in Lamu, Watamu, and
                  Diani blend slow-paced luxury with authentic cultural
                  exchanges that support local artisan economies.
                </p>
                <button
                  className="asc-cta"
                  onClick={() => wa("Hi! I'm interested in a coastal retreat. What packages do you have available?")}
                >
                  Explore coastal ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Avinterra Difference ─────────────────────── */}
      <section className="about-pillars" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">The Avinterra difference</div>
              <h2>Why we&rsquo;re built <em>differently.</em></h2>
            </div>
            <p>
              Three commitments that separate us from every other operator
              on the continent.
            </p>
          </div>
          <div className="about-pillars-grid">
            {[
              {
                num: "01",
                title: "Conscious Luxury & Active Stewardship",
                body: "Luxury should never cost the earth. We selectively partner with eco-certified sanctuaries, private conservancies, and luxury solar-powered camps with a proven record of wildlife protection and community equity. Every expedition actively funds local conservation and community-led education.",
                icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064",
              },
              {
                num: "02",
                title: "Tech-Enabled, Human-Centric Design",
                body: "Our founder's background in Business Information Technology means we use data and digital optimisation to eliminate the traditional frictions of African travel. Real-time route optimisation to avoid crowds. Seamless digital itinerary updates. Complex logistics handled invisibly — you get a flawless, stress-free trip.",
                icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v10m0 0h10M9 13H5m4 0v6m0 0H5a2 2 0 01-2-2v-4m14 6h-4m4 0a2 2 0 002-2v-4m-6 6v-6",
              },
              {
                num: "03",
                title: "Untamed Access",
                body: "We don't take you to crowded tourist traps. Our relationships with private conservancy rangers and community elders unlock off-the-grid locations, private night game drives, walking safaris, and raw wilderness encounters completely hidden from the standard tourist map.",
                icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
              },
            ].map((p) => (
              <div className="about-pillar reveal" key={p.num}>
                <div className="about-pillar-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d={p.icon} stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="about-pillar-num">{p.num}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Signature experience ─────────────────────────── */}
      <section className="about-signature">
        <div className="container">
          <div className="about-sig-inner">
            <div className="about-sig-copy reveal">
              <div className="eyebrow">Signature experience</div>
              <h2>
                4-Day Mara<br /><em>Sky Safari.</em>
              </h2>
              <p>
                The trip that made us. A four-day immersion in the Maasai
                Mara that blends luxury accommodation, game drives timed to
                the light, and moments of genuine stillness. This is the
                one guests book twice.
              </p>
              <button
                className="btn-primary"
                style={{ marginTop: 24 }}
                onClick={() => wa("Hi! I'd like to book the *4-Day Mara Sky Safari* — our signature experience. Could you share dates and pricing?")}
              >
                Book the Sky Safari
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="about-timeline reveal">
              {[
                { day: "Day 1", title: "Nairobi → Mara · Arrive, settle in", body: "Morning briefing at Wilson Airport, then a scenic 45-minute flight over the Rift Valley. Afternoon game drive to let the eyes adjust. Sundowner on the plains." },
                { day: "Day 2", title: "Full Mara · Dawn to dusk", body: "Sunrise drive at 6 AM — the golden hour when predators are still active. Full day in the reserve with a packed bush breakfast. Optional balloon safari at dawn (extra cost)." },
                { day: "Day 3", title: "Cultural morning · River crossing vigil", body: "Visit a Maasai manyatta for a guided community morning. Afternoon at the Mara River watching for crossings — no two are alike, and none are forgettable." },
                { day: "Day 4", title: "Final drive · Flight home", body: "Early morning drive for final sightings, then a leisurely breakfast before your return flight to Nairobi. Arrive home before lunch, changed." },
              ].map((item, i) => (
                <div className="about-timeline-item" key={item.day}>
                  <div className="atl-marker">
                    <div className="atl-dot" />
                    {i < 3 && <div className="atl-line" />}
                  </div>
                  <div className="atl-content">
                    <div className="atl-day">{item.day}</div>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Promise ──────────────────────────────────── */}
      <section className="about-promise">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">Our promise</div>
              <h2>
                What you can hold us to, <em>every time.</em>
              </h2>
            </div>
          </div>
          <div className="about-promise-grid">
            {[
              {
                title: "To the Explorer",
                body: "We promise an unhurried, breathtaking encounter with Africa. No rushed schedules, no crowded vehicles — just you and the untamed wild, supported by absolute comfort and expert care.",
              },
              {
                title: "To our Global B2B Partners",
                body: "We promise institutional-grade reliability, transparent pricing, swift communications, and white-label ground execution that honours your brand's prestige.",
              },
              {
                title: "To our Ecosystem",
                body: "We promise respectful interaction, active investment in conservation, and zero compromises on the health of our wildlife and local communities.",
              },
            ].map((item) => (
              <div className="about-promise-item reveal" key={item.title}>
                <div className="api-check">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5 6.5-7" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
          <div className="about-signature reveal">
            <div className="about-sig-text">Mangala M. David</div>
            <div className="about-sig-role">Founder, Avinterra Expeditions</div>
          </div>
        </div>
      </section>

      {/* ── Team / numbers ────────────────────────────────── */}
      <section className="about-numbers">
        <div
          className="about-numbers-bg"
          style={{ backgroundImage: `url(${PHOTOS.hotel2})` }}
        />
        <div className="about-numbers-overlay" />
        <div className="container about-numbers-inner">
          <div className="about-numbers-copy reveal">
            <div className="eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>By the numbers</div>
            <h2>A decade of expeditions.</h2>
          </div>
          <div className="about-stats-row reveal">
            {[
              { num: "12+", label: "Years operating" },
              { num: "2,400+", label: "Guests travelled" },
              { num: "98%", label: "Return booking rate" },
              { num: "34", label: "Destinations served" },
            ].map((s) => (
              <div className="about-stat" key={s.label}>
                <div className="about-stat-num">{s.num}</div>
                <div className="about-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ marginTop: 40 }}>
            <button
              className="btn-primary"
              onClick={() => wa("Hi! I'd like to learn more about Avinterra Expeditions and discuss planning a trip.")}
            >
              Start planning with us
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
