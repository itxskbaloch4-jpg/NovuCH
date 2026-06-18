import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroCanvas from '../components/HeroCanvas.jsx';
import SectionReveal from '../components/SectionReveal.jsx';
import Button from '../components/Button.jsx';
import { clientLogos, techStack, angebote, referenzen, heroPoints } from '../data/content.js';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroTextRef = useRef(null);
  const parallaxRef = useRef(null);

  useEffect(() => {
    document.title = 'novu — Code, Design & Konzept | Digitalagentur Zürich Bern Basel';

    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-line', { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.2
      });
      gsap.fromTo('.hero-sub', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 1, delay: 0.7, ease: 'power3.out'
      });

      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: { trigger: parallaxRef.current, start: 'top top', end: 'bottom top', scrub: true }
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero" ref={heroTextRef}>
        <HeroCanvas />
        <div className="container hero-content">
          <span className="eyebrow hero-line">Digitalagentur Bern · Zürich · Basel</span>
          <h1 className="hero-title">
            <span className="hero-line block">Code, Design</span>
            <span className="hero-line block">&amp; <em>Konzept</em>.</span>
          </h1>
          <p className="hero-sub">
            Wir entwickeln Software, Web Applikationen, Apps und Webseiten —
            mit Fokus auf User Experience und messbare Resultate.
          </p>
          <div className="hero-cta hero-sub">
            <Button to="/kontakt">Projekt starten</Button>
            <Button to="/referenzen" variant="secondary">Referenzen ansehen</Button>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span /> Scrollen
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust-strip">
        <div className="container">
          <SectionReveal>
            <p className="trust-label">Vertraut von führenden Schweizer Unternehmen</p>
          </SectionReveal>
          <div className="logo-marquee">
            <div className="logo-track">
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <span key={i} className="logo-item">{logo}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HERO POINTS */}
      <section className="section points">
        <div className="container">
          <div className="points-grid">
            {heroPoints.map((p, i) => (
              <SectionReveal key={p.num} delay={i * 0.1} className="point-card">
                <span className="point-num">{p.num}</span>
                <h3>{p.title}</h3>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ANGEBOTE */}
      <section className="section angebote-section" ref={parallaxRef}>
        <div className="container">
          <SectionReveal>
            <span className="eyebrow">Was wir tun</span>
            <h2 className="section-title">Unsere Angebote</h2>
          </SectionReveal>
          <div className="angebote-grid">
            {angebote.map((a, i) => (
              <SectionReveal key={a.slug} delay={(i % 3) * 0.08} className="angebot-card" as="article">
                <span className="angebot-index">{String(i + 1).padStart(2, '0')}</span>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* REFERENZEN PREVIEW */}
      <section className="section referenzen-preview">
        <div className="container">
          <SectionReveal>
            <span className="eyebrow">Ausgewählte Projekte</span>
            <h2 className="section-title">Referenzen</h2>
          </SectionReveal>
          <div className="ref-list">
            {referenzen.map((r, i) => (
              <SectionReveal key={r.title} delay={i * 0.08} as="div" className="ref-row">
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

      {/* TECH STACK */}
      <section className="section tech-section">
        <div className="container">
          <SectionReveal>
            <span className="eyebrow">Technologien</span>
            <h2 className="section-title">Unser Tech-Stack</h2>
          </SectionReveal>
          <SectionReveal className="tech-grid">
            {techStack.map(t => <span key={t} className="tech-chip">{t}</span>)}
          </SectionReveal>
        </div>
      </section>

      <style>{`
        .hero {
          position: relative; min-height: 100vh; display: flex; align-items: center;
          background: var(--bg-dark); color: var(--bg-light); overflow: hidden;
        }
        .hero-content { position: relative; z-index: 2; padding-top: 80px; }
        .hero-title { font-size: clamp(48px, 9vw, 128px); margin: 24px 0 32px; }
        .hero-title em { font-style: italic; color: var(--copper); font-weight: 400; }
        .block { display: block; }
        .hero-sub { font-size: 19px; max-width: 560px; color: var(--grey-warm); margin-bottom: 40px; }
        .hero-cta { display: flex; gap: 16px; flex-wrap: wrap; }
        .hero-cta .btn-secondary { color: var(--bg-light); border-color: rgba(245,244,240,0.3); }
        .hero-scroll-hint {
          position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          font-size: 12px; letter-spacing: 0.08em; color: var(--grey-warm); z-index: 2;
        }
        .hero-scroll-hint span {
          width: 1px; height: 36px; background: linear-gradient(to bottom, var(--copper), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }

        .trust-strip { padding: 60px 0; background: var(--charcoal); }
        .trust-label { color: var(--grey-warm); font-size: 13px; text-align: center; margin-bottom: 32px; letter-spacing: 0.04em; }
        .logo-marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
        .logo-track { display: flex; gap: 64px; width: max-content; animation: marquee 28s linear infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .logo-item { font-family: var(--font-display); font-size: 22px; color: var(--bg-light); opacity: 0.5; white-space: nowrap; }

        .points-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .point-card { padding: 40px 32px; border: 1px solid var(--grey-line-dark); border-radius: 20px; background: #fff; }
        .point-num { font-family: var(--font-display); font-size: 14px; color: var(--copper); font-weight: 600; }
        .point-card h3 { font-size: 22px; margin-top: 16px; font-weight: 500; }

        .section-title { font-size: clamp(32px, 5vw, 56px); margin-top: 16px; margin-bottom: 56px; }

        .angebote-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--grey-line-dark); border-radius: 24px; overflow: hidden; }
        .angebot-card { background: var(--bg-light); padding: 48px 36px; transition: background 0.4s var(--ease-premium); }
        .angebot-card:hover { background: #fff; }
        .angebot-index { font-family: var(--font-display); color: var(--copper); font-size: 14px; }
        .angebot-card h3 { font-size: 24px; margin: 20px 0 12px; font-weight: 500; }
        .angebot-card p { color: var(--grey-warm); font-size: 15px; }

        .ref-list { display: flex; flex-direction: column; }
        .ref-row { padding: 36px 0; border-bottom: 1px solid var(--grey-line-dark); display: grid; grid-template-columns: 1fr 2fr; gap: 32px; align-items: baseline; }
        .ref-row h3 { font-size: 28px; font-weight: 500; }
        .ref-row p { color: var(--grey-warm); font-size: 16px; max-width: 480px; }
        .ref-cta-wrap { margin-top: 48px; display: flex; justify-content: center; }

        .tech-grid { display: flex; flex-wrap: wrap; gap: 14px; }
        .tech-chip {
          padding: 12px 22px; border-radius: 100px; border: 1px solid var(--grey-line-dark);
          font-size: 14px; font-weight: 500; color: var(--charcoal); transition: all 0.3s var(--ease-premium);
        }
        .tech-chip:hover { background: var(--copper); color: var(--bg-light); border-color: var(--copper); }

        @media (max-width: 860px) {
          .points-grid, .angebote-grid { grid-template-columns: 1fr; }
          .ref-row { grid-template-columns: 1fr; gap: 8px; }
        }
      `}</style>
    </>
  );
}
