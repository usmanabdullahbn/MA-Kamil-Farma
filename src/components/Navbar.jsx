import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useLang } from '../hooks/useLang';
import farmaLogo from '../assert/Farma Logo.jpg';
import './Navbar.css';

const LANGS = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'ur', label: 'اردو', full: 'Urdu' },
  { code: 'fr', label: 'FR', full: 'Français' },
  { code: 'ar', label: 'عربي', full: 'العربية' },
];

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  {
    label: 'Products',
    mega: true,
    groups: [
      {
        title: 'By Brand',
        links: [
          { label: 'Farma Line', to: '/products/kamil-farma' },
        ]
      },
      {
        title: 'By Species',
        links: [
          { label: 'Poultry', to: '/products?species=poultry' },
          { label: 'Dairy & Livestock', to: '/products?species=dairy' },
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

const THERAPEUTIC_AREAS = [
  { label: 'Antibiotics', icon: 'shield' },
  { label: 'Respiratory Health', icon: 'lungs' },
  { label: 'Gut Health', icon: 'gut' },
  { label: 'Liver Support', icon: 'leaf' },
  { label: 'Vitamins & Minerals', icon: 'molecule' },
  { label: 'Electrolytes', icon: 'drop' },
  { label: 'Feed Additives', icon: 'sprout' },
  { label: 'Performance Enhancers', icon: 'chart' },
  { label: 'Biosecurity', icon: 'shield' },
];

const SPECIES_LINKS = [
  { label: 'Poultry', text: 'Solutions for modern poultry production', to: '/products?species=poultry', className: 'poultry' },
  { label: 'Dairy', text: 'Supporting dairy health and productivity', to: '/products?species=dairy', className: 'dairy' },
  { label: 'Livestock', text: 'Complete care for livestock and ruminants', to: '/products?species=livestock', className: 'livestock' },
  { label: 'Companion Animals', text: 'Coming Soon', to: '/products?species=pets', className: 'companion' },
];

const SCIENCE_LINKS = [
  { label: 'Product Catalogue', text: 'Complete portfolio overview', icon: 'book', to: '/products' },
  { label: 'Product Information Sheets', text: 'Technical data & specifications', icon: 'file', to: '/products' },
  { label: 'Trial Data', text: 'Efficacy & field results', icon: 'flask', to: '/science' },
  { label: 'Technical Articles', text: 'Expert insights & knowledge', icon: 'book', to: '/blog' },
  { label: 'Dosage Calculator', text: 'Calculate accurate dosages', icon: 'calculator', to: '/contact' },
];

const FEATURED_SOLUTIONS = [
  { label: 'Poultry Nutrition', text: 'Integrated health and performance solutions for commercial poultry operations', to: '/products?species=poultry', className: 'poultry' },
  { label: 'Feed Additives', text: 'Advanced nutritional technologies supporting productivity and efficiency.', to: 'https://feedadditives.makamilfarma.com', external: true, className: 'feed' },
  { label: 'New Product Launches', text: 'Explore the latest additions to the M.A. Kamil Farma portfolio.', to: '/products', className: 'launch' },
];

const QUICK_ACTIONS = [
  { label: 'Download Catalogue', text: 'Complete product portfolio', icon: 'download', to: '/products' },
  { label: 'PIS Sheets', text: 'Product Information Sheets', icon: 'file', to: '/products' },
  { label: 'Trial Data', text: 'Efficacy & field studies', icon: 'flask', to: '/science' },
  { label: 'Dosage Calculator', text: 'Calculate accurate dosages', icon: 'calculator', to: '/contact' },
  { label: 'Technical Enquiry', text: 'Contact our technical team', icon: 'mail', to: '/contact' },
];

function ProductMegaMenu({ onMouseEnter, onMouseLeave }) {
  return (
    <div className="nav__mega nav__mega--products" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="nav-products-mega__content">
        <MegaColumn title="Therapeutic Areas">
          <div className="nav-products-mega__area-list">
            {THERAPEUTIC_AREAS.map(item => (
              <Link className="nav-products-mega__area" to="/products" key={item.label}>
                <MegaIcon name={item.icon} />
                <span>{item.label}</span>
                <b>&gt;</b>
              </Link>
            ))}
          </div>
        </MegaColumn>

        <MegaColumn title="Species">
          <div className="nav-products-mega__species-list">
            {SPECIES_LINKS.map(item => (
              <Link className={`nav-products-mega__species nav-products-mega__species--${item.className}`} to={item.to} key={item.label}>
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.text}</small>
                </span>
                <b>&gt;</b>
              </Link>
            ))}
          </div>
        </MegaColumn>

        <MegaColumn title="Scientific Resources">
          <div className="nav-products-mega__resource-list">
            {SCIENCE_LINKS.map(item => (
              <Link className="nav-products-mega__resource" to={item.to} key={item.label}>
                <MegaIcon name={item.icon} />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.text}</small>
                </span>
                <b>&gt;</b>
              </Link>
            ))}
          </div>
        </MegaColumn>

        <MegaColumn title="Featured Solutions">
          <div className="nav-products-mega__featured-list">
            {FEATURED_SOLUTIONS.map(item => {
              const className = `nav-products-mega__featured nav-products-mega__featured--${item.className}`;

              return item.external ? (
                <a className={className} href={item.to} target="_blank" rel="noopener noreferrer" key={item.label}>
                  <FeaturedTile item={item} />
                </a>
              ) : (
                <Link className={className} to={item.to} key={item.label}>
                  <FeaturedTile item={item} />
                </Link>
              );
            })}
          </div>
        </MegaColumn>
      </div>

      <div className="nav-products-mega__quickbar">
        {QUICK_ACTIONS.map(item => (
          <Link className="nav-products-mega__quick" to={item.to} key={item.label}>
            <MegaIcon name={item.icon} />
            <span>
              <strong>{item.label}</strong>
              <small>{item.text}</small>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function MegaColumn({ title, children }) {
  return (
    <div className="nav-products-mega__column">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function FeaturedTile({ item }) {
  return (
    <>
      <span>
        <strong>{item.label}</strong>
        <small>{item.text}</small>
      </span>
      <b>&gt;</b>
    </>
  );
}

function MegaIcon({ name }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.7',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  const paths = {
    shield: <path d="M12 3 5 5.7v5.4c0 4.2 2.9 7.9 7 9.1 4.1-1.2 7-4.9 7-9.1V5.7L12 3Z" />,
    lungs: <path d="M12 4v7M12 11c-2.5 0-4-2-4-4.5V5.2M12 11c2.5 0 4-2 4-4.5V5.2M8 5.2C5.8 6.5 4 9.8 4 14.2 4 17 5.2 19 7 19c2 0 3-2.2 3-5.3M16 5.2c2.2 1.3 4 4.6 4 9 0 2.8-1.2 4.8-3 4.8-2 0-3-2.2-3-5.3" />,
    gut: <path d="M8 4c3 0 5 1.6 5 4 0 1.8-1.2 3-3.2 3H8a2 2 0 0 0 0 4h4.5a2.5 2.5 0 0 1 0 5H9M16 5c1.8 1.1 3 3.2 3 5.7 0 2-.8 3.6-2 4.6" />,
    leaf: <path d="M5 19c8-1 13-6 14-14-8 1-13 6-14 14ZM5 19l7-7" />,
    molecule: <path d="M12 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM4 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM20 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM6 9l3.5 1.5M14.5 13.5 18 15" />,
    drop: <path d="M12 3s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11Z" />,
    sprout: <path d="M12 20V9M12 9C9 5 6 5 4 6c1 4 4 5 8 3ZM12 10c3-4 6-4 8-3-1 4-4 5-8 3Z" />,
    chart: <path d="M4 19h16M7 16v-4M12 16V8M17 16V5" />,
    book: <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H7.5A3.5 3.5 0 0 0 4 22V5.5ZM4 5.5A3.5 3.5 0 0 1 7.5 9H20" />,
    file: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8L14 2ZM14 2v6h6M8 13h8M8 17h5" />,
    flask: <path d="M9 2h6M10 2v6l-5 9a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 17l-5-9V2M8 15h8" />,
    calculator: <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2ZM8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01" />,
    download: <path d="M12 3v12M7 10l5 5 5-5M4 21h16" />,
    mail: <path d="M4 5h16v14H4V5ZM4 7l8 6 8-6" />,
  };

  return (
    <svg className="nav-products-mega__icon" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" {...common}>
      {paths[name] || paths.shield}
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(null);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang } = useLang();
  const location = useLocation();
  const navigate = useNavigate();
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
      {/* <div className="nav__topbar">
        <div className="container nav__topbar-inner">
          <span className="nav__topbar-text">Expo 2026 Participation — <Link to="/expo2025" className="nav__topbar-link">Register Interest →</Link></span>
          <div className="nav__topbar-right">
            <a href="https://feedadditives.makamilfarma.com" target="_blank" rel="noopener noreferrer" className="nav__topbar-link">Feed Additives ↗</a>
          </div>
        </div>
      </div> */}

      {/* Main nav */}
      <div className="nav__main">
        <div className="container nav__main-inner">
          {/* Logo */}
          <div className="nav__logo-wrap">
            <Link to="/" className="nav__logo" aria-label="M.A. Kamil Farma home">
              <img src={farmaLogo} alt="M.A. Kamil Farma" className="nav__logo-img" />
              {/* <span className="nav__brand">M.A. Kamil Farma</span> */}
            </Link>
          </div>

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
                  <button
                    type="button"
                    className={`nav__link ${megaOpen === item.label ? 'nav__link--open' : ''}`}
                    onClick={() => navigate('/products')}
                  >
                    {item.label}
                    <svg className="nav__chevron" width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
                  </button>
                  {megaOpen === item.label && (
                    <ProductMegaMenu
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    />
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
            <div className="nav__lang" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
              <button className="nav__lang-btn" onClick={() => setLangOpen(!langOpen)}>
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
