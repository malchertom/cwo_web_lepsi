import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import csTranslation from "./locales/translation-cs.json";
import enTranslation from "./locales/translation-en.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      cs: { translation: csTranslation },
      en: { translation: enTranslation },
    },
    fallbackLng: "cs",       // Czech as fallback
    lng: "cs",               // default language
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"],
    },
  });

export default i18n;
