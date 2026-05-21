import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import RevealObserver from "@/components/RevealObserver";
import PageShell from "@/components/PageShell";

export interface LegalSection {
  heading: string;
  /** Paragraphs of body text rendered above the list. */
  paragraphs?: string[];
  /** Bullet list items. */
  list?: string[];
  /** Paragraphs rendered after the list. */
  trailing?: string[];
}

interface LegalPageProps {
  title: string;
  updated: string;
  sections: LegalSection[];
}

/**
 * Shared reading layout for Terms, Privacy, and Refund pages.
 * Keeps legal markup consistent and in one place.
 */
export default function LegalPage({ title, updated, sections }: LegalPageProps) {
  return (
    <>
      <RevealObserver />
      <Nav />
      <PageShell>
        <section className="legal-page">
          <div className="container">
            <div className="legal-header reveal">
              <div className="eyebrow">LEGAL</div>
              <h1>{title}</h1>
              <p className="legal-meta">
                Last Updated: {updated} · Avinterra Expeditions Ltd
              </p>
            </div>

            <div className="legal-body reveal">
              {sections.map((section) => (
                <div key={section.heading}>
                  <h3>{section.heading}</h3>
                  {section.paragraphs?.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {section.list && (
                    <ul>
                      {section.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.trailing?.map((p, i) => (
                    <p key={`t-${i}`}>{p}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </PageShell>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
