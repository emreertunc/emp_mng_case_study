
export const LOCALES = {
  TR: 'tr',
  EN: 'en'
};

export const DEFAULT_LOCALE = LOCALES.TR;


export function getInitialLocale() {

  const browserLang = navigator.language.split('-')[0];
  

  const isSupported = Object.values(LOCALES).includes(browserLang);
  
  return isSupported ? browserLang : DEFAULT_LOCALE;
}

let currentLocale = getInitialLocale();


export function getLocale() {
  return currentLocale;
}


export function setLocale(locale) {
  if (!Object.values(LOCALES).includes(locale)) {
    console.error(`Desteklenmeyen dil: ${locale}`);
    return;
  }
  
  currentLocale = locale;
  

  localStorage.setItem('userLocale', locale);
  

  window.dispatchEvent(new CustomEvent('locale-changed', { detail: { locale } }));
  

  document.documentElement.lang = locale;
}

export function initLocale() {
  const savedLocale = localStorage.getItem('userLocale');
  
  if (savedLocale && Object.values(LOCALES).includes(savedLocale)) {
    setLocale(savedLocale);
  } else {
    setLocale(getInitialLocale());
  }
}
