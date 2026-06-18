import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/webentwicklung', label: 'Webentwicklung' },
  { to: '/referenzen', label: 'Referenzen' },
  { to: '/ueber-novu', label: 'Über novu' },
  { to: '/kontakt', label: 'Kontakt' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="nav-logo" data-cursor="link">novu.</Link>
        <nav className="nav-links">
          {links.map(l => (
            <Link key={l.to} to={l.to} className={`nav-link ${location.pathname === l.to ? 'active' : ''}`} data-cursor="link">
              {l.label}
            </Link>
          ))}
        </nav>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Menü" data-cursor="link">
          <span /><span />
        </button>
      </div>

      <div className={`nav-mobile ${open ? 'open' : ''}`}>
        {links.map(l => (
          <Link key={l.to} to={l.to} className="nav-mobile-link" data-cursor="link">{l.label}</Link>
        ))}
      </div>

      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          padding: 28px 0;
          transition: padding 0.4s var(--ease-premium), background-color 0.4s var(--ease-premium), backdrop-filter 0.4s var(--ease-premium);
        }
        .nav-scrolled {
          padding: 16px 0;
          background: rgba(245, 244, 240, 0.85);
          backdrop-filter: blur(12px);
          box-shadow: 0 1px 0 var(--grey-line-dark);
        }
        .nav-inner { display: flex; align-items: center; justify-content: space-between; }
        .nav-logo { font-family: var(--font-display); font-size: 22px; font-weight: 600; color: var(--charcoal); }
        .nav-links { display: flex; gap: 40px; }
        .nav-link {
          font-size: 14px; font-weight: 500; color: var(--charcoal);
          position: relative; padding-bottom: 4px;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1.5px;
          background: var(--copper); transition: width 0.35s var(--ease-premium);
        }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .nav-toggle { display: none; flex-direction: column; gap: 5px; background: none; border: none; }
        .nav-toggle span { width: 24px; height: 1.5px; background: var(--charcoal); }
        .nav-mobile {
          display: none; flex-direction: column; gap: 24px;
          padding: 100px 24px 40px; position: fixed; inset: 0;
          background: var(--bg-light); z-index: 999;
          transform: translateY(-100%); transition: transform 0.4s var(--ease-premium);
        }
        .nav-mobile.open { transform: translateY(0); }
        .nav-mobile-link { font-family: var(--font-display); font-size: 28px; }

        @media (max-width: 860px) {
          .nav-links { display: none; }
          .nav-toggle { display: flex; }
          .nav-mobile { display: flex; }
        }
      `}</style>
    </header>
  );
}
