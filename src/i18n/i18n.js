
import { getLocale, setLocale, LOCALES, initLocale } from './locales.js';
import { TRANSLATIONS } from './translations.js';


initLocale();


export function t(key, params = {}) {
  const locale = getLocale();
  const translations = TRANSLATIONS[locale] || TRANSLATIONS[LOCALES.TR];
  
  let text = translations[key] || key;
  

  if (params && Object.keys(params).length > 0) {
    Object.keys(params).forEach(param => {
      const regex = new RegExp(`{${param}}`, 'g');
      text = text.replace(regex, params[param]);
    });
  }
  
  return text;
}


export { 
  getLocale, 
  setLocale, 
  LOCALES
};
