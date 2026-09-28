import { useEffect, useRef, useState } from 'react';
import { useLang } from '../hooks/useLang';
import { LANGUAGES, getLanguage } from '../i18n/languages';

/**
 * Globe button + dropdown for switching the site language. Opens on mouse
 * hover or on click/tap, and closes on outside click or Escape.
 * Marked translate="no" so language names are never run through the
 * page translator.
 */
export default function LanguageMenu({ className = '' }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className={`nav__lang ${className}`}
      translate="no"
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') setOpen(true); }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') setOpen(false); }}
    >
      <button
        type="button"
        className="nav__lang-btn"
        aria-haspopup="true"
        aria-expanded={open}
        // With a mouse, hovering already opened the menu, so a click must not
        // toggle it shut again; touch and keyboard users toggle with a click.
        onClick={(e) => setOpen(e.nativeEvent.pointerType === 'mouse' ? true : !open)}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
        <span lang={getLanguage(lang).htmlLang}>{getLanguage(lang).label}</span>
      </button>
      {open && (
        <div className="nav__lang-dropdown">
          {LANGUAGES.map(l => (
            <button
              type="button"
              key={l.code}
              className={`nav__lang-option ${lang === l.code ? 'active' : ''}`}
              onClick={() => { setLang(l.code); setOpen(false); }}
            >
              <span lang={l.htmlLang}>{l.label}</span>
              <span className="nav__lang-full" lang={l.htmlLang}>{l.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
