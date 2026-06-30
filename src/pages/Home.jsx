import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../hooks/useLang';
import { TypingTitle } from '../components/TypingTitle';
import bgHeroVideo from '../assert/bg-hero.mp4';
import nationwideMapImage from '../assert/nation wide image.png';
import './Home.css';

// ── Expo Countdown ──────────────────────────────────────────
function ExpoCountdown() {
  const target = new Date('2025-10-20T00:00:00');
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="expo-banner">
      <div className="container expo-banner__inner">
        <div className="expo-banner__left">
          <span className="expo-banner__label">🏆 EXPO 2025</span>
          <span className="expo-banner__text">M.A. Kamil Farma at VIV Asia 2025 — Bangkok</span>
        </div>
        <div className="expo-countdown">
          {[['d', 'Days'], ['h', 'Hrs'], ['m', 'Min'], ['s', 'Sec']].map(([k, l]) => (
            <div key={k} className="expo-countdown__unit">
              <span className="expo-countdown__num">{String(time[k]).padStart(2, '0')}</span>
              <span className="expo-countdown__label">{l}</span>
            </div>
          ))}
        </div>
        <Link to="/expo2025" className="expo-banner__cta">Register Interest →</Link>
      </div>
    </div>
  );
}

// ── Feed Calculator ─────────────────────────────────────────
function FeedCalculator() {
  const [species, setSpecies] = useState('poultry');
  const [weight, setWeight] = useState('');
  const [days, setDays] = useState('');
  const [result, setResult] = useState(null);

  const rates = { poultry: 0.075, dairy: 0.032, swine: 0.045, aqua: 0.02 };
  const products = {
    poultry: ['Rotamin Broiler Pack', 'ProGrow Starter', 'ImmunoBoost Liquid'],
    dairy: ['Rota Plus Cattle', 'CalciBoost Plus', 'Rumen Activator Pro'],
    swine: ['Rotamin Swine', 'DigestEnz Pro', 'OmniMin Swine'],
    aqua: ['AquaBoost Premium', 'Aqua Probiotic Plus', 'Fish Mineral Blend'],
  };

  function calculate() {
    const w = parseFloat(weight); const d = parseInt(days);
    if (!w || !d) return;
    const daily = w * rates[species] * 1000;
    const total = (daily * d / 1000).toFixed(2);
    setResult({ daily: daily.toFixed(0), total, product: products[species][0] });
  }

  return (
    <div className="calc">
      <div className="calc__header">
        <span className="section-eyebrow">Interactive Tool</span>
        <h3 className="calc__title">Medicine Calculator</h3>
        <p className="calc__desc">Estimate dosage and treatment requirements for veterinary medicines.</p>
      </div>
      <div className="calc__form">
        <div className="calc__field">
          <label>Species</label>
          <select value={species} onChange={e => { setSpecies(e.target.value); setResult(null); }}>
            <option value="poultry">Poultry (Broiler/Layer)</option>
            <option value="dairy">Dairy / Livestock</option>
            <option value="swine">Swine</option>
            <option value="aqua">Aquaculture</option>
          </select>
        </div>
        <div className="calc__field">
          <label>Number of Animals</label>
          <input type="number" min="1" placeholder="e.g. 5000" value={weight} onChange={e => { setWeight(e.target.value); setResult(null); }} />
        </div>
        <div className="calc__field">
          <label>Treatment Days</label>
          <input type="number" min="1" max="365" placeholder="e.g. 7" value={days} onChange={e => { setDays(e.target.value); setResult(null); }} />
        </div>
        <button className="btn btn--navy calc__btn" onClick={calculate}>Calculate</button>
      </div>
      {result && (
        <div className="calc__result">
          <div className="calc__result-row">
            <div className="calc__result-item">
              <span className="calc__result-num">{result.daily}g</span>
              <span className="calc__result-label">Per Day</span>
            </div>
            <div className="calc__result-item">
              <span className="calc__result-num">{result.total}kg</span>
              <span className="calc__result-label">Total Required</span>
            </div>
          </div>
          <div className="calc__result-rec">
            <span>Recommended: </span>
            <strong>{result.product}</strong>
          </div>
          <Link to="/contact" className="btn btn--gold calc__result-cta">Request a Quote</Link>
        </div>
      )}
    </div>
  );
}

const PRODUCTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3.5 5.5 7v10L12 20.5 18.5 17V7L12 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M12 8v8M8.8 9.8 15.2 14.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8.8 14.2 15.2 9.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    tag: 'Kamil Farma',
    color: '#1e6b40',
    title: 'Veterinary Pharmaceuticals',
    desc: 'Antibiotics, anti-virals, phytogenics, additives, and premixes for poultry and livestock.',
    to: '/products/kamil-farma',
    items: ['Antibiotics', 'Anti-Virals', 'Phytogenics', 'Premixes'],
    image: 'https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 13.5c0-2.5 2-4.5 4.5-4.5h3c2.5 0 4.5 2 4.5 4.5v1.5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V13.5Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 12V7.5A2.5 2.5 0 0 1 10.5 5H13.5A2.5 2.5 0 0 1 16 7.5V12" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7.5 18h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    tag: 'Feed Additives',
    color: '#2E8B57',
    title: 'Feed Additive Solutions',
    desc: 'Binders, premixes, enzymes, and nutritional additives designed to improve feed efficiency and animal performance.',
    to: '/products',
    items: ['Binders', 'Premixes', 'Enzymes', 'Additives'],
    image: 'https://images.pexels.com/photos/2255459/pexels-photo-2255459.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

const INDUSTRIES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3.5 18.5h17V9.2L12 4.5 3.5 9.2v9.3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 18.5v-4h6v4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M12 4.5v14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    title: 'Feed Mills',
    color: '#2E8B57',
    desc: 'Binders and Rotamin portfolio for optimal pellet quality and nutritional value.',
    items: ['Binders', 'Premixes'],
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3.5c-2.3 0-4.2 1.9-4.2 4.2v2.7H7.3a1.8 1.8 0 0 0-1.8 1.8v6.5h13.9v-6.5a1.8 1.8 0 0 0-1.8-1.8h-.5V7.7C16.1 5.4 14.3 3.5 12 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9.2 10.4V7.7a2.8 2.8 0 1 1 5.6 0v2.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M9.5 15.2h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    title: 'Farms & Doctors',
    color: '#003366',
    desc: 'Antibiotics, phytogenics, and herd health management solutions.',
    items: ['Antibiotics', 'Phytogenics', 'Anti-Virals'],
    image: 'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
];

const REVEAL_GROUPS = [
  '.products-section .section-header',
  '.products-grid > *',
  '.products-section__footer',
  '.heritage-content > *',
  '.heritage-visual > *',
  '.industries-section .section-header',
  '.industries-gride > *',
  '.distribution-left > *',
  '.distribution-right > *',
  '.distribution-boxes > *',
  '.calc-col > *',
  '.ecosystem-panel > *',
  '.ecosystem-nodes > *',
  '.hero__species > *',
];

function useHomePageAnimation() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealNodes = REVEAL_GROUPS.flatMap(selector => Array.from(document.querySelectorAll(selector)))
      .filter((node, index, list) => node.closest('.home') && list.indexOf(node) === index);

    revealNodes.forEach(node => {
      node.classList.add('home-reveal');

      if (node.matches('.section-header, .products-section__footer, .ecosystem-panel > .section-eyebrow')) {
        node.classList.add('home-reveal--mask');
      }
      if (node.matches('.product-card, .industry-card, .dist-box, .calc, .ecosystem-node') || node.classList.contains('distribution-legend')) {
        node.classList.add('home-reveal--tile');
      }
      if (node.closest('.heritage-content') || node.closest('.distribution-left')) {
        node.classList.add('home-reveal--left');
      }
      if (node.closest('.heritage-visual') || node.closest('.distribution-right')) {
        node.classList.add('home-reveal--right');
      }
    });

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealNodes.forEach(node => node.classList.add('is-visible'));
      return undefined;
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const siblings = Array.from(entry.target.parentElement?.children || []);
        const siblingIndex = Math.max(0, siblings.indexOf(entry.target));
        const cappedDelay = Math.min(siblingIndex * 85, 400);

        entry.target.style.setProperty('--reveal-delay', `${cappedDelay}ms`);
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealNodes.forEach(node => revealObserver.observe(node));

    const hero = document.querySelector('.hero');
    let heroRaf = 0;

    const handlePointerMove = (event) => {
      if (!hero || window.innerWidth < 900) return;
      cancelAnimationFrame(heroRaf);
      heroRaf = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        hero.style.setProperty('--hero-shift-x', `${(-x * 24).toFixed(2)}px`);
        hero.style.setProperty('--hero-shift-y', `${(-y * 18).toFixed(2)}px`);
      });
    };

    hero?.addEventListener('pointermove', handlePointerMove, { passive: true });

    const interactiveCards = Array.from(document.querySelectorAll(
      '.home .product-card, .home .industry-card, .home .calc, .home .ecosystem-panel, .home .dist-box, .home .distribution-legend, .home .pakistan-map-image'
    ));

    let cardRaf = 0;
    const handleCardMove = (event) => {
      const card = event.currentTarget;
      cancelAnimationFrame(cardRaf);
      cardRaf = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        card.style.setProperty('--spot-x', `${(x * 100).toFixed(1)}%`);
        card.style.setProperty('--spot-y', `${(y * 100).toFixed(1)}%`);
        card.style.setProperty('--tilt-x', `${((0.5 - y) * 7).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${((x - 0.5) * 7).toFixed(2)}deg`);
      });
    };

    const handleCardLeave = (event) => {
      const card = event.currentTarget;
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    };

    interactiveCards.forEach(card => {
      card.addEventListener('pointermove', handleCardMove, { passive: true });
      card.addEventListener('pointerleave', handleCardLeave);
    });

    return () => {
      revealObserver.disconnect();
      hero?.removeEventListener('pointermove', handlePointerMove);
      interactiveCards.forEach(card => {
        card.removeEventListener('pointermove', handleCardMove);
        card.removeEventListener('pointerleave', handleCardLeave);
      });
      cancelAnimationFrame(heroRaf);
      cancelAnimationFrame(cardRaf);
    };
  }, []);
}

export default function Home() {
  const { t } = useLang();
  useHomePageAnimation();

  return (
    <div className="home">
      <ExpoCountdown />

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__bg">
          <video
            className="hero__video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
          >
            <source src={bgHeroVideo} type="video/mp4" />
          </video>
          <div className="hero__bg-mesh" />
          <div className="hero__bg-overlay" />
        </div>

        <div className="container hero__content">
          <div className="hero__est animate-fade-up">
            <span className="hero__est-line" />
            <span>Est. 1923 · Pakistan</span>
            <span className="hero__est-line" />
          </div>
          <TypingTitle
            text={t('tagline').replace(/,/g, ' ')}
            speed={25}
            className="hero__title animate-fade-up-d1"
          />
          <p className="hero__sub animate-fade-up-d2">{t('heroDesc')}</p>
          <div className="hero__actions animate-fade-up-d3">
            <Link to="/products" className="btn btn--gold">{t('exploreProducts')}</Link>
            <Link to="/contact" className="btn btn--outline-white">{t('contactUs')}</Link>
          </div>

          <div className="hero__trust animate-fade-up-d4">
            {['DRAP Approved'].map(c => (
              <div key={c} className="hero__trust-badge">
                <span className="hero__trust-check">✓</span>
                {c}
              </div>
            ))}
          </div>
        </div>

        <div className="hero__species">
          {[
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9.2 4.8c1.4.5 2.4 1.8 2.6 3.2.2 1.5-.7 3-2.1 3.7-1.5.8-3.3.6-4.6-.5-1.3-1.1-1.6-3-.9-4.4.7-1.4 2.2-2.2 3.8-1.9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M14.8 5.5c1.8.2 3.3 1.4 3.8 3.1.5 1.7-.1 3.7-1.4 5-1.3 1.2-3.3 1.7-5.1 1.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M7.5 15.7c1.4 1.1 3.2 1.6 5 1.4 2-.2 3.8-.9 5.2-2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ),
              label: 'Poultry'
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7.5 18.5V9.7c0-2.7 2.2-4.9 5-4.9s5 2.2 5 4.9v8.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M5.5 18.5h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M10 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ),
              label: 'Dairy'
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M10.7 5.5 7.2 10a2 2 0 0 0-.3 1.9l1.2 3.7a1 1 0 0 0 .9.7h6.2a1 1 0 0 0 .9-.7l1.2-3.7a2 2 0 0 0-.3-1.9l-3.5-4.5a1.7 1.7 0 0 0-2.6 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M12 14.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ),
              label: 'Pets'
            },
          ].map(s => (
            <div key={s.label} className="hero__species-item">
              <span className="hero__species-icon">{s.icon}</span>
              <span className="hero__species-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Products ── */}
      <section className="section products-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">{t('ourProducts')}</span>
            <h2 className="section-title">{t('productsTitle')}</h2>
            <p className="section-lead">From proprietary pharmaceutical brands to raw material excipients — engineered for performance, safety, and compliance.</p>
          </div>
          <div className="products-grid">
            {PRODUCTS.map(p => (
              <Link key={p.title} to={p.to} className="product-card card">
                <div
                  className="product-card__top"
                  style={{
                    '--product-color': p.color,
                    '--product-bg-image': `url("${p.image}")`,
                  }}
                >
                  <div className="product-card__icon" style={{ background: 'rgba(255, 255, 255, 0.9)', color: p.color }}>
                    {p.icon}
                  </div>
                  <span className="tag tag--navy product-card__tag">{p.tag}</span>
                </div>
                <div className="product-card__body">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="product-card__items">
                    {p.items.map(i => <span key={i} className="product-card__item">{i}</span>)}
                  </div>
                  <span className="product-card__cta">
                    {t('learnMore')}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="products-section__footer">
            <Link to="/products" className="btn btn--primary">{t('viewAll')} Products</Link>
          </div>
        </div>
      </section>

      {/* ── One Health + Heritage ── */}
      <section className="heritage-section">
        <div className="container heritage-grid">
          <div className="heritage-content">
            <span className="section-eyebrow">Our Philosophy</span>
            <h2 className="section-title section-title--white">One Health. One Century. One Vision.</h2>
            <div className="divider" />
            <p className="heritage-text">
              At M.A. Kamil Farma Pvt. Ltd., we are guided by the Divine Providence of Allah and aligned with the <strong>One Health vision</strong> — the inseparable connection between human, animal, and environmental health.
            </p>
            <p className="heritage-text">
              What began as a small pharmacy driven by passion has evolved over <strong>ten decades</strong> into a leading name in Pakistan's veterinary pharmaceutical industry. Our journey from Kolkata to global markets reflects our commitment to Excellence, Dependability, and Security.
            </p>
            <div className="heritage-values">
              {['Quality & Safety', 'Innovation', 'Compassion', 'Integrity', 'Sustainability', 'Animal Welfare'].map(v => (
                <span key={v} className="heritage-value">{v}</span>
              ))}
            </div>
            <Link to="/about" className="btn btn--gold">Read Our Story</Link>
          </div>
          <div className="heritage-visual">
            <div className="heritage-year-card">
              <div className="heritage-year-num">1923</div>
              <div className="heritage-year-line" />
              <div className="heritage-year-label">Year Founded</div>
            </div>
            <div className="heritage-ceo-quote">
              <p>"At M.A. Kamil Farma Pvt. Ltd., we are guided by the Divine Providence of Allah and committed to the One Health vision. We believe the future of animal health lies in balancing proven therapeutic solutions with innovation, responsibility, and sustainability. Through responsible stewardship and continuous improvement, we strive to advance veterinary healthcare while creating lasting value for our communities and future generations."</p>
              <span>— CEO, M.A. Kamil Farma</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="industries-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Industries Served</span>
            <h2 className="section-title">Tailored Solutions for Every Sector</h2>
          </div>
          <div className="industries-gride">
            {INDUSTRIES.map(ind => (
              <div key={ind.title} className="industry-card card">
                <div
                  className="product-card__top industry-card__top"
                  style={{
                    '--product-color': ind.color,
                    '--product-bg-image': `url("${ind.image}")`,
                  }}
                >
                  <div className="industry-card__icon" style={{ background: 'rgba(255, 255, 255, 0.9)', color: ind.color }}>
                    {ind.icon}
                  </div>
                </div>
                <div className="industry-card__body product-card__body">
                  <h3>{ind.title}</h3>
                  <p>{ind.desc}</p>
                  <div className="product-card__items">
                    {ind.items.map(item => <span key={item} className="product-card__item">{item}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nationwide Distribution Network ── */}
      <section className="distribution-section">
        <div className="container">
          <div className="distribution-top-grid">
            <div className="distribution-left">
              <span className="section-eyebrow">Nationwide Distribution Network</span>
              <h2 className="section-title">Delivering Excellence Across Pakistan</h2>
              <div className="section-divider" />
              <p className="distribution-intro">Our extensive distribution network ensures timely availability of high-quality veterinary pharmaceuticals and feed additives from coast to mountains.</p>

              <ul className="distribution-features">
                {[
                  { t: "Strong Regional Presence", d: "Strategic partners and stockists in all major regions" },
                  { t: "Reliable Supply Chain", d: "Efficient logistics ensuring on-time delivery and product availability" },
                  { t: "Trusted Partnerships", d: "Working with distributors, veterinarians & farmers nationwide" },
                  { t: "Quality Commitment", d: "Maintaining product integrity across every mile" }
                ].map((item, idx) => (
                  <li key={idx}>
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M3.5 18.5h17V9.2L12 4.5 3.5 9.2v9.3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                        <path d="M9 18.5v-4h6v4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                        <path d="M12 4.5v14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <strong>{item.t}</strong>
                      <span>{item.d}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="distribution-right">
              <img src={nationwideMapImage} alt="Pakistan Distribution Network Map" className="pakistan-map-image" />

              <div className="distribution-legend">
                {[
                  { c: "gold", l: "Head Office", t: "Karachi, Sindh" },
                  { c: "blue", l: "Regional Hub", t: "Punjab" },
                  { c: "blue", l: "Regional Hub", t: "Sindh" },
                  { c: "green", l: "Regional Hub", t: "Khyber Pakhtunkhwa" },
                  { c: "teal", l: "Regional Hub", t: "Balochistan" },
                  { c: "dashed", l: "Distribution Network", t: "Across Pakistan" }
                ].map((leg, idx) => (
                  <div className="legend-item" key={idx}>
                    <span className={`legend-dot legend-dot--${leg.c}`} />
                    <div>
                      <div className="legend-label">{leg.l}</div>
                      <div className="legend-text">{leg.t}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="distribution-boxes">
            {[
              { i: <svg viewBox="0 0 24 24" fill="none"><path d="M12 2C7.6 2 4 5.6 4 10c0 5.2 8 12 8 12s8-6.8 8-12c0-4.4-3.6-8-8-8zm0 11c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" fill="white"/></svg>, h: "Nationwide Coverage", p: "Serving all major provinces across Pakistan" },
              { i: <svg viewBox="0 0 24 24" fill="none"><path d="M9 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 0c3.3 0 6 1.3 6 3v2H3v-2c0-1.7 2.7-3 6-3zm6-2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1 7v-2c0-1.3-1.7-2.5-4-3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, h: "Strong Network", p: "Empowered by trusted distributors and partners" },
              { i: <svg viewBox="0 0 24 24" fill="none"><path d="M20 7l-1.4-1.4c-.4-.4-1-.4-1.4 0l-2.1 2.1-7 7V16h3.3l7-7 2.1-2.1c.4-.4.4-1 0-1.4zM4 20h16v2H4z" fill="white"/></svg>, h: "Always Accessible", p: "Ensuring consistent availability where you need us" },
              { i: <svg viewBox="0 0 24 24" fill="none"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.4-1.4L10 14.2l7.6-7.6L19 8l-9 9z" fill="white"/></svg>, h: "Committed to Quality", p: "Delivering excellence with integrity at every step" }
            ].map((box, idx) => (
              <div className="dist-box" key={idx}>
                <div className="dist-box__icon">{box.i}</div>
                <h4>{box.h}</h4>
                <p>{box.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calculator + Ecosystem ── */}
      <section className="section calc-science-section">
        <div className="container calc-science-grid">
          <div className="calc-col">
            <FeedCalculator />
          </div>
          <div className="science-col">
            <div className="ecosystem-panel">
              <span style={{ marginTop: "15px" }} className="section-eyebrow">Our Business Ecosystem</span>
              <div className="ecosystem-nodes">
                {[
                  'Manufacturing',
                  'Feed Additives',
                  'Veterinary Pharmaceuticals',
                  'Contract Manufacturing',
                  'International Partnerships',
                  'Technical Support',
                  'Regulatory Affairs',
                  'Research & Development',
                ].map(node => (
                  <div key={node} className="ecosystem-node">
                    {node}
                  </div>
                ))}
              </div>
              <Link to="/about" style={{ marginBottom: "3px" }} className="btn btn--primary">Explore Our Network</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
