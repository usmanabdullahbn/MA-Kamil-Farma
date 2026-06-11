import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export function useLang() {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === 'ur' || i18n.language === 'ar';

  const setLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('appLang', lang);
  };

  // Update document attributes when language changes
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [i18n.language, isRTL]);

  return {
    lang: i18n.language,
    setLang,
    t,
    isRTL,
  };
}
