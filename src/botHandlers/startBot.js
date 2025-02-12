import { Markup } from "telegraf";
import { supportedLanguages, t } from "../utils/translate.js";
import { resetSession } from "../sessionManager.js";

export function startBot(ctx) {
    // if (!ctx.session?.language) {
    resetSession(ctx);
    const userTgLanguage = ctx.from.language_code;
    const isLanguageSupported = !!supportedLanguages[userTgLanguage];
    const greetingLanguage = isLanguageSupported ? userTgLanguage : "en";

    return ctx.reply(
        t("CHOOSE_LANGUAGE", greetingLanguage),
        Markup.inlineKeyboard([
            [Markup.button.callback("🇬🇧 English", "lang_en"), Markup.button.callback("🇷🇺 Русский", "lang_ru")],
            [Markup.button.callback("🇪🇸 Español", "lang_es"), Markup.button.callback("🇫🇷 Française", "lang_fr")],
        ])
    );

    // If language is already set, proceed with normal start flow.
    ctx.reply(t("prompt_sentence_number", ctx.session.language));
}
