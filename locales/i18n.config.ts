import en from "./en.json";
import ko from "./ko.json";

const osLocale = process.client ? navigator.language.split("-")[0] : 'ko';

const messages = {
    en,
    ko,
}

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'ko',
    // fallbackLocale: "en",
    messages,
}));
