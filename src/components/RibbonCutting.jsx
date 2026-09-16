import { useEffect, useMemo, useRef, useState } from 'react';
import './RibbonCutting.css';

const SESSION_KEY = 'ma-kamil-ribbon-cut';

export default function RibbonCutting() {
  const [phase, setPhase] = useState('idle'); // idle -> cutting -> revealing -> done
  const [cutPoint, setCutPoint] = useState(null); // { x, y } in viewport coords
  const [viewport, setViewport] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1280,
    h: typeof window !== 'undefined' ? window.innerHeight : 800,
  }));
  const stageRef = useRef(null);
  const triggeredRef = useRef(false);

  // Skip the ceremony if it already played earlier in this browser session.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === '1') setPhase('done');
    } catch {
      /* sessionStorage unavailable (private mode etc.) — show it anyway */
    }
  }, []);

  // Lock page scroll while the overlay is up.
  useEffect(() => {
    document.body.style.overflow = phase === 'done' ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [phase]);

  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // The ribbon runs as a thin diagonal sash from the top-right corner to the
  // bottom-left corner. All geometry is derived once per viewport size.
  const geo = useMemo(() => {
    const { w, h } = viewport;
    const cx = w / 2;
    const cy = h / 2;
    // Direction from top-right (w,0) to bottom-left (0,h), as a CSS rotate angle.
    const angleDeg = (Math.atan2(h, -w) * 180) / Math.PI;
    const length = Math.hypot(w, h);
    const halfLength = length / 2;
    // Midpoints of each half once the ribbon is cut at its center.
    const midTopRight = { x: (cx + w) / 2, y: (cy + 0) / 2 };
    const midBottomLeft = { x: (cx + 0) / 2, y: (cy + h) / 2 };
    return { cx, cy, angleDeg, length, halfLength, midTopRight, midBottomLeft };
  }, [viewport]);

  const triggerCut = (x, y) => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    setCutPoint({ x, y });
    setPhase('cutting');
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* ignore */ }

    window.setTimeout(() => setPhase('revealing'), 650);
    window.setTimeout(() => setPhase('done'), 1750);
  };

  // Merely crossing the ribbon with the pointer — no click needed — cuts it,
  // same as an actual click/tap or a drag across it.
  const handlePointerEnter = (e) => {
    if (phase !== 'idle') return;
    triggerCut(e.clientX, e.clientY);
  };

  const handlePointerMove = (e) => {
    if (phase !== 'idle') return;
    triggerCut(e.clientX, e.clientY);
  };

  const handleKeyDown = (e) => {
    if (phase !== 'idle') return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerCut(geo.cx, geo.cy);
    }
  };

  // Confetti burst — computed once, right when the cut happens.
  const confetti = useMemo(() => {
    if (phase === 'idle') return [];
    const colors = ['#e63946', '#ef5b63', 'var(--gold)', 'var(--gold-light)', 'var(--white)'];
    return Array.from({ length: 46 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[i % colors.length],
      delay: Math.random() * 0.35,
      duration: 1.6 + Math.random() * 1.1,
      drift: Math.round((Math.random() - 0.5) * 160),
      rotate: Math.round(Math.random() * 360),
      size: 6 + Math.random() * 7,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase === 'idle']);

  if (phase === 'done') return null;

  const cut = cutPoint ?? { x: geo.cx, y: geo.cy };

  return (
    <div className={`ribbon-overlay phase-${phase}`} style={{ '--angle': `${geo.angleDeg}deg` }}>
      <div className="ribbon-curtain ribbon-curtain-left" />
      <div className="ribbon-curtain ribbon-curtain-right" />

      <div className="ribbon-content">
        <p className="ribbon-eyebrow">M.A Kamil Farma</p>
        <h1 className="ribbon-title">Official Website Launch</h1>
        <p className="ribbon-hint">
          {phase === 'idle' ? 'Move your mouse across the ribbon to cut it' : 'Welcome aboard!'}
        </p>
      </div>

      {phase === 'idle' ? (
        <div
          ref={stageRef}
          className="ribbon-stage"
          role="button"
          tabIndex={0}
          aria-label="Cut the ribbon to enter the site"
          style={{
            left: geo.cx,
            top: geo.cy,
            width: geo.length,
          }}
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onKeyDown={handleKeyDown}
        >
          <div className="ribbon-band">
            <div className="ribbon-knot">
              <span className="ribbon-knot-loop ribbon-knot-loop-top" />
              <span className="ribbon-knot-loop ribbon-knot-loop-bottom" />
              <span className="ribbon-knot-center" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className="ribbon-half ribbon-half-tr"
            style={{ left: geo.midTopRight.x, top: geo.midTopRight.y, width: geo.halfLength }}
          />
          <div
            className="ribbon-half ribbon-half-bl"
            style={{ left: geo.midBottomLeft.x, top: geo.midBottomLeft.y, width: geo.halfLength }}
          />
          <span className="ribbon-scissors" style={{ left: cut.x, top: cut.y }} aria-hidden="true">✂️</span>
        </>
      )}

      {phase !== 'idle' && (
        <div className="ribbon-confetti" aria-hidden="true">
          {confetti.map((c) => (
            <span
              key={c.id}
              className="confetti-piece"
              style={{
                left: `${c.left}%`,
                background: c.color,
                width: c.size,
                height: c.size * 2.4,
                animationDelay: `${c.delay}s`,
                animationDuration: `${c.duration}s`,
                '--drift': `${c.drift}px`,
                '--rotate': `${c.rotate}deg`,
              }}
            />
          ))}
        </div>
      )}

      {phase === 'idle' && (
        <button type="button" className="ribbon-skip" onClick={() => triggerCut(geo.cx, geo.cy)}>
          Skip intro →
        </button>
      )}
    </div>
  );
}
