import { useEffect } from 'react';
import gsap from 'gsap';
import SectionReveal from '../components/SectionReveal.jsx';
import Button from '../components/Button.jsx';
import { referenzen, clientLogos } from '../data/content.js';

export default function Referenzen() {
  useEffect(() => {
    document.title = 'Referenzen — novu | Projekte für Schweizer Unternehmen';
    const ctx = gsap.context(() => {
      gsap.fromTo('.rf-hero-line', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.1
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="rf-hero">
        <div className="container">
          <span className="eyebrow rf-hero-line">Unsere Arbeit</span>
          <h1 className="rf-title rf-hero-line">Referenzen</h1>
          <p className="rf-sub rf-hero-line">
            Ausgewählte Projekte für führende Schweizer Unternehmen —
            von Informationsplattformen bis zu kompletten Web-Relaunches.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="rf-grid">
            {referenzen.map((r, i) => (
              <SectionReveal key={r.title} delay={(i % 2) * 0.1} as="article" className="rf-card">
                <div className="rf-card-visual">
                  <span className="rf-card-index">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="rf-card-body">
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section client-section">
        <div className="container">
          <SectionReveal>
            <span className="eyebrow">Vertrauen</span>
            <h2 className="section-title">Unsere Kunden</h2>
          </SectionReveal>
          <SectionReveal className="client-grid">
            {clientLogos.map(logo => (
              <span key={logo} className="client-chip">{logo}</span>
            ))}
          </SectionReveal>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-inner">
          <SectionReveal>
            <h2 className="cta-title">Ihr Projekt könnte das nächste sein.</h2>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <Button to="/kontakt">Projekt anfragen</Button>
          </SectionReveal>
        </div>
      </section>

      <style>{`
        .rf-hero { padding: 200px 0 100px; background: var(--bg-dark); color: var(--bg-light); }
        .rf-title { font-size: clamp(44px, 8vw, 96px); margin: 20px 0 28px; }
        .rf-sub { font-size: 19px; color: var(--grey-warm); max-width: 600px; }

        .section-title { font-size: clamp(32px, 5vw, 56px); margin-top: 16px; margin-bottom: 56px; }

        .rf-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
        .rf-card {
          border-radius: 24px; overflow: hidden; border: 1px solid var(--grey-line-dark);
          transition: transform 0.4s var(--ease-premium), box-shadow 0.4s var(--ease-premium);
        }
        .rf-card:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.08); }
        .rf-card-visual {
          height: 220px; background: linear-gradient(135deg, var(--charcoal), var(--bg-dark));
          display: flex; align-items: center; justify-content: center;
        }
        .rf-card-index { font-family: var(--font-display); font-size: 64px; color: var(--copper); opacity: 0.6; }
        .rf-card-body { padding: 32px; background: var(--bg-light); }
        .rf-card-body h3 { font-size: 26px; font-weight: 500; margin-bottom: 12px; }
        .rf-card-body p { color: var(--grey-warm); font-size: 15px; }

        .client-section { background: var(--charcoal); color: var(--bg-light); }
        .client-section .section-title { color: var(--bg-light); }
        .client-grid { display: flex; flex-wrap: wrap; gap: 16px; }
        .client-chip {
          padding: 14px 26px; border-radius: 100px; border: 1px solid var(--grey-line);
          font-family: var(--font-display); font-size: 16px;
        }

        .cta-section { text-align: center; }
        .cta-inner { display: flex; flex-direction: column; align-items: center; gap: 36px; }
        .cta-title { font-size: clamp(32px, 6vw, 64px); max-width: 700px; }

        @media (max-width: 860px) {
          .rf-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
