import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language
  interpolation: {
    escapeValue: false, // React already handles escaping
  },
  resources: {
    en: { translation: {} }, // Empty translation for default language
  },
});

export default i18n;
