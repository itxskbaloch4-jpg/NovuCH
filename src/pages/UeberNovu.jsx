import { useEffect } from 'react';
import gsap from 'gsap';
import SectionReveal from '../components/SectionReveal.jsx';
import Button from '../components/Button.jsx';
import { offices } from '../data/content.js';

const values = [
  { title: 'Code', desc: 'Saubere, skalierbare Software-Entwicklung mit modernen Technologien.' },
  { title: 'Design', desc: 'Durchdachtes UX-UI Design mit Fokus auf User Experience.' },
  { title: 'Konzept', desc: 'Innovative Konzepte für erfolgsversprechende, messbare Lösungen.' }
];

export default function UeberNovu() {
  useEffect(() => {
    document.title = 'Über novu | Digitalagentur Bern, Zürich & Basel';
    const ctx = gsap.context(() => {
      gsap.fromTo('.un-hero-line', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.1
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="un-hero">
        <div className="container">
          <span className="eyebrow un-hero-line">Wer wir sind</span>
          <h1 className="un-title un-hero-line">Über novu</h1>
          <p className="un-sub un-hero-line">
            novu ist eine Digitalagentur mit Standorten in Bern, Zürich und Basel.
            Wir verbinden Code, Design und Konzept zu Lösungen, die Wirkung zeigen.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="values-grid">
            {values.map((v, i) => (
              <SectionReveal key={v.title} delay={i * 0.1} className="value-card">
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section offices-section">
        <div className="container">
          <SectionReveal>
            <span className="eyebrow">Standorte</span>
            <h2 className="section-title">Bern · Zürich · Basel</h2>
          </SectionReveal>
          <div className="offices-grid">
            {offices.map((o, i) => (
              <SectionReveal key={o.city} delay={i * 0.1} className="office-card">
                <h3>{o.city}</h3>
                <p>{o.address.split('\n').map((line, idx) => <span key={idx}>{line}<br /></span>)}</p>
                <a href={`mailto:${o.email}`} data-cursor="link">{o.email}</a>
                <a href={`tel:${o.phone.replace(/\s/g, '')}`} data-cursor="link">{o.phone}</a>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-inner">
          <SectionReveal>
            <h2 className="cta-title">Lernen Sie uns kennen.</h2>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <Button to="/kontakt">Kontakt aufnehmen</Button>
          </SectionReveal>
        </div>
      </section>

      <style>{`
        .un-hero { padding: 200px 0 100px; background: var(--bg-dark); color: var(--bg-light); }
        .un-title { font-size: clamp(44px, 8vw, 96px); margin: 20px 0 28px; }
        .un-sub { font-size: 19px; color: var(--grey-warm); max-width: 620px; }

        .section-title { font-size: clamp(32px, 5vw, 56px); margin-top: 16px; margin-bottom: 56px; }

        .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .value-card { padding: 44px 32px; border-radius: 20px; background: #fff; border: 1px solid var(--grey-line-dark); }
        .value-card h3 { font-family: var(--font-display); font-size: 28px; color: var(--copper); font-style: italic; margin-bottom: 16px; }
        .value-card p { color: var(--grey-warm); font-size: 15px; }

        .offices-section { background: var(--charcoal); color: var(--bg-light); }
        .offices-section .section-title { color: var(--bg-light); }
        .offices-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .office-card { padding: 36px; border: 1px solid var(--grey-line); border-radius: 20px; }
        .office-card h3 { font-family: var(--font-display); font-size: 26px; color: var(--copper); margin-bottom: 16px; }
        .office-card p { color: var(--grey-warm); font-size: 14px; margin-bottom: 16px; }
        .office-card a { display: block; font-size: 14px; margin-bottom: 6px; opacity: 0.85; }
        .office-card a:hover { color: var(--copper); opacity: 1; }

        .cta-section { text-align: center; }
        .cta-inner { display: flex; flex-direction: column; align-items: center; gap: 36px; }
        .cta-title { font-size: clamp(32px, 6vw, 64px); max-width: 700px; }

        @media (max-width: 860px) {
          .values-grid, .offices-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
