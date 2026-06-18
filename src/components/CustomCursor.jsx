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

    let raf;
    const dot = dotRef.current;
    const r = ringRef.current;

    const handleMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
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

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('mouseover', handleHoverIn);
    window.addEventListener('mouseout', handleHoverOut);
    raf = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('mouseover', handleHoverIn);
      window.removeEventListener('mouseout', handleHoverOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .cursor-dot {
            position: fixed; top: 0; left: 0; width: 6px; height: 6px;
            background: var(--copper); border-radius: 50%;
            pointer-events: none; z-index: 9999; will-change: transform;
          }
          .cursor-ring {
            position: fixed; top: 0; left: 0; width: 32px; height: 32px;
            border: 1.5px solid var(--copper); border-radius: 50%;
            pointer-events: none; z-index: 9998; will-change: transform;
            transition: width 0.25s var(--ease-premium), height 0.25s var(--ease-premium),
                        border-color 0.25s var(--ease-premium), background-color 0.25s var(--ease-premium);
          }
          .cursor-ring.cursor-hover {
            width: 56px; height: 56px; background: rgba(201, 84, 44, 0.1);
            margin: -12px 0 0 -12px;
          }
          .cursor-ring.cursor-active { width: 24px; height: 24px; }
        }
        @media (hover: none), (pointer: coarse) {
          .cursor-dot, .cursor-ring { display: none; }
        }
      `}</style>
    </>
  );
}
