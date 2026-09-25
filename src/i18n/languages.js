// Every language the site offers. English is the source language; the others
// are translated from it (see translator/ and dictionaries/).
//
// htmlLang is what goes on <html lang>: it drives font selection in
// translator/fonts.css and lets the browser apply language-specific shaping.
// Punjabi is written in Shahmukhi (Perso-Arabic script) as used in Pakistan.
export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English', htmlLang: 'en', rtl: false },
  { code: 'ur', label: 'اردو', name: 'اردو', htmlLang: 'ur', rtl: true },
  { code: 'sd', label: 'سنڌي', name: 'سنڌي', htmlLang: 'sd', rtl: true },
  { code: 'pa', label: 'پنجابی', name: 'پنجابی', htmlLang: 'pa-Arab', rtl: true },
  { code: 'ps', label: 'پښتو', name: 'پښتو', htmlLang: 'ps', rtl: true },
];

export const DEFAULT_LANGUAGE = 'en';

export function getLanguage(code) {
  return LANGUAGES.find(lang => lang.code === code) || LANGUAGES[0];
}
