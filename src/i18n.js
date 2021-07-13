import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './translations/en';
import ua from './translations/ua';

const resources = {
  en: {
    translation: en
  },
  ua: {
    translation: ua
  }
};

const lng = localStorage.getItem('lang');

i18n.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });
export default i18n;

export const Languages = [
  {
    value: 'en',
    label: 'en'
  },
  {
    value: 'ua',
    label: 'ua'
  }

];
