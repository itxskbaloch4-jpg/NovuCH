import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || reduced) return;

    // Hide the native cursor only when our custom cursor is actually active
    document.body.style.cursor = 'none';

    let raf;
    const dot = dotRef.current;
    const r = ringRef.current;

    // Show cursor immediately on first mouse move (avoids it being stuck at 0,0)
    let hasMoved = false;

    const handleMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;

      if (!hasMoved) {
        hasMoved = true;
        ring.current.x = e.clientX;
        ring.current.y = e.clientY;
        dot.style.opacity = '1';
        r.style.opacity = '1';
      }
    };

    const animateRing = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18;
      ring.current.y += (pos.current.y - ring.current.y) * 0.18;
      r.style.transform = `translate3d(${ring.current.x - 16}px, ${ring.current.y - 16}px, 0)`;
      raf = requestAnimationFrame(animateRing);
    };

    const handleDown = () => r.classList.add('cursor-active');
    const handleUp = () => r.classList.remove('cursor-active');

    const handleHoverIn = (e) => {
      if (e.target.closest('a, button, [data-cursor="link"]')) r.classList.add('cursor-hover');
    };
    const handleHoverOut = (e) => {
      if (e.target.closest('a, button, [data-cursor="link"]')) r.classList.remove('cursor-hover');
    };

    // Hide cursor when it leaves the window, show again when it re-enters
    const handleLeave = () => {
      dot.style.opacity = '0';
      r.style.opacity = '0';
    };
    const handleEnter = () => {
      if (hasMoved) {
        dot.style.opacity = '1';
        r.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('mouseover', handleHoverIn);
    window.addEventListener('mouseout', handleHoverOut);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    raf = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('mouseover', handleHoverIn);
      window.removeEventListener('mouseout', handleHoverOut);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      cancelAnimationFrame(raf);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <style>{`
        :root {
          --copper: #c9542c;
          --ease-premium: cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (hover: hover) and (pointer: fine) {
          .cursor-dot {
            position: fixed;
            top: 0;
            left: 0;
            width: 6px;
            height: 6px;
            background: var(--copper, #c9542c);
            border-radius: 50%;
            pointer-events: none;
            z-index: 999999;
            will-change: transform;
            opacity: 0;
            transition: opacity 0.2s ease;
          }

          .cursor-ring {
            position: fixed;
            top: 0;
            left: 0;
            width: 32px;
            height: 32px;
            border: 1.5px solid var(--copper, #c9542c);
            border-radius: 50%;
            pointer-events: none;
            z-index: 999998;
            will-change: transform;
            opacity: 0;
            transition:
              width 0.25s var(--ease-premium, ease),
              height 0.25s var(--ease-premium, ease),
              border-color 0.25s var(--ease-premium, ease),
              background-color 0.25s var(--ease-premium, ease),
              margin 0.25s var(--ease-premium, ease),
              opacity 0.2s ease;
          }

          .cursor-ring.cursor-hover {
            width: 56px;
            height: 56px;
            background: rgba(201, 84, 44, 0.1);
            margin: -12px 0 0 -12px;
          }

          .cursor-ring.cursor-active {
            width: 24px;
            height: 24px;
            margin: 4px 0 0 4px;
          }
        }

        @media (hover: none), (pointer: coarse) {
          .cursor-dot,
          .cursor-ring {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
