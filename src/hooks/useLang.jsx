import { createContext, useContext, useState } from 'react';

const TRANSLATIONS = {
  en: {
    tagline: 'Global-Standard Veterinary, Pharma & Nutra Solutions',
    subtagline: 'One Health. One Vision. One Kamil.',
    heroDesc: 'From Karachi to the world — M.A. Kamil Farma delivers pharmaceutical excellence for animal health, feed nutrition, and veterinary science since 1923.',
    exploreProducts: 'Explore Products',
    contactUs: 'Contact Us',
    ourProducts: 'Our Products',
    productsTitle: 'Complete Pharmaceutical Solutions',
    viewAll: 'View All',
    learnMore: 'Learn More',
    enquire: 'Enquire',
    readMore: 'Read More',
    blogTitle: 'News & Insights',
    blogSub: 'Science, innovation, and sustainability — our bi-weekly knowledge hub.',
    contactTitle: 'Get in Touch',
    whatsapp: 'Chat on WhatsApp',
    joinUs: 'Join Our Team',
  },
  ur: {
    tagline: 'عالمی معیار کے ویٹرنری، فارما اور نیوٹرا حل',
    subtagline: 'ایک صحت۔ ایک وژن۔ ایک کامل۔',
    heroDesc: 'کراچی سے دنیا تک — ایم۔اے کامل فارما 1923 سے جانوروں کی صحت میں فارماسیوٹیکل عمدگی فراہم کر رہی ہے۔',
    exploreProducts: 'مصنوعات دیکھیں',
    contactUs: 'رابطہ کریں',
    ourProducts: 'ہماری مصنوعات',
    productsTitle: 'مکمل دواسازی حل',
    viewAll: 'سب دیکھیں',
    learnMore: 'مزید جانیں',
    enquire: 'استفسار',
    readMore: 'مزید پڑھیں',
    blogTitle: 'خبریں اور بصیرت',
    blogSub: 'سائنس، اختراع، اور پائیداری — ہمارا دو ہفتہ وار علمی مرکز۔',
    contactTitle: 'رابطہ کریں',
    whatsapp: 'واٹس ایپ پر چیٹ کریں',
    joinUs: 'ہماری ٹیم میں شامل ہوں',
  },
  fr: {
    tagline: 'Solutions Vétérinaires, Pharma & Nutra de Standard Mondial',
    subtagline: 'Une Santé. Une Vision. Un Kamil.',
    heroDesc: 'De Karachi au monde entier — M.A. Kamil Farma délivre l\'excellence pharmaceutique pour la santé animale depuis 1923.',
    exploreProducts: 'Explorer Produits',
    contactUs: 'Nous Contacter',
    ourProducts: 'Nos Produits',
    productsTitle: 'Solutions Pharmaceutiques Complètes',
    viewAll: 'Voir Tout',
    learnMore: 'En Savoir Plus',
    enquire: 'Demande',
    readMore: 'Lire Plus',
    blogTitle: 'Actualités & Insights',
    blogSub: 'Science, innovation et durabilité — notre hub de connaissances bimensuel.',
    contactTitle: 'Contactez-Nous',
    whatsapp: 'Chatter sur WhatsApp',
    joinUs: 'Rejoignez Notre Équipe',
  },
  ar: {
    tagline: 'حلول بيطرية وصيدلانية وغذائية بمعايير عالمية',
    subtagline: 'صحة واحدة. رؤية واحدة. كامل واحد.',
    heroDesc: 'من كراتشي إلى العالم — تقدم شركة كامل فارما التميز الصيدلاني لصحة الحيوان منذ عام 1923.',
    exploreProducts: 'استكشاف المنتجات',
    contactUs: 'اتصل بنا',
    ourProducts: 'منتجاتنا',
    productsTitle: 'حلول صيدلانية متكاملة',
    viewAll: 'عرض الكل',
    learnMore: 'اعرف أكثر',
    enquire: 'استفسر',
    readMore: 'اقرأ المزيد',
    blogTitle: 'أخبار ورؤى',
    blogSub: 'العلوم والابتكار والاستدامة — مركزنا المعرفي نصف الشهري.',
    contactTitle: 'تواصل معنا',
    whatsapp: 'تحدث على واتساب',
    joinUs: 'انضم إلى فريقنا',
  },
};

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const isRTL = lang === 'ur' || lang === 'ar';
  return (
    <LangContext.Provider value={{ lang, setLang, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} style={{ fontFamily: isRTL ? "'Noto Nastaliq Urdu', var(--font-body)" : undefined }}>
        {children}
      </div>
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
