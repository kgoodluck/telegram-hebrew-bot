import { resetSession } from "../../sessionManager.js";
import { t, getUserLanguage } from "../../utils/translate.js";

export async function stepOne(ctx, session) {
    const numSentences = parseInt(ctx.message.text, 10);
    const lang = getUserLanguage(ctx);

    if (!numSentences) {
        resetSession(ctx);
        return ctx.reply(t("PROMPT_NUMBER_OF_SENTENCES", lang));
    }

    session.numSentences = numSentences;
    session.step = 2;

    return ctx.reply(t("PROMPT_MAX_WORDS", lang));
}
