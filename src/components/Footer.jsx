import { Link } from 'react-router-dom';
import farmaLogo from '../assert/Farma Logo.jpg';
import './Footer.css';

const CERTS = ['DRAP'];

export default function Footer() {
  return (
    <footer className="footer">
      {/* Certifications strip */}
      <div className="footer__certs-strip">
        <div className="container footer__certs-inner">
          <span className="footer__certs-label">Certified & Compliant:</span>
          {CERTS.map(c => (
            <span key={c} className="footer__cert-badge">{c}</span>
          ))}
          <span className="footer__certs-sep" />
          <span className="footer__certs-label">Download:</span>
          <a href="#" className="footer__cert-dl">Product Brochures</a>
          <a href="#" className="footer__cert-dl">PIS Sheets</a>
          <a href="#" className="footer__cert-dl">Trial Data</a>
        </div>
      </div>

      {/* Main footer */}
      <div className="footer__main">
        <div className="container footer__grid">
          {/* Brand col */}
          <div className="footer__brand">
            <div className="footer__logo">
              <img src={farmaLogo} alt="M.A. Kamil Farma" className="footer__logo-img" />
            </div>
            <p className="footer__tagline">
              One Health. One Vision.<br />
              <em>Trusted Partnerships. Responsible Solutions.</em>
            </p>
            <p className="footer__address">H-17 SITE Phase 2, Karachi, Pakistan</p>
          </div>

          {/* Products */}
          <div className="footer__col">
            <h4>Products</h4>
            <Link to="/products/kamil-farma">M.A. Kamil Farma Line</Link>
            <a href="https://feedadditives.makamilfarma.com" target="_blank" rel="noopener noreferrer">Feed Additives</a>
          </div>

          {/* Company */}
          <div className="footer__col">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/science">Science & Innovation</Link>
            <Link to="/industries">Industries Served</Link>
            <Link to="/blog">News & Insights</Link>
            <Link to="/join">Careers</Link>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4>Contact</h4>
            <a href="tel:+921234567890">+92 123 456 7890</a>
            <a href="mailto:info@makamilfarma.com">info@makamilfarma.com</a>
            <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="footer__wa">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} M.A. Kamil Farma Pvt. Ltd. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">DRAP Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
