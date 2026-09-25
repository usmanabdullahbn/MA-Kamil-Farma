import { useTranslation } from 'react-i18next';
import { getLanguage } from '../i18n/languages';

export function useLang() {
  const { i18n, t } = useTranslation();

  const setLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('appLang', lang);
  };

  // <html lang/dir> are kept in sync by i18n/config.js.
  return {
    lang: i18n.language,
    setLang,
    t,
    isRTL: getLanguage(i18n.language).rtl,
  };
}
