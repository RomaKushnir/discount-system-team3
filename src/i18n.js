import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './translations/en';
import ua from './translations/ua';
import ru from './translations/ru';

const resources = {
  en: {
    translation: en
  },
  ru: {
    translation: ru
  },
  ua: {
    translation: ua
  }
};

i18n.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
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
    value: 'ru',
    label: 'ru'
  },
  {
    value: 'ua',
    label: 'ua'
  }
];
