import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import XHR  from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import enResource from './locales/en/home.json';
import frResource from './locales/fr/home.json';
// import enCustomer from './locales/en/customer.json';
// import frCustomer from './locales/fr/customer.json';
// import enProduct from './locales/en/product.json';
// import frProduct from './locales/fr/product.json';

// const instance = i18n.createInstance();

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: 'en',
    fallbackLng: "en",
    keySeparator: '.', // we do not use keys in form messages.welcome
    nsSeparator: true,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    ns: ["home", "customer", "common"],
    // defaultNS: [ "home", "customer", "common"],
    fallbackNS: [ "home", "customer", "common"],
    react: {
      useSuspense: true,
      wait: true,
      nsMode: 'default',
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      withRef: true
    }
  });
  i18n.addResourceBundle('en', 'home', enResource, true)
  i18n.addResourceBundle('fr', 'home', frResource, true)
//   i18n.addResourceBundle('en', 'common', enCommonResource, true)
// i18n.addResourceBundle('fr', 'common', frCommonResource, true)
  // i18n.addResource(['en'], 'home', enResource);
  // i18n.addResource(['fr'], 'home', frResource);
  export default i18n;