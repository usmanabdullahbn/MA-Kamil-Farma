import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsApp from './components/WhatsApp';
import Home from './pages/Home';
import NewProducts from './pages/NewProducts';
import ProductPage from './pages/ProductPage';
import { Blog, BlogPost } from './pages/Blog';
import { About, Science, Industries, Contact, Join, Expo2025 } from './pages/SimplePages';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
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
      <Navbar />
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
