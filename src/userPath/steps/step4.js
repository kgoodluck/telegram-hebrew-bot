import { formatSentence } from "../../utils/formatSentence.js";
import { resetSession } from "../../sessionManager.js";
import { sendNextSentence } from "../sendNextSentence.js";
import { logAxiomEvent } from "../../utils/logAxiomEvent.js";
import { getUserLanguage, t } from "../../utils/translate.js";

export async function stepFour(ctx, session) {
    const correctSentence = session.sentences[session.currentIndex]?.hebrew || "";
    const formattedSentence = formatSentence(correctSentence);
    const userInput = formatSentence(ctx.message.text);

    const isCorrectAnswer = userInput === formattedSentence;

    logAxiomEvent("USER_ANSWER", { chatId: ctx.chat.id, payload: { userInput, isCorrectAnswer } });

    const lang = getUserLanguage(ctx);
    if (!isCorrectAnswer) {
        return ctx.reply(t("INCORRECT_ANSWER", lang));
    }

    const { translation, nativePronunciation } = session.sentences[session.currentIndex];

    const reply = `${t("CORRECT_ANSWER", lang)} ${translation} \n "${nativePronunciation}"`;
    ctx.reply(reply);
    session.currentIndex++;

    const isHasMoreSentences = session.currentIndex < session.sentences.length;

    if (isHasMoreSentences) {
        return setTimeout(() => sendNextSentence(ctx, session), 500);
    }

    resetSession(ctx);
    setTimeout(() => ctx.reply(t("TASK_COMPLETED", lang)), 500);
    setTimeout(() => ctx.reply(t("PROMPT_NUMBER_OF_SENTENCES", lang)), 700);
}
