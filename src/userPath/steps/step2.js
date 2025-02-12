import { t, getUserLanguage } from "../../utils/translate.js";

export async function stepTwo(ctx, session) {
    const maxWords = parseInt(ctx.message.text, 10);
    const lang = getUserLanguage(ctx);

    if (!maxWords) {
        ctx.reply(t("PROMPT_MAX_WORDS", lang));
        return;
    }

    session.maxWords = maxWords;
    session.step = 3;

    return ctx.reply(t("PROMPT_DIFFICULTY_LEVEL", lang));
}
