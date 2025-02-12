import { getSentences } from "../../openAI/getSentences.js";
import { generateImages } from "../../generateImages/generateImages.js";
import { sendNextSentence } from "../sendNextSentence.js";
import { logAxiomEvent } from "../../utils/logAxiomEvent.js";
import { t, getUserLanguage } from "../../utils/translate.js";

export async function stepThree(ctx, session) {
    const difficulty = parseInt(ctx.message.text, 10);
    const lang = getUserLanguage(ctx);

    if (!difficulty) {
        return ctx.reply(t("PROMPT_DIFFICULTY_LEVEL", lang));
    }

    if (difficulty < 1 || difficulty > 5) {
        return ctx.reply(t("ERROR_DIFFICULTY_LEVEL", lang));
    }

    session.difficulty = difficulty;
    session.step = 4;
    ctx.reply(t("GENERATING_SENTENCES", lang));

    session.sentences = await getSentences(session.numSentences, session.maxWords, session.difficulty, lang);
    await generateImages(session);
    session.currentIndex = 0;

    logAxiomEvent("SESSION_DETAILS", { chatId: ctx.chat.id, payload: { session } });

    sendNextSentence(ctx, session);
    return;
}
