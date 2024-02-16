import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import common_tr from "./../public/locales/tr/translation.json";
import common_en from "./../public/locales/en/translation.json"
import common_ru from "./../public/locales/ru/translation.json"
import common_ar from "./../public/locales/ar/translation.json"

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'tr',
        debug: true,
        resources: {
            tr: {
                common: common_tr,
            },
            en: {
                common: common_en,
            },
            ar: {
                common: common_ar,
            },
            ru: {
                common: common_ru,
            },
        },
        ns: ["common"],
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;
