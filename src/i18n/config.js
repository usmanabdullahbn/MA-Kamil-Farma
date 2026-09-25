import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import urTranslations from './locales/ur.json';
import sdTranslations from './locales/sd.json';
import paTranslations from './locales/pa.json';
import psTranslations from './locales/ps.json';
import { DEFAULT_LANGUAGE, LANGUAGES, getLanguage } from './languages';
import { getTranslator, hasDictionary, loadTranslator } from './translator/loader';

const resources = {
  en: { translation: enTranslations },
  ur: { translation: urTranslations },
  sd: { translation: sdTranslations },
  pa: { translation: paTranslations },
  ps: { translation: psTranslations },
};

const isSupported = code => LANGUAGES.some(lang => lang.code === code);

// A ?lang=ur style link wins over the saved preference, so a page can be
// shared directly in a given language.
function initialLanguage() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (isSupported(fromUrl)) {
    localStorage.setItem('appLang', fromUrl);
    return fromUrl;
  }
  const saved = localStorage.getItem('appLang');
  return isSupported(saved) ? saved : DEFAULT_LANGUAGE;
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

// Keep <html lang/dir> in sync from the start, so the right font and text
// direction apply before first paint. While a language's dictionary is still
// downloading, the page is hidden (data-translating) instead of flashing
// English; PageTranslator clears the flag once the page is translated.
function applyDocumentLanguage(code) {
  const lang = getLanguage(code);
  const root = document.documentElement;
  root.lang = lang.htmlLang;
  root.dir = lang.rtl ? 'rtl' : 'ltr';

  if (hasDictionary(lang.code) && !getTranslator(lang.code)) {
    root.dataset.translating = 'pending';
    loadTranslator(lang.code).catch(() => {
      delete root.dataset.translating;
    });
  } else {
    delete root.dataset.translating;
  }
}
applyDocumentLanguage(i18n.language);
i18n.on('languageChanged', applyDocumentLanguage);

export default i18n;
