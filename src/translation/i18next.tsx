import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


// Define file resources, where we define all translation keys.  
export const resources = {
    en: {
      translation: require('./en.json'),
    },
    fr: {
      translation: require('./fr.json'),
    },
  };

  

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    defaultNS: 'translation', // Default namespace to use
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
