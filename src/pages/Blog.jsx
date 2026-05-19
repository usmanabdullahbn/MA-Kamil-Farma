import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../utils/api';
import './Blog.css';

const MOCK_BLOGS = [
  { _id:'1', slug:'one-health-future', category:'Science', title:'One Health: The Future of Veterinary Pharmaceutical Design', excerpt:'The One Health approach — recognizing the inseparable connection between human, animal, and environmental health — is reshaping how pharmaceutical companies design their products.', publishedAt:'2026-04-14', readTime:6 },
  { _id:'2', slug:'antibiotic-resistance-pakistan', category:'Industry News', title:"Antibiotic Resistance in Pakistan's Livestock Sector: What Farmers Must Know", excerpt:"Pakistan's livestock sector faces a growing antibiotic resistance crisis. Understanding the economic and health implications is critical for every farmer and veterinarian.", publishedAt:'2026-04-01', readTime:8 },
  { _id:'3', slug:'rotamin-fcr-trial', category:'Research', title:'Rotamin Trial Results: 18% FCR Improvement in Broiler Flocks', excerpt:'A controlled trial across three farms in Punjab demonstrated significant improvements in feed conversion ratio using Rotamin Binder Pro supplementation over 42 days.', publishedAt:'2026-03-18', readTime:5 },
  { _id:'4', slug:'phytogenics-future-antibiotics', category:'Innovation', title:'Phytogenics: The Future of Antibiotic Alternatives in Poultry', excerpt:'As antibiotic restrictions tighten globally, phytogenic feed additives are emerging as the most promising natural alternative for maintaining flock health and performance.', publishedAt:'2026-03-05', readTime:7 },
  { _id:'5', slug:'expo-2025-preview', category:'News', title:'M.A. Kamil Farma at VIV Asia 2025 — Bangkok', excerpt:"We are proud to announce our participation at VIV Asia 2025 in Bangkok. Discover what we'll be showcasing and how to connect with our team.", publishedAt:'2026-02-20', readTime:4 },
  { _id:'6', slug:'sustainability-green-pharma', category:'Sustainability', title:'Our Commitment to Green Pharmaceuticals', excerpt:"M.A. Kamil Farma's strategy to replace traditional antibiotics with green alternatives reflects our dedication to environmental sustainability and One Health.", publishedAt:'2026-02-05', readTime:6 },
];

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
}

export function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('');
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.blogs.list({ page, limit: 9, category: activeCategory })
      .then(r => { setBlogs(r.data); setPagination(r.pagination); })
      .catch(() => setBlogs(MOCK_BLOGS))
      .finally(() => setLoading(false));
  }, [page, activeCategory]);

  const categories = ['Science', 'Industry News', 'Research', 'Innovation', 'News', 'Sustainability'];
  const [featured, ...rest] = blogs;

  return (
    <div className="blog-page">
      <div className="blog-page__hero">
        <div className="container blog-page__hero-inner">
          <span className="section-eyebrow">Knowledge Hub</span>
          <h1 className="section-title section-title--white">News & Insights</h1>
          <p className="section-lead" style={{ color:'rgba(255,255,255,0.65)' }}>
            Science, innovation, sustainability, and the human–animal bond — published bi-weekly by the M.A. Kamil Farma team.
          </p>
        </div>
      </div>

      <div className="blog-page__body container">
        {/* Category filters */}
        <div className="blog-cats">
          <button className={`pf-btn ${!activeCategory?'active':''}`} onClick={() => { setActiveCategory(''); setPage(1); }}>All</button>
          {categories.map(c => (
            <button key={c} className={`pf-btn ${activeCategory===c?'active':''}`} onClick={() => { setActiveCategory(c); setPage(1); }}>{c}</button>
          ))}
        </div>

        {loading ? (
          <div className="blog-skeletons">{[1,2,3].map(i=><div key={i} className="blog-skeleton"/>)}</div>
        ) : (
          <>
            {/* Featured */}
            {featured && (
              <Link to={`/blog/${featured.slug}`} className="blog-featured">
                <div className="blog-featured__img"><div className="blog-featured__ph" /></div>
                <div className="blog-featured__body">
                  <span className="tag tag--navy">{featured.category}</span>
                  <h2 className="blog-featured__title">{featured.title}</h2>
                  <p className="blog-featured__excerpt">{featured.excerpt}</p>
                  <div className="blog-meta">{formatDate(featured.publishedAt)} · {featured.readTime} min read</div>
                </div>
              </Link>
            )}

            <div className="blog-grid">
              {rest.map(b => (
                <Link key={b._id} to={`/blog/${b.slug}`} className="blog-card-item">
                  <div className="blog-card-item__img"><div className="blog-card-item__ph"/><span className="tag tag--navy blog-cat-pos">{b.category}</span></div>
                  <div className="blog-card-item__body">
                    <h3>{b.title}</h3>
                    <p>{b.excerpt}</p>
                    <div className="blog-meta">{formatDate(b.publishedAt)} · {b.readTime} min read</div>
                  </div>
                </Link>
              ))}
            </div>

            {pagination?.pages > 1 && (
              <div className="blog-pagination">
                {Array.from({length:pagination.pages},(_,i)=>i+1).map(p=>(
                  <button key={p} className={`pf-btn ${page===p?'active':''}`} onClick={()=>setPage(p)}>{p}</button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const MOCK_POST = {
  title: 'One Health: The Future of Veterinary Pharmaceutical Design',
  content: `
    <p>The concept of <strong>One Health</strong> — recognizing the profound and inseparable connections between human health, animal health, and the health of our shared environment — is no longer just a philosophical framework. It has become the guiding principle behind the most innovative veterinary pharmaceutical companies in the world.</p>
    <h2>Why One Health Matters Now</h2>
    <p>Over 60% of known infectious diseases affecting humans originate in animals. The way we manage animal health directly impacts human health outcomes, food security, and environmental integrity. For a company like M.A. Kamil Farma, this understanding has shaped our product development strategy for decades.</p>
    <h2>Implications for Product Design</h2>
    <p>Products designed under the One Health framework must consider not just efficacy in the target animal species, but the residue profile in food products, the environmental fate of excipients, and the impact on non-target organisms in the ecosystem.</p>
    <blockquote>Our future strategy includes replacing traditional antibiotic products with green alternatives that are not only effective but also environmentally sustainable. — CEO, M.A. Kamil Farma</blockquote>
    <h2>Phytogenics and the Green Pharmacy</h2>
    <p>Essential oil-based phytogenic compounds, plant extracts, and organic acids are increasingly displacing conventional antibiotics in production animal medicine. These natural compounds offer antimicrobial and immunostimulant properties without the residue or resistance concerns associated with synthetic antibiotics.</p>
    <p>At M.A. Kamil Farma, our phytogenic range has been developed in collaboration with veterinary researchers across Pakistan to ensure relevance to local disease challenges and climate conditions.</p>
    <h2>Looking Forward</h2>
    <p>The One Health paradigm is not a constraint — it is an opportunity. Companies that embrace it will find themselves at the forefront of a global shift towards responsible, sustainable veterinary medicine that protects animals, people, and the planet simultaneously.</p>
  `,
  category: 'Science', author: 'M.A. Kamil Farma Research Team', publishedAt: '2026-04-14', readTime: 6,
  tags: ['One Health', 'Innovation', 'Phytogenics', 'Sustainability'],
};

export function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0,0);
    api.blogs.get(slug).then(r=>setPost(r.data)).catch(()=>setPost(MOCK_POST)).finally(()=>setLoading(false));
  }, [slug]);

  if (loading) return (
    <div style={{ paddingTop:130 }}>
      <div className="container" style={{ maxWidth:760 }}>
        {[80,20,20,20,20].map((h,i) => <div key={i} className="blog-skeleton" style={{ height:h, marginTop:14, borderRadius:6 }}/>)}
      </div>
    </div>
  );

  return (
    <div className="post-page">
      <div className="post-hero">
        <div className="container post-hero__inner">
          <Link to="/blog" className="post-back">← Back to Blog</Link>
          <span className="tag tag--gold" style={{ marginTop:18, display:'inline-block' }}>{post.category}</span>
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">{post.author} · {formatDate(post.publishedAt)} · {post.readTime} min read</div>
        </div>
      </div>
      <div className="container post-body">
        <article className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        {post.tags?.length > 0 && (
          <div className="post-tags">
            <span>Topics:</span>
            {post.tags.map(t => <span key={t} className="post-tag">{t}</span>)}
          </div>
        )}
        <div className="post-cta">
          <div className="post-cta__inner">
            <h3>Have a Question About Our Products?</h3>
            <p>Our expert team is available to advise on the right pharmaceutical solution for your operation.</p>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <Link to="/contact" className="btn btn--gold">Contact Us</Link>
              <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="btn btn--green">WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
