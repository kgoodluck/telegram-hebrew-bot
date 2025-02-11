import { formatSentence } from "../../utils/formatSentence.js";
import { resetSession } from "../../sessionManager.js";
import { sendNextSentence } from "../sendNextSentence.js";
import { logAxiomEvent } from "../../utils/logAxiomEvent.js";

export async function stepFour(ctx, session) {
    const correctSentence = session.sentences[session.currentIndex].hebrew;
    const formattedSentence = formatSentence(correctSentence);
    const userInput = formatSentence(ctx.message.text);

    const isCorrectAnswer = userInput === formattedSentence;

    logAxiomEvent("USER_ANSWER", { chatId: ctx.chat.id, payload: { userInput, isCorrectAnswer } });

    if (!isCorrectAnswer) {
        return ctx.reply("❌ Incorrect! Try again.");
    }

    ctx.reply(`✅ Correct! Translation: ${session.sentences[session.currentIndex].translation}`);
    session.currentIndex++;

    const isHasMoreSentences = session.currentIndex < session.sentences.length;

    if (isHasMoreSentences) {
        return setTimeout(() => sendNextSentence(ctx, session), 500);
    }

    resetSession(ctx);
    setTimeout(() => ctx.reply("🎉 You've completed all sentences! Restarting..."), 500);
    setTimeout(() => ctx.reply("How many sentences do you want? (e.g., 5)"), 700);
}
