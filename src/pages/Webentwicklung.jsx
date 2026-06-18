import { useEffect } from 'react';
import gsap from 'gsap';
import SectionReveal from '../components/SectionReveal.jsx';
import Button from '../components/Button.jsx';
import { techStack, referenzen } from '../data/content.js';

const processSteps = [
  { num: '01', title: 'Konzept & Beratung', desc: 'Wir analysieren Ihre Anforderungen und entwickeln eine massgeschneiderte Strategie für Ihre Web Applikation.' },
  { num: '02', title: 'UX-UI Design', desc: 'Durchdachtes Interface-Design mit Fokus auf User Experience und messbare Resultate.' },
  { num: '03', title: 'Entwicklung', desc: 'Saubere, skalierbare Software-Entwicklung mit modernen Frameworks und Best Practices.' },
  { num: '04', title: 'Testing & Launch', desc: 'User Testings mit fertigen Prototypes vor dem erfolgreichen Go-Live.' }
];

export default function Webentwicklung() {
  useEffect(() => {
    document.title = 'Webentwicklung — novu | Professionelle Webentwicklung Bern & Zürich';
    const ctx = gsap.context(() => {
      gsap.fromTo('.we-hero-line', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.1
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="we-hero">
        <div className="container">
          <span className="eyebrow we-hero-line">Angebot</span>
          <h1 className="we-title we-hero-line">Webentwicklung</h1>
          <p className="we-sub we-hero-line">
            Professionelle Webentwicklung in Bern und Zürich — individuelle
            Software-Lösungen für komplexe Anforderungen, gebaut für Skalierbarkeit
            und Performance.
          </p>
          <div className="we-hero-line">
            <Button to="/kontakt">Projekt anfragen</Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionReveal>
            <span className="eyebrow">Unser Prozess</span>
            <h2 className="section-title">Von der Idee zum Go-Live</h2>
          </SectionReveal>
          <div className="process-grid">
            {processSteps.map((s, i) => (
              <SectionReveal key={s.num} delay={i * 0.08} className="process-card">
                <span className="process-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section tech-section-alt">
        <div className="container">
          <SectionReveal>
            <span className="eyebrow">Tech-Stack</span>
            <h2 className="section-title">Womit wir bauen</h2>
          </SectionReveal>
          <SectionReveal className="tech-grid">
            {techStack.map(t => <span key={t} className="tech-chip">{t}</span>)}
          </SectionReveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionReveal>
            <span className="eyebrow">Beispiele</span>
            <h2 className="section-title">Projekte aus der Webentwicklung</h2>
          </SectionReveal>
          <div className="ref-list">
            {referenzen.slice(0, 3).map((r, i) => (
              <SectionReveal key={r.title} delay={i * 0.08} className="ref-row">
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </SectionReveal>
            ))}
          </div>
          <SectionReveal className="ref-cta-wrap">
            <Button to="/referenzen" variant="secondary">Alle Referenzen ansehen</Button>
          </SectionReveal>
        </div>
      </section>

      <style>{`
        .we-hero { padding: 200px 0 120px; background: var(--bg-dark); color: var(--bg-light); }
        .we-title { font-size: clamp(44px, 8vw, 96px); margin: 20px 0 28px; }
        .we-sub { font-size: 19px; color: var(--grey-warm); max-width: 600px; margin-bottom: 36px; }

        .section-title { font-size: clamp(32px, 5vw, 56px); margin-top: 16px; margin-bottom: 56px; }

        .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--grey-line-dark); border-radius: 24px; overflow: hidden; }
        .process-card { background: var(--bg-light); padding: 40px 28px; transition: background 0.4s var(--ease-premium); }
        .process-card:hover { background: #fff; }
        .process-num { font-family: var(--font-display); color: var(--copper); font-size: 14px; }
        .process-card h3 { font-size: 20px; margin: 18px 0 10px; font-weight: 500; }
        .process-card p { color: var(--grey-warm); font-size: 14px; }

        .tech-section-alt { background: var(--charcoal); color: var(--bg-light); }
        .tech-section-alt .section-title { color: var(--bg-light); }
        .tech-grid { display: flex; flex-wrap: wrap; gap: 14px; }
        .tech-chip {
          padding: 12px 22px; border-radius: 100px; border: 1px solid var(--grey-line);
          font-size: 14px; font-weight: 500; transition: all 0.3s var(--ease-premium);
        }
        .tech-section-alt .tech-chip { color: var(--bg-light); }
        .tech-chip:hover { background: var(--copper); color: var(--bg-light); border-color: var(--copper); }

        .ref-list { display: flex; flex-direction: column; }
        .ref-row { padding: 36px 0; border-bottom: 1px solid var(--grey-line-dark); display: grid; grid-template-columns: 1fr 2fr; gap: 32px; align-items: baseline; }
        .ref-row h3 { font-size: 28px; font-weight: 500; }
        .ref-row p { color: var(--grey-warm); font-size: 16px; max-width: 480px; }
        .ref-cta-wrap { margin-top: 48px; display: flex; justify-content: center; }

        @media (max-width: 860px) {
          .process-grid { grid-template-columns: 1fr; }
          .ref-row { grid-template-columns: 1fr; gap: 8px; }
        }
      `}</style>
    </>
  );
}
