"use client";

import { PHOTOS } from "@/lib/data";

const WA = "254712894097";

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
              <div className="eyebrow">How it started</div>
              <h2>
                From a matatu and a map, <em>to a movement.</em>
              </h2>
              <p>
                In 2013, a group of Nairobi friends piled into a borrowed
                matatu, spread a folded map across the dashboard, and drove
                to the Maasai Mara on nothing but curiosity and a tank of
                fuel. No itinerary. No WiFi. Just the horizon.
              </p>
              <p>
                What happened over those four days changed everything. The
                quality of the light at sunrise. The silence of the open
                savannah. The feeling that this — <em>this</em> — was what
                travel was supposed to feel like. When they returned to
                Nairobi, the questions from friends were instant: &ldquo;How
                did you do it? Can you arrange the same for us?&rdquo;
              </p>
              <p>
                That was the beginning of Avinterra Expeditions. Not a
                boardroom decision. Not a business plan. A feeling that was
                too good to keep to just a few people.
              </p>
              <p>
                Over the years, the matatu became a fleet. The folded map
                became curated itineraries. The borrowed camping gear became
                luxury lodges and five-star resorts. But the soul of that
                first trip — raw, spontaneous, extraordinary — never left
                us.
              </p>
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
              Travel is not a luxury reserved for the few. It is the
              greatest education available to anyone willing to show up.
              Our job is simply to make showing up easier — and
              unforgettable.
            </blockquote>
            <div className="about-quote-attr">
              <div className="about-quote-name">David Muthui</div>
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
                body: "Every itinerary starts with a conversation, not a template. We study your rhythm — how you like mornings, how much activity you want, whether you prefer solitude or atmosphere. Then we engineer the trip around you, not the other way round.",
                icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v10m0 0h10M9 13H5m4 0v6m0 0H5a2 2 0 01-2-2v-4m14 6h-4m4 0a2 2 0 002-2v-4m-6 6v-6",
              },
              {
                num: "02",
                title: "Immersive Luxury",
                body: "Luxury isn't about thread count alone. It's the guide who knows the lion's name, the sundowner in the exact right spot, the dinner table set fifty metres from the herd. We source experiences that feel earned, not merely expensive.",
                icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
              },
              {
                num: "03",
                title: "Conscious Footprint",
                body: "Every trip we sell puts money directly into local economies. We partner exclusively with operators who employ local communities, protect habitats, and reject practices that harm wildlife. When you travel with us, the land benefits.",
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
              Whether the call is wild savannah, mountain air, or turquoise
              water, we have a fully outfitted offering built for it.
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
                <h3>Sovereign Safaris</h3>
                <p>
                  Private and group safaris across Kenya&rsquo;s greatest
                  parks — Maasai Mara, Amboseli, Tsavo, Mt Kenya — with
                  expert guides and hand-picked lodges that put you inside
                  the landscape, not beside it.
                </p>
                <button
                  className="asc-cta"
                  onClick={() => wa("Hi! I'm interested in learning more about your Safari packages. Could you share what's available?")}
                >
                  Explore safaris ↗
                </button>
              </div>
            </div>

            <div
              className="about-service-card reveal"
              style={{ backgroundImage: `url(${PHOTOS.hotel3})` }}
            >
              <div className="asc-overlay" />
              <div className="asc-body">
                <div className="eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>SERVICE 02</div>
                <h3>International Escapes</h3>
                <p>
                  Bespoke international packages to Dubai, Greece, Japan,
                  Egypt, South Africa and beyond. Flights, accommodation,
                  transfers, and curated experiences all handled from our
                  Nairobi office — one call, one contact, everything done.
                </p>
                <button
                  className="asc-cta"
                  onClick={() => wa("Hi! I'm interested in an international travel package. Could you tell me more about your destinations?")}
                >
                  Explore destinations ↗
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
                <h3>Coastal Retreats</h3>
                <p>
                  Long weekends and full escapes to Diani, Watamu, Lamu,
                  and Zanzibar. White sand, world-class seafood, and the
                  kind of unhurried pace that resets you from the inside out.
                </p>
                <button
                  className="asc-cta"
                  onClick={() => wa("Hi! I'm interested in a coastal beach retreat. What packages do you have available?")}
                >
                  Explore coastal ↗
                </button>
              </div>
            </div>
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
              { title: "Human-first service", body: "Every inquiry is answered by a real person who has been to the destination or spoken to someone who has. No chatbots. No copy-paste responses." },
              { title: "Price transparency", body: "What we quote is what you pay. No hidden fees revealed at check-in. No sudden surcharges. If something changes, we tell you immediately." },
              { title: "24-hour WhatsApp access", body: "Our team is reachable on WhatsApp around the clock. Whether you're boarding in Nairobi or checking in at a hotel in Athens, we are one message away." },
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
