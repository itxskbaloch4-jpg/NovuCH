import { useEffect, useState } from 'react';
import gsap from 'gsap';
import SectionReveal from '../components/SectionReveal.jsx';
import Button from '../components/Button.jsx';
import { offices } from '../data/content.js';

export default function Kontakt() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = 'Kontakt — novu | Bern, Zürich, Basel';
    const ctx = gsap.context(() => {
      gsap.fromTo('.kt-hero-line', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.1
      });
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <section className="kt-hero">
        <div className="container">
          <span className="eyebrow kt-hero-line">Sprechen wir</span>
          <h1 className="kt-title kt-hero-line">Kontakt</h1>
          <p className="kt-sub kt-hero-line">
            Erzählen Sie uns von Ihrem Projekt — wir melden uns innerhalb
            von 24 Stunden zurück.
          </p>
        </div>
      </section>

      <section className="section kt-main">
        <div className="container kt-grid">
          <SectionReveal className="kt-form-wrap">
            {sent ? (
              <div className="kt-success">
                <h3>Vielen Dank!</h3>
                <p>Ihre Nachricht wurde übermittelt. Wir melden uns in Kürze.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="kt-form">
                <label>
                  Name
                  <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </label>
                <label>
                  E-Mail
                  <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </label>
                <label>
                  Nachricht
                  <textarea rows="5" required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </label>
                <Button type="submit">Nachricht senden</Button>
              </form>
            )}
          </SectionReveal>

          <SectionReveal delay={0.1} className="kt-offices">
            {offices.map(o => (
              <div className="kt-office" key={o.city}>
                <h4>{o.city}</h4>
                <p>{o.address.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</p>
                <a href={`mailto:${o.email}`} data-cursor="link">{o.email}</a>
                <a href={`tel:${o.phone.replace(/\s/g, '')}`} data-cursor="link">{o.phone}</a>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      <style>{`
        .kt-hero { padding: 200px 0 80px; background: var(--bg-dark); color: var(--bg-light); }
        .kt-title { font-size: clamp(44px, 8vw, 96px); margin: 20px 0 28px; }
        .kt-sub { font-size: 19px; color: var(--grey-warm); max-width: 560px; }

        .kt-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 64px; }
        .kt-form { display: flex; flex-direction: column; gap: 24px; }
        .kt-form label { display: flex; flex-direction: column; gap: 8px; font-size: 14px; font-weight: 600; color: var(--charcoal); }
        .kt-form input, .kt-form textarea {
          font-family: var(--font-body); font-size: 15px; padding: 14px 18px;
          border: 1.5px solid var(--grey-line-dark); border-radius: 12px;
          background: #fff; color: var(--charcoal); resize: vertical;
          transition: border-color 0.3s var(--ease-premium);
        }
        .kt-form input:focus, .kt-form textarea:focus { outline: none; border-color: var(--copper); }
        .kt-success { padding: 48px; border-radius: 20px; background: #fff; border: 1px solid var(--grey-line-dark); }
        .kt-success h3 { font-family: var(--font-display); font-size: 28px; color: var(--copper); margin-bottom: 12px; }

        .kt-offices { display: flex; flex-direction: column; gap: 32px; }
        .kt-office { padding: 28px; border-radius: 16px; background: var(--charcoal); color: var(--bg-light); }
        .kt-office h4 { font-family: var(--font-display); font-size: 22px; color: var(--copper); margin-bottom: 12px; }
        .kt-office p { color: var(--grey-warm); font-size: 14px; margin-bottom: 12px; }
        .kt-office a { display: block; font-size: 14px; margin-bottom: 6px; opacity: 0.85; }
        .kt-office a:hover { opacity: 1; color: var(--copper); }

        @media (max-width: 860px) {
          .kt-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
