import { translationEng } from "../../assets/translations/translationEng.js";
import { translationRus } from "../../assets/translations/translationRus.js";
import { translationEsp } from "../../assets/translations/translationEsp.js";
import { translationFra } from "../../assets/translations/translationFra.js";

export const supportedLanguages = {
    en: translationEng,
    es: translationEsp,
    fr: translationFra,
    ru: translationRus,
};

export function t(key, lang = "en") {
    const dictionary = supportedLanguages[lang];
    const text = dictionary[key];
    return text;
}

export function getUserLanguage(ctx) {
    const language = ctx.session?.language || "en";
    return language;
}
