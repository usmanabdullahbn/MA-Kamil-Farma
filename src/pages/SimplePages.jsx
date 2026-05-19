import { Link } from 'react-router-dom';
import './Simple.css';

export function About() {
  return (
    <div className="simple-page">
      <div className="simple-hero">
        <div className="container">
          <span className="section-eyebrow">Our Story</span>
          <h1 className="section-title section-title--white">A Century of Pharmaceutical Excellence</h1>
          <p className="section-lead" style={{ color:'rgba(255,255,255,0.65)' }}>
            From a small pharmacy in Karachi to Pakistan's leading veterinary pharmaceutical group — guided by the One Health vision since 1923.
          </p>
        </div>
      </div>

      <div className="container simple-body">
        {/* CEO Message */}
        <section className="about-ceo">
          <div className="about-ceo__quote-mark">"</div>
          <blockquote className="about-ceo__text">
            At M.A. Kamil Farma Pvt. Ltd., we are guided by the Divine Providence of Allah and committed to the One Health vision. Our future strategy includes replacing traditional antibiotic products with green alternatives that are not only effective but also environmentally sustainable. This commitment reflects our dedication to a healthier planet for future generations.
          </blockquote>
          <div className="about-ceo__author">
            <div className="about-ceo__avatar">CEO</div>
            <div>
              <div className="about-ceo__name">Chief Executive Officer</div>
              <div className="about-ceo__title">M.A. Kamil Farma Pvt. Ltd.</div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section style={{ margin:'64px 0' }}>
          <span className="section-eyebrow">Our Journey</span>
          <h2 className="section-title">Ten Decades of Progress</h2>
          <div className="about-timeline">
            {[
              { year:'1923', title:'Founded', desc:'Established as a community pharmacy in Karachi, driven by a passion for accessible, reliable medicine.' },
              { year:'1960s', title:'Veterinary Focus', desc:'Pivoted to veterinary pharmaceuticals, serving the growing livestock sector of Pakistan.' },
              { year:'1990s', title:'Manufacturing Scale-up', desc:'Invested in GMP-compliant manufacturing facilities and expanded the product portfolio significantly.' },
              { year:'2010s', title:'Rotamin & Innovation', desc:'Launched the Rotamin product line and began international export to GCC and African markets.' },
              { year:'2020s', title:'One Health Vision', desc:'Embraced the One Health framework; began transition to green pharmaceutical alternatives.' },
              { year:'Today', title:'Global Ambitions', desc:'Serving 15,000+ farms, exporting to 12 markets, with Expo 2025 participation and ambitious R&D pipeline.' },
            ].map(item => (
              <div key={item.year} className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section style={{ margin:'64px 0' }}>
          <span className="section-eyebrow">Our Values</span>
          <h2 className="section-title">What Drives Us</h2>
          <div className="values-grid">
            {[
              { icon:'🔬', title:'Quality & Safety', desc:'Every product adheres to GMP standards and DRAP regulations. Rigorous QC at every stage.' },
              { icon:'💡', title:'Innovation', desc:'Continuous R&D investment to bring cutting-edge solutions to Pakistan\'s veterinary sector.' },
              { icon:'❤️', title:'Compassion', desc:'We recognize the deep bond between humans and animals. Our products reflect that understanding.' },
              { icon:'🤝', title:'Integrity', desc:'Transparent business practices and unwavering ethical standards in everything we do.' },
              { icon:'🌱', title:'Sustainability', desc:'Committed to reducing ecological footprint and transitioning to green pharmaceutical alternatives.' },
              { icon:'🐾', title:'Animal Welfare', desc:'Products designed to promote health and happiness across diverse animal species.' },
            ].map(v => (
              <div key={v.title} className="value-card">
                <span className="value-icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Policies */}
        <section className="about-policies">
          <span className="section-eyebrow">Corporate Governance</span>
          <h2 className="section-title">Our Policies</h2>
          <div className="policies-grid">
            {['Quality Policy','Environmental Policy','Animal Welfare Policy','Anti-Corruption Policy','Data Privacy Policy'].map(p=>(
              <div key={p} className="policy-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
                <span>{p}</span>
                <a href="#">Download ↗</a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function Science() {
  return (
    <div className="simple-page">
      <div className="simple-hero">
        <div className="container">
          <span className="section-eyebrow">Science & Innovation</span>
          <h1 className="section-title section-title--white">Research-Backed Excellence</h1>
          <p className="section-lead" style={{ color:'rgba(255,255,255,0.65)' }}>
            Our R&D team works collaboratively to develop innovative products that address industry needs and advance the science of veterinary medicine.
          </p>
        </div>
      </div>
      <div className="container simple-body">
        {/* Trial results */}
        <section style={{ marginBottom:64 }}>
          <span className="section-eyebrow">Trial Results</span>
          <h2 className="section-title">Proven Performance Data</h2>
          <div className="trials-grid">
            {[
              { metric:'18%', label:'FCR Improvement', product:'Rotamin Binder Pro', detail:'Controlled trial: 5,000 broilers, 42 days, 3 farms in Punjab. Compared to untreated control group.', status:'Published' },
              { metric:'12%', label:'Milk Yield Increase', product:'Rota Plus Dairy', detail:'Field study: 120 Holstein cows, 90-day lactation period. Karachi dairy farms.', status:'Published' },
              { metric:'35%', label:'Mortality Reduction', product:'ImmunoBoost Liquid', detail:'Post-vaccination stress management study: 3 farms, 15,000 birds per farm.', status:'Published' },
              { metric:'22%', label:'Egg Production Gain', product:'Kamil Layer Pack', detail:'Layer flock study: 8,000 birds, 16-week production period.', status:'Ongoing' },
            ].map(t => (
              <div key={t.label} className="trial-card">
                <div className="trial-metric">{t.metric}</div>
                <div className="trial-label">{t.label}</div>
                <div className="trial-product">{t.product}</div>
                <p className="trial-detail">{t.detail}</p>
                <span className={`tag ${t.status==='Published'?'tag--green':'tag--gold'}`}>{t.status}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Technology */}
        <section style={{ marginBottom:64 }}>
          <span className="section-eyebrow">Technology & R&D</span>
          <h2 className="section-title">Advanced Farming Technologies</h2>
          <div className="tech-grid">
            {[
              { icon:'🤖', title:'Robotics & Automation', desc:'AI-powered robotic systems for data-driven broiler production decisions and 24/7 remote monitoring.' },
              { icon:'🎯', title:'Precision Farming', desc:'Target-weight feeding systems that regulate individual feed release to minimise waste and maximise FCR.' },
              { icon:'👁️', title:'Computer Vision', desc:'Deep learning algorithms for accurate body weight estimation and flock health monitoring.' },
              { icon:'📡', title:'IoT Integration', desc:'Smart sensor modules for temperature, humidity, fan control, water management, and alert notifications.' },
            ].map(t => (
              <div key={t.title} className="tech-card">
                <span className="tech-icon">{t.icon}</span>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Downloads */}
        <section className="downloads-section">
          <span className="section-eyebrow">Literature Downloads</span>
          <h2 className="section-title">Technical Documentation</h2>
          <div className="downloads-grid">
            {['Product Brochures','Product Information Sheets (PIS)','Trial Data Reports','Safety Data Sheets','Certifications (ISO, GMP, Halal)'].map(d=>(
              <a key={d} href="#" className="download-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                <span>{d}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function Industries() {
  return (
    <div className="simple-page">
      <div className="simple-hero">
        <div className="container">
          <span className="section-eyebrow">Industries Served</span>
          <h1 className="section-title section-title--white">Tailored for Every Sector</h1>
          <p className="section-lead" style={{ color:'rgba(255,255,255,0.65)' }}>
            From large-scale feed mills to individual farm veterinarians — we understand your challenges and deliver the right solutions.
          </p>
        </div>
      </div>
      <div className="container simple-body">
        {[
          { icon:'🌾', title:'Feed Mills', color:'var(--green)', desc:'Feed mills rely on consistency, quality, and pellet durability. Our Rotamin portfolio delivers proven binder technology, probiotic enhancement, and mycotoxin management solutions that improve product quality and protect end-user animals.', products:['Rotamin Binder Pro', 'Rotamin Premium', 'Mycotoxin Binder Range', 'Organic Acid Blends'], focus:'Binders · Mycotoxin Management · Probiotics · Organic Acids' },
          { icon:'🐄', title:'Farms & Veterinarians', color:'var(--navy)', desc:'Farms and practising veterinarians need reliable, DRAP-approved products with clearly stated withdrawal periods and efficacy data. Our antibiotic, phytogenic, and supportive care range supports both treatment and prevention protocols.', products:['Amoxicillin 20% WSP', 'Doxycycline 10%', 'Phytogenic Blend Pro', 'Multivitamin Liquid'], focus:'Antibiotics · Phytogenics · Anti-Virals · Supportive Care' },
          { icon:'🐟', title:'Aquaculture', color:'var(--navy-light)', desc:'A fast-growing sector in Pakistan and across Asia. Our aquaculture-specific formulations are currently in development, with initial products targeting gut health and feed conversion in commercial fish farming.', products:['Rotamin Aqua', 'Aqua Probiotic Plus'], focus:'Coming Soon — Contact Us for Pre-Launch Information' },
        ].map(ind => (
          <div key={ind.title} className="industry-detail" style={{ '--ic': ind.color }}>
            <div className="industry-detail__header">
              <span className="industry-icon">{ind.icon}</span>
              <div>
                <h2 style={{ fontFamily:'var(--font-display)', fontSize:'1.8rem', fontWeight:600, color:ind.color }}>{ind.title}</h2>
                <div className="industry-focus">{ind.focus}</div>
              </div>
            </div>
            <p className="industry-desc">{ind.desc}</p>
            <div className="industry-products">
              {ind.products.map(p => <span key={p} className="industry-product">{p}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <div className="simple-page">
      <div className="simple-hero">
        <div className="container">
          <span className="section-eyebrow">Get in Touch</span>
          <h1 className="section-title section-title--white">Contact M.A. Kamil Farma</h1>
          <p className="section-lead" style={{ color:'rgba(255,255,255,0.65)' }}>
            Product enquiries, distributor inquiries, or technical support — our team is ready to help.
          </p>
        </div>
      </div>
      <div className="container simple-body">
        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info">
            <h2>Our Offices</h2>
            {[
              { icon:'📍', label:'Registered Office', value:'H-17 SITE Phase 2, Karachi, Pakistan' },
              { icon:'📞', label:'Phone', value:'+92 123 456 7890' },
              { icon:'✉️', label:'Email', value:'info@makamilfarma.com' },
              { icon:'🕐', label:'Business Hours', value:'Mon–Sat, 9:00 AM – 6:00 PM (PKT)' },
            ].map(c => (
              <div key={c.label} className="contact-row">
                <span className="contact-icon">{c.icon}</span>
                <div>
                  <div className="contact-label">{c.label}</div>
                  <div className="contact-val">{c.value}</div>
                </div>
              </div>
            ))}

            <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="btn btn--green" style={{ marginTop:24 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us Now
            </a>
          </div>

          {/* Form */}
          <div className="contact-form-box">
            <h2>Send an Enquiry</h2>
            <div className="contact-form">
              {[['Full Name','text'],['Company / Farm Name','text'],['Email Address','email'],['Phone Number','tel']].map(([label,type])=>(
                <div key={label} className="form-field">
                  <label>{label}</label>
                  <input type={type} placeholder={label} />
                </div>
              ))}
              <div className="form-field">
                <label>Subject</label>
                <select>
                  <option>Product Enquiry</option>
                  <option>Distribution Partnership</option>
                  <option>Technical Support</option>
                  <option>General Enquiry</option>
                </select>
              </div>
              <div className="form-field">
                <label>Message</label>
                <textarea rows={4} placeholder="Tell us about your requirements…" />
              </div>
              <button className="btn btn--primary" style={{ width:'100%', justifyContent:'center' }}>Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Join() {
  return (
    <div className="simple-page">
      <div className="simple-hero">
        <div className="container">
          <span className="section-eyebrow">Careers</span>
          <h1 className="section-title section-title--white">Join the M.A. Kamil Farma Team</h1>
          <p className="section-lead" style={{ color:'rgba(255,255,255,0.65)' }}>
            We are looking for passionate individuals to help shape the future of veterinary pharmaceutical care in Pakistan and beyond.
          </p>
        </div>
      </div>
      <div className="container simple-body">
        {/* Open positions */}
        <section style={{ marginBottom:64 }}>
          <span className="section-eyebrow">Open Positions</span>
          <h2 className="section-title">Current Opportunities</h2>
          <div className="jobs-list">
            {[
              { title:'Senior Research Scientist – Veterinary Pharma', dept:'R&D', location:'Karachi', type:'Full-time' },
              { title:'Regional Sales Manager – Punjab', dept:'Sales', location:'Lahore', type:'Full-time' },
              { title:'Quality Assurance Officer', dept:'Manufacturing', location:'Karachi', type:'Full-time' },
              { title:'Veterinary Technical Advisor', dept:'Technical', location:'Multiple', type:'Full-time' },
              { title:'Digital Marketing Executive', dept:'Marketing', location:'Karachi', type:'Full-time' },
            ].map(j => (
              <div key={j.title} className="job-card">
                <div className="job-card__info">
                  <h3>{j.title}</h3>
                  <div className="job-card__tags">
                    <span className="tag tag--navy">{j.dept}</span>
                    <span className="tag">{j.location}</span>
                    <span className="tag tag--green">{j.type}</span>
                  </div>
                </div>
                <a href="mailto:careers@makamilfarma.com" className="btn btn--outline">Apply →</a>
              </div>
            ))}
          </div>
        </section>

        {/* Distributor */}
        <section className="distributor-section">
          <div className="distributor-cta">
            <div>
              <span className="section-eyebrow">Partnerships</span>
              <h2 className="section-title">Become a Distributor</h2>
              <p className="section-lead">
                We are actively seeking distribution partners in Pakistan, GCC, Africa, and Southeast Asia. If you have an established network in veterinary pharma or animal feed, we want to hear from you.
              </p>
            </div>
            <Link to="/contact" className="btn btn--gold">Enquire Now</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export function Expo2025() {
  return (
    <div className="simple-page">
      <div className="simple-hero">
        <div className="container">
          <span className="section-eyebrow">Expo 2025</span>
          <h1 className="section-title section-title--white">VIV Asia 2025 — Bangkok</h1>
          <p className="section-lead" style={{ color:'rgba(255,255,255,0.65)' }}>
            M.A. Kamil Farma will be exhibiting at VIV Asia 2025, Bangkok International Trade & Exhibition Centre, 19–21 March 2025.
          </p>
        </div>
      </div>
      <div className="container simple-body">
        <div style={{ maxWidth:720 }}>
          <h2 className="section-title">What We'll Be Showcasing</h2>
          <ul style={{ listStyle:'disc', paddingLeft:24, color:'var(--gray-500)', lineHeight:2, marginBottom:32 }}>
            <li>The complete Rotamin product line — binders, probiotics, and yeast solutions</li>
            <li>New phytogenic formulations from the Kamil Farma line</li>
            <li>Pharma & Nutra excipient portfolio for international buyers</li>
            <li>Trial data and case studies from Pakistan and GCC markets</li>
          </ul>
          <Link to="/contact" className="btn btn--gold">Register Your Interest</Link>
        </div>
      </div>
    </div>
  );
}
