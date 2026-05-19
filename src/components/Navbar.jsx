import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLang } from '../hooks/useLang';
import './Navbar.css';

const LANGS = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'ur', label: 'اردو', full: 'Urdu' },
  { code: 'fr', label: 'FR', full: 'Français' },
  { code: 'ar', label: 'عربي', full: 'العربية' },
];

const NAV = [
  { label: 'About', to: '/about' },
  {
    label: 'Products',
    mega: true,
    groups: [
      {
        title: 'By Brand',
        links: [
          { label: 'Pharma & Nutra Excipients', to: '/products/pharma-nutra' },
          { label: 'M.A. Kamil Farma Line', to: '/products/kamil-farma' },
          { label: 'Rotamin Line', to: '/products/rotamin' },
          { label: 'Pet Care', to: '/products/pet-care' },
          { label: 'Indenting Division', to: '/products/indenting' },
        ]
      },
      {
        title: 'By Species',
        links: [
          { label: 'Poultry', to: '/products?species=poultry' },
          { label: 'Dairy & Livestock', to: '/products?species=dairy' },
          { label: 'Aquaculture', to: '/products?species=aqua' },
          { label: 'Pet Animals', to: '/products?species=pets' },
        ]
      },
      {
        title: 'By Form',
        links: [
          { label: 'Powder Formulations', to: '/products?form=powder' },
          { label: 'Liquid Formulations', to: '/products?form=liquid' },
          { label: 'Penicillin Range', to: '/products?form=penicillin' },
        ]
      },
      {
        title: 'Featured',
        links: [
          { label: 'Feed Additives', to: 'https://feedadditives.makamilfarma.com', external: true },
        ]
      },
    ]
  },
  { label: 'Industries', to: '/industries' },
  { label: 'Science', to: '/science' },
  { label: 'Blog', to: '/blog' },
  { label: 'Join Us', to: '/join' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(null);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang } = useLang();
  const location = useLocation();
  const timeoutRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(null);
  }, [location]);

  const handleMouseEnter = (label) => {
    clearTimeout(timeoutRef.current);
    setMegaOpen(label);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setMegaOpen(null), 120);
  };

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      {/* Top bar */}
      <div className="nav__topbar">
        <div className="container nav__topbar-inner">
          <span className="nav__topbar-text">Expo 2026 Participation — <Link to="/expo2025" className="nav__topbar-link">Register Interest →</Link></span>
          <div className="nav__topbar-right">
            <a href="https://feedadditives.makamilfarma.com" target="_blank" rel="noopener noreferrer" className="nav__topbar-link">Feed Additives ↗</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="nav__main">
        <div className="container nav__main-inner">
          {/* Logo */}
          <Link to="/" className="nav__logo">
            <div className="nav__logo-icon">
              <span>MA</span>
              <div className="nav__logo-dot" />
            </div>
            <div className="nav__logo-text">
              <span className="nav__logo-name">M.A. Kamil Farma</span>
              <span className="nav__logo-est">Pvt. Ltd. · Est. 1923</span>
            </div>
          </Link>

          {/* Desktop links */}
          <nav className="nav__links">
            {NAV.map(item =>
              item.mega ? (
                <div
                  key={item.label}
                  className="nav__item nav__item--mega"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className={`nav__link ${megaOpen === item.label ? 'nav__link--open' : ''}`}>
                    {item.label}
                    <svg className="nav__chevron" width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
                  </button>
                  {megaOpen === item.label && (
                    <div className="nav__mega"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}>
                      {item.groups.map(g => (
                        <div key={g.title} className="nav__mega-group">
                          <div className="nav__mega-title">{g.title}</div>
                          {g.links.map(l => 
                            l.external ? (
                              <a key={l.to} href={l.to} target="_blank" rel="noopener noreferrer" className="nav__mega-link nav__mega-link--btn">{l.label} ↗</a>
                            ) : (
                              <Link key={l.to} to={l.to} className="nav__mega-link">{l.label}</Link>
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink key={item.to} to={item.to}
                  className={({ isActive }) => `nav__link${isActive ? ' nav__link--active' : ''}`}>
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          {/* Right side */}
          <div className="nav__actions">
            {/* Language toggle */}
            <div className="nav__lang" onMouseLeave={() => setLangOpen(false)}>
              <button className="nav__lang-btn" onMouseEnter={() => setLangOpen(true)} onClick={() => setLangOpen(!langOpen)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
                {LANGS.find(l => l.code === lang)?.label}
              </button>
              {langOpen && (
                <div className="nav__lang-dropdown">
                  {LANGS.map(l => (
                    <button key={l.code}
                      className={`nav__lang-option ${lang === l.code ? 'active' : ''}`}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}>
                      <span>{l.label}</span>
                      <span className="nav__lang-full">{l.full}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/contact" className="btn btn--gold nav__cta">Get in Touch</Link>
          </div>

          {/* Hamburger */}
          <button className={`nav__burger ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(!mobileOpen)}>
            <span/><span/><span/>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="nav__mobile">
          {NAV.map(item =>
            item.mega ? (
              <div key={item.label}>
                <button className="nav__mobile-parent" onClick={() => setMegaOpen(megaOpen === item.label ? null : item.label)}>
                  {item.label}
                  <svg className={`nav__chevron ${megaOpen === item.label ? 'open' : ''}`} width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
                </button>
                {megaOpen === item.label && item.groups.map(g => (
                  <div key={g.title}>
                    <div className="nav__mobile-group">{g.title}</div>
                    {g.links.map(l => <Link key={l.to} to={l.to} className="nav__mobile-child">{l.label}</Link>)}
                  </div>
                ))}
              </div>
            ) : (
              <NavLink key={item.to} to={item.to} className="nav__mobile-link">{item.label}</NavLink>
            )
          )}
          <div className="nav__mobile-langs">
            {LANGS.map(l => (
              <button key={l.code} className={`nav__mobile-lang ${lang === l.code ? 'active' : ''}`} onClick={() => { setLang(l.code); }}>
                {l.full}
              </button>
            ))}
          </div>
          <a href="https://feedadditives.makamilfarma.com" target="_blank" rel="noopener noreferrer" className="nav__mobile-ext">
            Feed Additives ↗
          </a>
        </div>
      )}
    </header>
  );
}
