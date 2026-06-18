import { Link } from 'react-router-dom';
import { offices } from '../data/content.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <h2 className="footer-headline">Lassen Sie uns<br />gemeinsam etwas<br /><span className="accent">Grossartiges</span> bauen.</h2>
        <Link to="/kontakt" className="footer-cta" data-cursor="link">Projekt anfragen →</Link>
      </div>

      <div className="container footer-grid">
        {offices.map(o => (
          <div className="footer-office" key={o.city}>
            <h4>{o.city}</h4>
            <p>{o.address.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}</p>
            <a href={`mailto:${o.email}`} data-cursor="link">{o.email}</a>
            <a href={`tel:${o.phone.replace(/\s/g, '')}`} data-cursor="link">{o.phone}</a>
          </div>
        ))}
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} novu</span>
        <span>Code, Design & Konzept</span>
      </div>

      <style>{`
        .footer { background: var(--charcoal); color: var(--bg-light); padding-top: 120px; }
        .footer-top { padding-bottom: 100px; border-bottom: 1px solid var(--grey-line); }
        .footer-headline { font-size: clamp(36px, 6vw, 72px); font-weight: 400; max-width: 700px; }
        .accent { color: var(--copper); font-style: italic; }
        .footer-cta {
          display: inline-flex; margin-top: 40px; font-size: 16px; font-weight: 600;
          color: var(--bg-light); border-bottom: 1.5px solid var(--copper); padding-bottom: 6px;
        }
        .footer-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px;
          padding: 80px 0;
        }
        .footer-office h4 { font-family: var(--font-display); font-size: 22px; margin-bottom: 16px; color: var(--copper); }
        .footer-office p { color: var(--grey-warm); font-size: 14px; margin-bottom: 16px; }
        .footer-office a { display: block; font-size: 14px; margin-bottom: 6px; color: var(--bg-light); opacity: 0.8; }
        .footer-office a:hover { opacity: 1; color: var(--copper); }
        .footer-bottom {
          display: flex; justify-content: space-between; padding: 24px 0;
          border-top: 1px solid var(--grey-line); font-size: 13px; color: var(--grey-warm);
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr; gap: 32px; }
          .footer-bottom { flex-direction: column; gap: 8px; }
        }
      `}</style>
    </footer>
  );
}
