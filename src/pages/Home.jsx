import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../hooks/useLang';
import { useTyping } from '../hooks/useTyping';
import { TypingTitle } from '../components/TypingTitle';
import bgHeroVideo from '../assert/bg-hero.mp4';
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
    const daily = w * rates[species] * 1000; // g/day
    const total = (daily * d / 1000).toFixed(2); // kg
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

// ── Stats counter ───────────────────────────────────────────
function StatCounter({ end, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0; const step = end / 60;
        const id = setInterval(() => {
          start = Math.min(start + step, end);
          setVal(Math.floor(start));
          if (start >= end) clearInterval(id);
        }, 16);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref} className="stat__num">{val.toLocaleString()}{suffix}</span>;
}

const STATS = [
  { num: 100, suffix: '+', label: 'Years of Excellence' },
  { num: 15000, suffix: '+', label: 'Farms Served' },
  { num: 500, suffix: '+', label: 'Product SKUs' },
  { num: 12, suffix: '', label: 'Export Markets' },
];

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
    focus: 'Rotamin · Binders · Premixes'
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
    focus: 'Antibiotics · Phytogenics · Anti-Virals'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3.8c3.4 0 6.2 2.7 6.2 6.2 0 3.4-2.7 6.2-6.2 6.2S5.8 13.4 5.8 10c0-3.5 2.8-6.2 6.2-6.2Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9.5 10.5c.3.8.9 1.4 1.8 1.7.9.3 1.9.2 2.7-.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 18.5c1.5-1.6 3.2-2.4 4-2.4s2.5.8 4 2.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    title: 'Aquaculture',
    color: '#1a5c99',
    desc: 'Tailored solutions for sustainable aquaculture operations.',
    focus: 'Coming Soon'
  },
];

const TESTIMONIALS = [
  { name: 'Abdul Rehman', role: 'Feed Mill Owner, Lahore', text: 'Rotamin binders have significantly improved our pellet quality and durability. We\'ve seen a 15% improvement in FCR across our broiler customers. Highly recommend.', product: 'Rotamin Binder Pro', rating: 5 },
  { name: 'Dr. Imran Khan', role: 'Veterinary Consultant, Punjab', text: 'The antibiotic range from M.A. Kamil Farma is consistently reliable. Withdrawal periods are clearly stated and our clients trust the products completely.', product: 'Veterinary Antibiotics', rating: 5 },
  { name: 'Shahid Enterprises', role: 'Pharma Distributor, Karachi', text: 'Their amino acid and vitamin excipients meet international quality standards. The team is professional and delivery is always on time.', product: 'Pharma Excipients', rating: 5 },
];

const BLOGS = [
  { slug: 'one-health-future', cat: 'Science', title: 'One Health: The Future of Veterinary Pharmaceutical Design', date: 'Apr 14, 2026', read: 6 },
  { slug: 'antibiotic-resistance-pakistan', cat: 'Industry', title: 'Antibiotic Resistance in Pakistan\'s Livestock Sector', date: 'Apr 1, 2026', read: 8 },
  { slug: 'rotamin-fcr-trial', cat: 'Research', title: 'Rotamin Trial Results: 18% FCR Improvement in Broiler Flocks', date: 'Mar 18, 2026', read: 5 },
];

export default function Home() {
  const { t } = useLang();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="home">
      {/* Expo banner */}
      <ExpoCountdown />

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__bg">
          {/* Background video — custom hero background */}
          <video
            className="hero__video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
          >
            <source
              src={bgHeroVideo}
              type="video/mp4"
            />
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

          {/* Trust strip */}
          <div className="hero__trust animate-fade-up-d4">
            {['DRAP Approved'].map(c => (
              <div key={c} className="hero__trust-badge">
                <span className="hero__trust-check">✓</span>
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Species icons */}
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

      {/* ── Stats ── */}
      {/* <section className="stats-section">
        <div className="container stats-grid">
          {STATS.map(s => (
            <div key={s.label} className="stat">
              <StatCounter end={s.num} suffix={s.suffix} />
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section> */}

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
                <div className="product-card__top" style={{ background: p.color + '12' }}>
                  <div className="product-card__icon" style={{ background: p.color + '20', color: p.color }}>
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
      <section className="section industries-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Industries Served</span>
            <h2 className="section-title">Tailored Solutions for Every Sector</h2>
          </div>
          <div className="industries-grid">
            {INDUSTRIES.map(ind => (
              <div key={ind.title} className="industry-card" style={{ '--ind-color': ind.color }}>
                <div className="industry-card__icon">{ind.icon}</div>
                <h3>{ind.title}</h3>
                <p>{ind.desc}</p>
                <div className="industry-card__focus">{ind.focus}</div>
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
              <span style={{marginTop: "15px"}} className="section-eyebrow">Our Business Ecosystem</span>

              {/* <div className="ecosystem-center">
                <span>Core</span>
                <h3>M.A. Kamil Farma</h3>
              </div> */}
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

      {/* ── Testimonials ── */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-eyebrow" style={{ color: 'var(--gold)' }}>Client Testimonials</span>
            <h2 className="section-title section-title--white">Trusted by Pakistan's Best Farms</h2>
          </div>
          <div className="testimonials-slider testimonials-container">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`testimonial-card ${i === activeTestimonial ? 'active' : ''}`}>
                <div className="testimonial-stars">{'★'.repeat(t.rating)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-footer">
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">{t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                    <div>
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-role">{t.role}</div>
                    </div>
                  </div>
                  <span className="tag tag--gold">{t.product}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonials-dots">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} className={`testimonials-dot ${i === activeTestimonial ? 'active' : ''}`} onClick={() => setActiveTestimonial(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog ── */}
      <section className="section blog-section">
        <div className="container">
          <div className="section-header blog-header">
            <div>
              <span className="section-eyebrow">{t('blogTitle')}</span>
              <h2 className="section-title">{t('blogTitle')}</h2>
              <p className="section-lead">{t('blogSub')}</p>
            </div>
            <Link to="/blog" className="btn btn--outline">{t('viewAll')} Articles</Link>
          </div>
          <div className="blog-grid">
            {BLOGS.map(b => (
              <Link key={b.slug} to={`/blog/${b.slug}`} className="blog-card card">
                <div className="blog-card__img">
                  <div className="blog-card__img-placeholder" />
                  <span className="tag tag--navy blog-card__cat">{b.cat}</span>
                </div>
                <div className="blog-card__body">
                  <h3 className="blog-card__title">{b.title}</h3>
                  <div className="blog-card__meta">
                    <span>{b.date}</span>
                    <span>·</span>
                    <span>{b.read} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feed Additives CTA ── */}
      {/* <section className="fa-cta-section">
        <div className="container">
          <div className="fa-cta-card">
            <div className="fa-cta-card__left">
              <span className="section-eyebrow" style={{ color: 'var(--green-light)' }}>Sister Brand</span>
              <h2 className="section-title section-title--white">Explore Our Feed Additives Division</h2>
              <p style={{ color: 'rgba(255,255,255,0.68)', maxWidth: 460, lineHeight: 1.75 }}>
                A dedicated product line of scientifically formulated feed additives — growth promoters, mycotoxin binders, digestive enzymes, and mineral premixes.
              </p>
            </div>
            <a href="https://feedadditives.makamilfarma.com" target="_blank" rel="noopener noreferrer" className="btn btn--gold">
              Visit Feed Additives Site ↗
            </a>
          </div>
        </div>
      </section> */}
    </div>
  );
}