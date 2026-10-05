import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsApp from './components/WhatsApp';
import RibbonCutting from './components/RibbonCutting';
import PageTranslator from './i18n/translator/PageTranslator';
import Home from './pages/Home';
import NewProducts from './pages/NewProducts';
import ProductPage from './pages/ProductPage';
import { Blog, BlogPost } from './pages/Blog';
import { About, Science, Industries, Contact, Join, Expo2025 } from './pages/SimplePages';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const previousBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = previousBehavior;
  }, [pathname]);

  return null;
}

function NotFound() {
  return (
    <div style={{ paddingTop:160, textAlign:'center', minHeight:'60vh' }}>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', color:'var(--navy)', marginBottom:12 }}>Page Not Found</h2>
      <a href="/" style={{ color:'var(--navy)', fontWeight:600 }}>← Back to Home</a>
    </div>
  );
}

const AUTO_SCROLL_PAGES = ['/', '/about', '/products', '/industries', '/science', '/blog', '/join', '/contact'];

function AutoScrollControl() {
  const [running, setRunning] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pageIndex = useRef(0);

  useEffect(() => {
    const index = AUTO_SCROLL_PAGES.indexOf(pathname);
    if (index >= 0) pageIndex.current = index;
  }, [pathname]);

  useEffect(() => {
    if (!running) return undefined;
    let frame;
    let lastTick = 0;
    let switchTimer;
    // Pause at the top of each page so its content (images, product lists) can load
    // before we decide whether we've reached the bottom.
    const startTimer = window.setTimeout(() => {
      frame = window.requestAnimationFrame(scroll);
    }, 1500);
    const scroll = (time) => {
      if (time - lastTick >= 30) {
        window.scrollTo({ top: window.scrollY + 3, behavior: 'instant' });
        lastTick = time;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        switchTimer = window.setTimeout(() => {
          pageIndex.current = (pageIndex.current + 1) % AUTO_SCROLL_PAGES.length;
          navigate(AUTO_SCROLL_PAGES[pageIndex.current]);
        }, 1500);
        return;
      }
      frame = window.requestAnimationFrame(scroll);
    };
    return () => {
      window.clearTimeout(startTimer);
      window.cancelAnimationFrame(frame);
      window.clearTimeout(switchTimer);
    };
  }, [running, pathname, navigate]);

  return (
    <button
      type="button"
      className={`auto-scroll-control${running ? ' auto-scroll-control--active' : ''}`}
      onClick={() => setRunning(value => !value)}
      aria-pressed={running}
      aria-label={running ? 'Stop automatic scrolling' : 'Start automatic scrolling'}
      title={running ? 'Stop auto scroll' : 'Start auto scroll'}
    >
      {running ? (
        <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 4v15m-6-6 6 6 6-6"/></svg>
      )}
    </button>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppShell />
    </BrowserRouter>
  );
}

function AppShell() {
  const { pathname } = useLocation();
  const isProductDetail = pathname.startsWith('/products/detail/');

  return (
    <div className="app">
      <PageTranslator />
      {pathname === '/' && <RibbonCutting />}
      <Navbar />
      <AutoScrollControl />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<NewProducts />} />
          <Route path="/products/detail/:slug" element={<ProductPage />} />
          <Route path="/products/:brand" element={<NewProducts />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/science" element={<Science />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/join" element={<Join />} />
          <Route path="/expo2025" element={<Expo2025 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isProductDetail && <Footer />}
      {!isProductDetail && <WhatsApp />}
    </div>
  );
}
