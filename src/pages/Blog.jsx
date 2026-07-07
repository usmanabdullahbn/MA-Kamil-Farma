import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../utils/api';
import './Blog.css';

// CRUD Modal Component
function BlogModal({ blog, onSave, onClose }) {
  const [form, setForm] = useState(blog || {
    title: '', excerpt: '', content: '', category: 'General', tags: '', author: 'M.A. Kamil Farma', published: false, readTime: 0
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(t => t),
      readTime: parseInt(form.readTime) || 0,
      published: form.published === true || form.published === 'true',
    };
    await onSave(data);
    setLoading(false);
    onClose();
  };

  return (
    <div className="blog-modal" onClick={onClose}>
      <div className="blog-modal__content" onClick={e => e.stopPropagation()}>
        <button className="blog-modal__close" onClick={onClose}>✕</button>
        <h2>{blog ? 'Edit Blog' : 'Create Blog'}</h2>
        <form onSubmit={handleSubmit} className="blog-form">
          <input type="text" placeholder="Title" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          <textarea placeholder="Excerpt" required value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} rows="2"></textarea>
          <textarea placeholder="Content (HTML allowed)" required value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows="8"></textarea>

          <div className="blog-form__row">
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              <option>General</option>
              <option>Poultry</option>
              <option>Livestock</option>
              <option>Feed Additives</option>
              <option>Compounding Pharmacy</option>
              <option>Industry News</option>
              <option>Science</option>
              <option>Research</option>
              <option>Innovation</option>
              <option>Sustainability</option>
            </select>
            <input type="text" placeholder="Author" value={form.author} onChange={e => setForm({...form, author: e.target.value})} />
          </div>

          <div className="blog-form__row">
            <input type="text" placeholder="Tags (comma-separated)" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} />
            <input type="number" placeholder="Read time (min)" value={form.readTime} onChange={e => setForm({...form, readTime: e.target.value})} />
          </div>

          <label className="blog-checkbox">
            <input type="checkbox" checked={form.published === true || form.published === 'true'} onChange={e => setForm({...form, published: e.target.checked})} />
            Published
          </label>

          <div className="blog-form__actions">
            <button type="submit" disabled={loading} className="btn btn--navy">{loading ? 'Saving...' : 'Save Blog'}</button>
            <button type="button" onClick={onClose} className="btn btn--outline">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
}

export function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('');
  const [pagination, setPagination] = useState(null);

  // Admin CRUD states
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('adminToken'));
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || '');
  const [showTokenForm, setShowTokenForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [adminLoading, setAdminLoading] = useState(false);
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    setLoading(true);
    api.blogs.list({ page, limit: 9, category: activeCategory })
      .then(r => { setBlogs(r.data); setPagination(r.pagination); })
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, [page, activeCategory]);

  useEffect(() => {
    const handleAdminModalRequest = () => {
      if (localStorage.getItem('showAdminModal') === 'true') {
        setShowTokenForm(true);
        localStorage.removeItem('showAdminModal');
      }
    };
    window.addEventListener('adminModalRequested', handleAdminModalRequest);
    return () => window.removeEventListener('adminModalRequested', handleAdminModalRequest);
  }, []);

  const fetchAllBlogs = () => {
    setAdminLoading(true);
    api.blogs.list({ page: 1, limit: 1000 })
      .then(r => setAllBlogs(r.data))
      .catch(() => setAllBlogs([]))
      .finally(() => setAdminLoading(false));
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('adminToken', adminToken);
    setIsAdmin(true);
    setShowTokenForm(false);
    fetchAllBlogs();
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    setAdminToken('');
    setAllBlogs([]);
  };

  const handleSaveBlog = async (data) => {
    try {
      if (editingBlog) {
        await api.blogs.update(editingBlog._id, data);
      } else {
        await api.blogs.create(data);
      }
      setLoading(true);
      api.blogs.list({ page, limit: 9, category: activeCategory })
        .then(r => { setBlogs(r.data); setPagination(r.pagination); })
        .catch(() => setBlogs([]))
        .finally(() => setLoading(false));
      fetchAllBlogs();
      setEditingBlog(null);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm('Delete this blog?')) return;
    try {
      await api.blogs.delete(id);
      setLoading(true);
      api.blogs.list({ page, limit: 9, category: activeCategory })
        .then(r => { setBlogs(r.data); setPagination(r.pagination); })
        .catch(() => setBlogs([]))
        .finally(() => setLoading(false));
      fetchAllBlogs();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const categories = [
    'Company News',
    'Industry Insights',
    'Research & Development',
    'Product Updates',
    'Regulatory Updates',
    'Event Participation',
    'Partnerships & Collaborations',
  ];
  const [featured, ...rest] = blogs;

  return (
    <div className="blog-page">
      {/* Admin Token Form */}
      {showTokenForm && (
        <div className="blog-modal" onClick={() => setShowTokenForm(false)}>
          <div className="blog-modal__content" onClick={e => e.stopPropagation()}>
            <h2>Admin Login</h2>
            <form onSubmit={handleAdminLogin} className="blog-form">
              <input
                type="password"
                placeholder="Enter admin token"
                value={adminToken}
                onChange={e => setAdminToken(e.target.value)}
                required
              />
              <div className="blog-form__actions">
                <button type="submit" className="btn btn--navy">Login</button>
                <button type="button" onClick={() => setShowTokenForm(false)} className="btn btn--outline">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="blog-hero">
        <div className="blog-hero__bg">
          <div className="blog-hero__mesh" />
          <div className="blog-hero__pattern" />
        </div>
        <div className="container blog-hero__inner">
          <div className="blog-hero__content">
            <span className="section-eyebrow blog-hero__eyebrow">Knowledge Hub</span>
            <h1 className="blog-hero__title">
              Insights, Research & <span className="blog-hero__accent">Industry Intelligence</span>
            </h1>
            <p className="blog-hero__lead">
              Expert perspectives on veterinary pharmaceuticals, livestock health, and the evolving
              landscape of animal nutrition — written by our team of scientists and industry specialists.
            </p>
            <div className="blog-hero__stats">
              <div className="blog-hero__stat">
                <span className="blog-hero__stat-num">{blogs.length > 0 ? blogs.length : '—'}</span>
                <span className="blog-hero__stat-label">Published Articles</span>
              </div>
              <div className="blog-hero__stat">
                <span className="blog-hero__stat-num">{categories.length}</span>
                <span className="blog-hero__stat-label">Topic Areas</span>
              </div>
              <div className="blog-hero__stat">
                <span className="blog-hero__stat-num">Weekly</span>
                <span className="blog-hero__stat-label">New Content</span>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-hero__divider">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill="var(--off-white)" />
          </svg>
        </div>
      </section>

      {/* Body */}
      <section className="blog-page__body">
        <div className="container">
          <div className="blog-toolbar">
            <div className="blog-toolbar__left">
              <span className="blog-toolbar__label">Browse Topics</span>
            </div>
            <div className="blog-cats">
              <button
                className={`blog-cat ${!activeCategory ? 'blog-cat--active' : ''}`}
                onClick={() => { setActiveCategory(''); setPage(1); }}
              >
                All
              </button>
              {categories.map(c => (
                <button
                  key={c}
                  className={`blog-cat ${activeCategory === c ? 'blog-cat--active' : ''}`}
                  onClick={() => { setActiveCategory(c); setPage(1); }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="blog-skeletons">{[1,2,3,4,5,6].map(i => <div key={i} className="blog-skeleton" />)}</div>
          ) : blogs.length === 0 ? (
            <div className="blog-coming-soon">
              <div className="blog-coming-soon__icon">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  <line x1="8" y1="7" x2="16" y2="7"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </div>
              <span className="section-eyebrow">Coming Soon</span>
              <h2 className="blog-coming-soon__title">The Knowledge Hub is Underway</h2>
              <p className="blog-coming-soon__lead">
                We are developing a comprehensive resource library featuring industry updates,
                research summaries, product information, and company news.
                Please check back for future publications.
              </p>
              <div className="blog-coming-soon__actions">
                <Link to="/contact" className="btn btn--gold">Register Interest</Link>
                <a href="https://wa.me/923352249111" target="_blank" rel="noopener noreferrer" className="btn btn--outline">Get Notified</a>
              </div>
              <div className="blog-coming-soon__categories">
                <h4 className="blog-coming-soon__categories-title">Future Topics Will Cover</h4>
                <div className="blog-coming-soon__chips">
                  {categories.map(c => (
                    <span key={c} className="blog-coming-soon__chip">
                      <span className="list-bullet">•</span> {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {featured && (
                <Link to={`/blog/${featured.slug}`} className="blog-featured">
                  <div className="blog-featured__img">
                    <div className="blog-featured__ph" />
                    <div className="blog-featured__overlay">
                      <span className="blog-featured__badge">Featured Story</span>
                    </div>
                  </div>
                  <div className="blog-featured__body">
                    <div className="blog-featured__meta">
                      <span className="tag tag--gold">{featured.category}</span>
                      <span className="blog-featured__date">{formatDate(featured.publishedAt)}</span>
                    </div>
                    <h2 className="blog-featured__title">{featured.title}</h2>
                    <p className="blog-featured__excerpt">{featured.excerpt}</p>
                    <div className="blog-featured__footer">
                      <div className="blog-meta">
                        <span className="blog-meta__dot" />
                        {featured.readTime} min read
                      </div>
                      <span className="blog-featured__cta">
                        Read article
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"/>
                          <polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </span>
                    </div>
                    {isAdmin && (
                      <div className="blog-actions">
                        <button className="btn btn--sm" onClick={() => { setEditingBlog(featured); setShowModal(true); }}>Edit</button>
                        <button className="btn btn--sm btn--outline" onClick={() => handleDeleteBlog(featured._id)}>Delete</button>
                      </div>
                    )}
                  </div>
                </Link>
              )}

              {rest.length > 0 && (
                <>
                  <div className="blog-section-heading">
                    <span className="section-eyebrow">More Articles</span>
                    <h2 className="section-title">Latest From Our Team</h2>
                  </div>
                  <div className="blog-grid">
                    {rest.map((b, i) => (
                      <div key={b._id} className="blog-card-item" style={{ animationDelay: `${i * 60}ms` }}>
                        <Link to={`/blog/${b.slug}`} className="blog-card-link">
                          <div className="blog-card-item__img">
                            <div className="blog-card-item__ph" />
                            <span className="tag tag--navy blog-cat-pos">{b.category}</span>
                            <div className="blog-card-item__read">{b.readTime} min</div>
                          </div>
                          <div className="blog-card-item__body">
                            <div className="blog-card-item__date">{formatDate(b.publishedAt)}</div>
                            <h3>{b.title}</h3>
                            <p>{b.excerpt}</p>
                            <span className="blog-card-item__arrow">
                              Read more
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"/>
                                <polyline points="12 5 19 12 12 19"/>
                              </svg>
                            </span>
                          </div>
                        </Link>
                        {isAdmin && (
                          <div className="blog-card-actions">
                            <button className="btn btn--sm" onClick={() => { setEditingBlog(b); setShowModal(true); }}>Edit</button>
                            <button className="btn btn--sm btn--outline" onClick={() => handleDeleteBlog(b._id)}>Delete</button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {pagination?.pages > 1 && (
                <div className="blog-pagination">
                  <button
                    className="blog-pagination__nav"
                    disabled={page === 1}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    aria-label="Previous page"
                  >
                    ←
                  </button>
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(p => (
                    <button key={p} className={`blog-pagination__btn ${page === p ? 'blog-pagination__btn--active' : ''}`} onClick={() => setPage(p)}>
                      {p}
                    </button>
                  ))}
                  <button
                    className="blog-pagination__nav"
                    disabled={page === pagination.pages}
                    onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                    aria-label="Next page"
                  >
                    →
                  </button>
                </div>
              )}
            </>
          )}

          {isAdmin && (
            <div className="blog-admin-panel">
              <div className="blog-admin-panel__header">
                <div>
                  <span className="section-eyebrow">Admin</span>
                  <h2 className="section-title">All Blogs</h2>
                </div>
                <div className="blog-admin-panel__actions">
                  <button className="btn btn--gold" onClick={() => setShowModal(true)}>Create Blog</button>
                  <button className="btn btn--outline" onClick={handleAdminLogout}>Logout</button>
                </div>
              </div>
              <div className="blog-admin-table-wrap">
                <table className="blog-admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allBlogs.length === 0 && !adminLoading && (
                      <tr><td colSpan="4" className="blog-admin-empty">No blogs yet — create your first post.</td></tr>
                    )}
                    {allBlogs.map(b => (
                      <tr key={b._id}>
                        <td><strong>{b.title}</strong></td>
                        <td><span className="tag tag--navy">{b.category}</span></td>
                        <td>
                          {b.published
                            ? <span className="tag tag--green">Published</span>
                            : <span className="tag">Draft</span>}
                        </td>
                        <td>
                          <div className="blog-admin-row-actions">
                            <button className="btn btn--sm" onClick={() => { setEditingBlog(b); setShowModal(true); }}>Edit</button>
                            <button className="btn btn--sm btn--outline" onClick={() => handleDeleteBlog(b._id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {showModal && (
        <BlogModal
          blog={editingBlog}
          onSave={handleSaveBlog}
          onClose={() => { setShowModal(false); setEditingBlog(null); }}
        />
      )}
    </div>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0,0);
    api.blogs.get(slug).then(r=>setPost(r.data)).catch(()=>setPost(null)).finally(()=>setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="post-page">
      <div className="post-hero">
        <div className="container post-hero__inner">
          <div className="blog-skeleton" style={{ height: 24, width: 140, marginBottom: 24 }} />
          <div className="blog-skeleton" style={{ height: 48, marginBottom: 16 }} />
          <div className="blog-skeleton" style={{ height: 16, width: 240 }} />
        </div>
      </div>
      <div style={{ padding: '64px 24px 96px' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          {[80,20,20,20,20].map((h,i) => <div key={i} className="blog-skeleton" style={{ height:h, marginTop:14, borderRadius:6 }}/>)}
        </div>
      </div>
    </div>
  );

  if (!post) return (
    <div className="post-page">
      <div className="post-hero">
        <div className="container post-hero__inner">
          <Link to="/blog" className="post-back">← Back to Knowledge Hub</Link>
          <h1 className="post-title">Article Not Available</h1>
          <div className="post-meta">This publication may have been removed or is not yet published.</div>
        </div>
      </div>
      <div className="container post-body">
        <div className="post-cta" style={{ marginTop: 0 }}>
          <div className="post-cta__inner" style={{ textAlign: 'center' }}>
            <p>Our Knowledge Hub is being developed — please check back for future publications.</p>
            <div style={{ marginTop: 18 }}>
              <Link to="/blog" className="btn btn--gold">Back to Knowledge Hub</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="post-page">
      <div className="post-hero">
        <div className="post-hero__bg">
          <div className="post-hero__mesh" />
        </div>
        <div className="container post-hero__inner">
          <Link to="/blog" className="post-back">← Back to Knowledge Hub</Link>
          <span className="tag tag--gold post-hero__tag">{post.category}</span>
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <span className="post-meta__author">By {post.author}</span>
            <span className="post-meta__sep" />
            <span>{formatDate(post.publishedAt)}</span>
            <span className="post-meta__sep" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
        <div className="blog-hero__divider">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill="var(--white)" />
          </svg>
        </div>
      </div>
      <div className="container post-body">
        <article className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        {post.tags?.length > 0 && (
          <div className="post-tags">
            <span className="post-tags__label">Topics</span>
            {post.tags.map(t => <span key={t} className="post-tag">{t}</span>)}
          </div>
        )}
        <div className="post-cta">
          <div className="post-cta__inner">
            <span className="section-eyebrow">Get In Touch</span>
            <h3>Have a Question About Our Products?</h3>
            <p>Our expert team is available to advise on the right pharmaceutical solution for your operation.</p>
            <div className="post-cta__actions">
              <Link to="/contact" className="btn btn--gold">Contact Us</Link>
              <a href="https://wa.me/923352249111" target="_blank" rel="noopener noreferrer" className="btn btn--outline-white">WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
