import { Link } from 'react-router-dom';

const BUTTON_STYLES = `
  .btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    padding: 0 32px;
    border-radius: 100px;
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 600;
    border: none;
    overflow: hidden;
    isolation: isolate;
  }
  .btn-primary { background: var(--copper); color: var(--bg-light); }
  .btn-secondary { background: transparent; color: var(--charcoal); border: 1.5px solid var(--charcoal); }
  .btn-inner { position: relative; display: block; overflow: hidden; height: 1.2em; }
  .btn-text {
    display: block;
    transition: transform 0.45s var(--ease-premium);
  }
  .btn-text-dup {
    position: absolute; top: 100%; left: 0;
  }
  .btn:hover .btn-text { transform: translateY(-100%); }
  .btn-primary:hover { background: var(--copper-light); }
  .btn-secondary:hover { border-color: var(--copper); color: var(--copper); }
  @media (prefers-reduced-motion: reduce) {
    .btn-text { transition: none; }
    .btn:hover .btn-text { transform: none; }
  }
`;

let stylesInjected = false;

function injectStyles() {
  if (stylesInjected) return;
  const style = document.createElement('style');
  style.textContent = BUTTON_STYLES;
  document.head.appendChild(style);
  stylesInjected = true;
}

export default function Button({ children, to, href, variant = 'primary', onClick, type = 'button' }) {
  injectStyles();

  const className = `btn btn-${variant}`;
  const content = (
    <span className="btn-inner">
      <span className="btn-text">{children}</span>
      <span className="btn-text btn-text-dup" aria-hidden="true">{children}</span>
    </span>
  );

  if (to) return <Link to={to} className={className} data-cursor="link">{content}</Link>;
  if (href) return <a href={href} className={className} data-cursor="link">{content}</a>;
  return <button type={type} onClick={onClick} className={className} data-cursor="link">{content}</button>;
}
