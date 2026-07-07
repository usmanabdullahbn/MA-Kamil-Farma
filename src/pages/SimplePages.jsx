import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Simple.css';

export function About() {
  const [openPolicy, setOpenPolicy] = useState(null);

  const policies = [
    {
      title: 'Quality Policy',
      content: 'M. A. Kamil Farma (Pvt) Limited is committed to manufacturing veterinary pharmaceutical products, including powder and liquid formulations, in compliance with DRAP regulations. We maintain rigorous quality controls to ensure every batch meets defined safety, efficacy, and purity standards. Our quality management system is continuously reviewed and improved so veterinarians, farmers, and distributors can rely on consistent product performance.',
    },
    {
      title: 'Environmental Policy',
      content: 'M. A. Kamil Farma (Pvt) Limited acknowledges the environmental responsibilities that come with pharmaceutical manufacturing. Our facility operates dedicated effluent and waste treatment systems to ensure that manufacturing by-products are managed safely before disposal. We comply with applicable Pakistani environmental regulations and work to minimize water, energy, and material waste across our production operations.',
    },
    {
      title: 'Animal Welfare Policy',
      content: 'At M. A. Kamil Farma (Pvt) Limited, animal welfare is a core value. We develop veterinary formulations for cattle, livestock, and other animals with their health and well-being as the primary objective. Our work is guided by recognized animal welfare principles, and we promote the responsible and humane use of all our products by veterinary professionals and livestock farmers.',
    },
  ];

  const togglePolicy = (title) => {
    setOpenPolicy(openPolicy === title ? null : title);
  };
  return (
    <div className="simple-page">
      <div className="simple-hero">
        <div className="container">
          <span className="section-eyebrow">Our Story</span>
          <h1 className="section-title section-title--white">Decades of Pharmaceutical Excellence</h1>
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
            At M.A. Kamil Farma Pvt. Ltd., we are guided by the Divine Providence of Allah and committed to the One Health vision. We believe the future of animal health lies in balancing proven therapeutic solutions with innovation, responsibility, and sustainability. Through responsible stewardship and continuous improvement, we strive to advance veterinary healthcare while creating lasting value for our communities and future generations.
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
          <h2 className="section-title">OUR JOURNEY SINCE 1923</h2>
          <div className="about-timeline">
            {[
              { year:'1923', title:'Origins in Kolkata', desc:'The Kamil family established its roots in the chemical trade in Kolkata (formerly Calcutta), laying the foundation for a business legacy that spans more than a century.' },
              { year:'2003', title:'Al Burque Enterprises', desc:'Established Al Burque Enterprises in Pakistan, supplying amino acids, vitamins, minerals, and specialty raw materials to the pharmaceutical, feed, and allied industries.' },
              { year:'2005', title:'Entry into Veterinary Healthcare', desc:'Entered the veterinary healthcare sector through a strategic partnership with Sintofarm, expanding into veterinary product distribution and strengthening our presence in Pakistan\'s growing animal health market.' },
              { year:'2009', title:'Contract Manufacturing Partnerships', desc:'Strengthened market presence through contract manufacturing partnerships with established pharmaceutical manufacturers, expanding the veterinary product portfolio and commercial reach.' },
              { year:'2012', title:'Strategic International Partnership', desc:'Began collaboration with Rotamin (Turkey), introducing imported toxin binder solutions and strengthening international partnerships in animal nutrition and health.' },
              { year:'2023', title:'Manufacturing Authorization Granted', desc:'Received veterinary pharmaceutical manufacturing authorization from the Drug Regulatory Authority of Pakistan (DRAP), marking a major milestone in the company\'s evolution.' },
              { year:'2024', title:'Manufacturing Operations Commence', desc:'M.A. Kamil Farma commenced commercial manufacturing of veterinary pharmaceutical products, marking the transition from trading and distribution to manufacturing.' },
              { year:'Today', title:'Building the Future of Animal Health', desc:'M.A. Kamil Farma continues to expand its manufacturing capabilities, international partnerships, and product portfolio while advancing its commitment to animal health, innovation, and sustainable growth.' },
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
          <span className="section-eyebrow">Our Commitments</span>
          <h2 className="section-title">What We Stand For</h2>
          <div className="values-grid">
            {[
              { icon:'🔬', title:'Quality & Compliance', desc:'Committed to maintaining the highest standards of quality, regulatory compliance, and product consistency.' },
              { icon:'🤝', title:'Strategic Partnerships', desc:'Building long-term relationships with international manufacturers, distributors, and industry stakeholders.' },
              { icon:'💡', title:'Innovation', desc:'Continuously exploring new technologies and solutions to meet the evolving needs of animal health.' },
              { icon:'⚖️', title:'Integrity', desc:'Conducting business with transparency, accountability, and professional ethics.' },
              { icon:'✅', title:'Reliability', desc:'Delivering dependable products, responsive service, and consistent market support.' },
              { icon:'🌱', title:'Sustainable Growth', desc:'Focused on creating long-term value through responsible business practices and continuous improvement.' },
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
            {policies.map((policy) => (
              <div
                key={policy.title}
                className={`policy-item ${openPolicy === policy.title ? 'policy-item--open' : ''}`}
                onClick={() => togglePolicy(policy.title)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && togglePolicy(policy.title)}
              >
                <div className="policy-item__header">
                  <div className="policy-item__title-wrap">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
                    <span>{policy.title}</span>
                  </div>
                  <span className="policy-item__chevron">{openPolicy === policy.title ? '−' : '+'}</span>
                </div>
                {openPolicy === policy.title && (
                  <div className="policy-content">
                    <p>{policy.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function Science() {
  const [openFaq, setOpenFaq] = useState(null);

  const focusAreas = [
    {
      title: 'Veterinary Pharmaceuticals',
      text: 'Development and optimization of animal health formulations designed to meet the evolving needs of modern livestock and poultry production.'
    },
    {
      title: 'Feed Additives',
      text: 'Focus on gut health, toxin management, probiotics, enzymes, phytogenic solutions, and nutritional technologies.'
    },
    {
      title: 'Animal Nutrition',
      text: 'Scientific approaches that support animal health, productivity, and performance.'
    },
    {
      title: 'One Health',
      text: 'Supporting animal health, food security, and sustainable livestock production through responsible innovation.'
    },
  ];

  const developmentAreas = [
    'AGP Alternative Technologies',
    'Gut Health Solutions',
    'Phytogenic Feed Additives',
    'Probiotic Systems',
    'Toxin Management Solutions',
    'Water-Soluble Nutritional Products'
  ];

  const researchResources = [
    'Technical Bulletins',
    'Product Information Sheets',
    'Trial Reports',
    'Research Publications'
  ];

  const faqItems = [
    {
      q: 'Does M.A. Kamil Farma conduct research and development activities?',
      a: 'Yes. Research and development is an important part of our long-term strategy, supporting innovation in veterinary pharmaceuticals, feed additives, nutritional solutions, and sustainable animal health technologies.'
    },
    {
      q: 'Do you perform field trials on your products?',
      a: 'Yes. Field evaluations and performance studies may be conducted in collaboration with veterinarians, farms, consultants, and industry partners where appropriate.'
    },
    {
      q: 'Are technical papers and research publications available?',
      a: 'Technical papers, trial summaries, white papers, and research publications will be published as they become available.'
    },
    {
      q: 'Can universities or researchers collaborate with M.A. Kamil Farma?',
      a: 'Yes. We welcome collaboration opportunities with universities, research institutions, veterinarians, consultants, and industry specialists.'
    },
    {
      q: 'What areas of research are currently important to M.A. Kamil Farma?',
      a: 'Current focus areas include veterinary pharmaceuticals, feed additives, nutritional technologies, gut health, performance optimization, toxin management, and sustainable production systems.'
    },
    {
      q: 'Do you develop alternatives to traditional antibiotic programs?',
      a: 'Our long-term innovation strategy includes evaluating nutritional, phytogenic, probiotic, and other science-based approaches that support responsible animal production.'
    },
    {
      q: 'Can I request scientific or technical information regarding a product?',
      a: 'Yes. Available technical information may be requested through our technical and commercial teams.'
    },
    {
      q: 'Will research results be published on the website?',
      a: 'Yes. As validated studies, technical papers, and performance data become available, they will be published through the Science section and Technical Library.'
    },
  ];

  return (
    <div className="simple-page">
      <div className="simple-hero">
        <div className="container">
          <span className="section-eyebrow">Science & Innovation</span>
          <h1 className="section-title section-title--white">Advancing Animal Health Through Science</h1>
          <p className="section-lead" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Research, product development, and technical expertise supporting veterinary pharmaceuticals, feed additives, and nutritional solutions.
          </p>
        </div>
      </div>

      <div className="container simple-body">
        <section className="science-section">
          <span className="section-eyebrow">Our Scientific Focus</span>
          <h2 className="section-title">Our Scientific Focus</h2>
          <div className="science-focus-grid">
            {focusAreas.map(area => (
              <article key={area.title} className="science-card">
                <h3>{area.title}</h3>
                <p>{area.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="science-section">
          <span className="section-eyebrow">Current Development Areas</span>
          <h2 className="section-title">Current Development Areas</h2>
          <div className="science-dev-grid">
            {developmentAreas.map(item => (
              <div key={item} className="science-dev-card">
                <span className="science-dev-card__icon">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="science-section">
          <span className="section-eyebrow">Scientific Resources</span>
          <h2 className="section-title">Scientific Resources</h2>
          <div className="science-resources-card">
            <ul>
              {researchResources.map(resource => (
                <li key={resource}>{resource}</li>
              ))}
            </ul>
            <p>Resources will be continuously updated as new information becomes available.</p>
          </div>
        </section>

        <section className="science-section science-section--last">
          <span className="section-eyebrow">Research & Collaboration</span>
          <h2 className="section-title">Research & Collaboration</h2>
          <div className="science-collab-card">
            <p>
              M.A. Kamil Farma actively collaborates with manufacturers, veterinarians, nutritionists,
              technical experts, and industry partners to support innovation and the advancement of
              animal health solutions.
            </p>
            <a href="/contact" className="btn btn--gold">Contact Scientific Affairs</a>
          </div>
        </section>

        <section className="faq-section">
          <div className="faq-section__header">
            <span className="section-eyebrow">Science & Research FAQs</span>
            <h2 className="section-title">Science & Research FAQs</h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <div key={item.q} className={`faq-item ${openFaq === index ? 'faq-item--open' : ''}`}>
                <button
                  type="button"
                  className="faq-item__question"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{item.q}</span>
                  <span className="faq-item__icon">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="faq-item__answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function Industries() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqItems = [
    {
      q: 'Which industries does M.A. Kamil Farma currently serve?',
      a: 'We currently serve poultry, livestock, feed additive, and animal nutrition sectors.'
    },
    {
      q: 'Do you supply feed mills?',
      a: 'Yes. We work with feed manufacturers through selected nutritional and feed additive solutions.'
    },
    {
      q: 'Do you work with large integrated farming operations?',
      a: 'Yes. Our products and technical support solutions are designed to support commercial-scale animal production operations.'
    },
  ];

  const industries = [
    {
      icon: '🐔',
      title: 'Poultry Industry',
      desc: 'Supporting broiler, layer, breeder, and integrated poultry operations with veterinary pharmaceuticals, nutritional solutions, and animal health technologies.',
      keyAreas: [
        'Disease Management',
        'Performance Optimization',
        'Preventive Healthcare',
        'Nutritional Support',
        'Production Efficiency',
      ],
    },
    {
      icon: '🌾',
      title: 'Feed Manufacturers & Nutrition Companies',
      desc: 'Providing feed additives, nutritional technologies, toxin management solutions, and specialty ingredients that support feed quality and animal performance.',
      keyAreas: [
        'Feed Additives',
        'Toxin Management',
        'Nutritional Technologies',
        'Feed Quality Solutions',
        'Performance Enhancement',
      ],
    },
    {
      icon: '🐄',
      title: 'Livestock & Dairy Operations',
      desc: 'Serving dairy, beef, and small-ruminant producers with animal health products and productivity-focused solutions.',
      keyAreas: [
        'Herd Health Management',
        'Dairy Production Support',
        'Disease Prevention',
        'Nutritional Solutions',
        'Animal Productivity',
      ],
    },
    {
      icon: '👨‍⚕️',
      title: 'Veterinarians & Animal Health Professionals',
      desc: 'Delivering reliable veterinary solutions supported by technical expertise, product knowledge, and industry experience.',
      keyAreas: [
        'Therapeutic Solutions',
        'Technical Support',
        'Veterinary Products',
        'Disease Management',
        'Professional Collaboration',
      ],
    },
    {
      icon: '🐾',
      title: 'Companion Animals',
      desc: 'Expanding into companion animal healthcare with a future portfolio focused on pet wellness, nutrition, and veterinary solutions. This initiative reflects our long-term commitment to serving the evolving needs of the animal health industry.',
      keyAreas: [
        'Pet Health',
        'Pet Nutrition',
        'Preventive Care',
        'Veterinary Support',
        'Companion Animal Wellness',
      ],
    },
    {
      icon: '🌍',
      title: 'International Manufacturers & Strategic Partners',
      desc: 'Supporting global animal health companies seeking market access, manufacturing capabilities, and long-term commercial partnerships in Pakistan\'s livestock, poultry, and emerging companion animal sectors.',
      keyAreas: [
        'Distribution Partnerships',
        'Contract Manufacturing',
        'Technology Transfer',
        'Product Registration Support',
        'Market Development',
      ],
    },
  ];

  return (
    <div className="simple-page">
      <div className="simple-hero">
        <div className="container">
          <span className="section-eyebrow">Industries We Serve</span>
          <h1 className="section-title section-title--white">Serving Pakistan's Animal Health Industry</h1>
          <p className="section-lead" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Through manufacturing expertise, market knowledge, and strategic partnerships, M.A. Kamil Farma supports key segments of Pakistan's livestock, poultry, feed, and veterinary sectors. Our solutions are designed to meet the evolving needs of producers, veterinarians, distributors, and animal health professionals across the country.
          </p>
        </div>
      </div>
      <div className="container simple-body">
        {/* Industry Cards Grid */}
        <section style={{ marginBottom: 80 }}>
          <div className="industries-grid">
            {industries.map((industry) => (
              <div key={industry.title} className="industry-card">
                <div className="industry-card__icon">{industry.icon}</div>
                <h3 className="industry-card__title">{industry.title}</h3>
                <p className="industry-card__desc">{industry.desc}</p>
                <div className="industry-card__areas">
                  <div className="industry-card__label">Key Areas</div>
                  <ul className="industry-card__list">
                    {industry.keyAreas.map((area) => (
                      <li key={area}>
                        <span className="list-bullet">•</span>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Partnership Opportunities */}
        <section className="partnership-cta">
          <div className="partnership-cta__content">
            <span className="section-eyebrow">Partnership Opportunities</span>
            <h2 className="section-title">Looking to Enter the Pakistani Market?</h2>
            <p className="section-lead">
              M.A. Kamil Farma collaborates with international manufacturers, technology providers, and animal health innovators seeking long-term growth opportunities in Pakistan's livestock and poultry sectors.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--gray-500)', marginTop: 16 }}>
              Our combination of market knowledge, industry relationships, and manufacturing capabilities makes us a trusted partner for sustainable business development.
            </p>
            <Link to="/contact" className="btn btn--gold" style={{ marginTop: 32 }}>
              Get in Touch
            </Link>
          </div>
        </section>

        <section className="faq-section">
          <div className="faq-section__header">
            <span className="section-eyebrow">Industry Frequently Asked Questions</span>
            <h2 className="section-title">Industry Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <div key={item.q} className={`faq-item ${openFaq === index ? 'faq-item--open' : ''}`}>
                <button
                  type="button"
                  className="faq-item__question"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{item.q}</span>
                  <span className="faq-item__icon">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="faq-item__answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function Contact() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqItems = [
    {
      q: 'How quickly can I expect a response?',
      a: 'Most inquiries receive a response within 1–3 business days.'
    },
    {
      q: 'Can I request a meeting?',
      a: 'Yes. Meetings may be arranged upon request.'
    },
    {
      q: 'Can I request technical documentation?',
      a: 'Yes. Available documentation may be provided after review of the inquiry.'
    },
    {
      q: 'Who should contact M.A. Kamil Farma?',
      a: 'Distributors, veterinarians, researchers, universities, feed manufacturers, commercial partners, and international collaborators.'
    },
    {
      q: 'Do you respond to international inquiries?',
      a: 'Yes. We actively welcome inquiries from international companies, distributors, and strategic partners.'
    },
  ];

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

            <a href="https://wa.me/923352249111" target="_blank" rel="noopener noreferrer" className="btn btn--green" style={{ marginTop:24 }}>
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

        <section className="faq-section">
          <div className="faq-section__header">
            <span className="section-eyebrow">Contact FAQs</span>
            <h2 className="section-title">Contact FAQs</h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <div key={item.q} className={`faq-item ${openFaq === index ? 'faq-item--open' : ''}`}>
                <button
                  type="button"
                  className="faq-item__question"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{item.q}</span>
                  <span className="faq-item__icon">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="faq-item__answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function Join() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqItems = [
    {
      q: 'Do you offer distribution opportunities?',
      a: 'Yes. We welcome discussions with qualified distributors and commercial partners.'
    },
    {
      q: 'Are international partnerships possible?',
      a: 'Yes. We actively explore technology-sharing, licensing, contract manufacturing, and distribution collaborations.'
    },
    {
      q: 'Can foreign companies work with M.A. Kamil Farma?',
      a: 'Yes. We welcome discussions with manufacturers, research organizations, and technology providers worldwide.'
    },
    {
      q: 'Do you provide contract manufacturing services?',
      a: 'Available opportunities may be discussed based on product category, regulatory requirements, and manufacturing capacity.'
    },
    {
      q: 'How can I submit a partnership proposal?',
      a: 'Please contact us through the Join Us page or Contact section.'
    },
  ];

  const partners = [
    {
      title: 'Distribution Opportunities',
      eyebrow: 'Become a Distribution Partner',
      desc: 'We welcome discussions with established distributors and commercial partners seeking to expand their presence in Pakistan\'s livestock, poultry, and animal health sectors.',
      areas: ['Veterinary Pharmaceuticals', 'Feed Additives', 'Nutritional Solutions', 'Animal Health Products', 'Companion Animal Solutions'],
      cta: { label: 'Enquire Now', to: '/contact' },
    },
    {
      title: 'International Partnerships',
      eyebrow: 'Partner With Us',
      desc: 'M.A. Kamil Farma actively collaborates with international manufacturers and technology providers seeking market access, manufacturing support, and long-term commercial growth opportunities in Pakistan.',
      areas: ['Distribution Partnerships', 'Contract Manufacturing', 'Technology Transfer', 'Product Development', 'Market Development'],
      cta: { label: 'Discuss Opportunities', to: '/contact' },
    },
    {
      title: 'Technical & Scientific Collaboration',
      eyebrow: 'Explore New Opportunities',
      desc: 'We welcome collaboration with universities, research institutions, technical experts, and industry professionals interested in advancing animal health through innovation, education, and knowledge sharing.',
      areas: ['Product Evaluation', 'Field Studies', 'Technical Training', 'Scientific Exchange', 'Industry Development'],
      cta: { label: 'Discuss Collaboration', to: '/contact' },
    },
  ];

  return (
    <div className="simple-page">
      <div className="simple-hero">
        <div className="container">
          <span className="section-eyebrow">Partnerships & Collaboration</span>
          <h1 className="section-title section-title--white">Grow With M.A. Kamil Farma</h1>
          <p className="section-lead" style={{ color: 'rgba(255,255,255,0.75)' }}>
            We are committed to building long-term relationships with distributors, manufacturers, technology providers, and animal health professionals who share our vision for advancing animal health.
          </p>
        </div>
      </div>

      <div className="container simple-body">
        <section style={{ marginBottom: 48 }}>
          <div className="partners-grid">
            {partners.map(p => (
              <div key={p.title} className="partner-card">
                <div>
                  <div className="partner-eyebrow">{p.eyebrow}</div>
                  <h3 className="partner-title">{p.title}</h3>
                  <p className="partner-desc">{p.desc}</p>
                </div>
                <div className="partner-areas">
                  <div className="partner-areas__label">Areas of Interest</div>
                  <ul className="partner-areas__list">
                    {p.areas.map(a => (
                      <li key={a}><span className="list-bullet">•</span>{a}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginTop: 12 }}>
                  <Link to={p.cta.to} className="btn btn--gold">{p.cta.label}</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="faq-section">
          <div className="faq-section__header">
            <span className="section-eyebrow">Partnership FAQs</span>
            <h2 className="section-title">Partnership FAQs</h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <div key={item.q} className={`faq-item ${openFaq === index ? 'faq-item--open' : ''}`}>
                <button
                  type="button"
                  className="faq-item__question"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{item.q}</span>
                  <span className="faq-item__icon">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="faq-item__answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 24 }}>
          <div className="future-careers">
            <span className="section-eyebrow">Future Careers</span>
            <h2 className="section-title">Careers at M.A. Kamil Farma</h2>
            <p className="section-lead" style={{ marginTop: 8 }}>
              As our organisation continues to grow, career opportunities will be announced through our official communication channels. For future opportunities, interested candidates may submit their profiles through the contact page.
            </p>
            <div style={{ marginTop: 18 }}>
              <Link to="/contact" style={{ marginBottom: 12 }} className="btn btn--gold">Submit Profile</Link>
            </div>
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
