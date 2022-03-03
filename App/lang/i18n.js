import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import tr from './tr';
import en from './en';

i18n.use(initReactI18next).init({
  lng: getLocales()[0].languageCode,
  fallbackLng: 'tr',
  debug: true,
  resources: {
    tr,
    en,
  },
});
