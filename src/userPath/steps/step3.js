import { getSentences } from "../../openAI/getSentences.js";
import { generateImages } from "../../generateImages/generateImages.js";
import { sendNextSentence } from "../sendNextSentence.js";
import { logAxiomEvent } from "../../utils/logAxiomEvent.js";

export async function stepThree(ctx, session) {
    const difficulty = parseInt(ctx.message.text, 10);

    if (!difficulty) {
        return ctx.reply("Choose a difficulty level from 1 to 5 (1 — easy, 5 — professional):");
    }

    if (difficulty < 1 || difficulty > 5) {
        return ctx.reply("Invalid level! Please enter a number from 1 to 5.");
    }

    session.difficulty = difficulty;
    session.step = 4;
    ctx.reply("Generating sentences, please wait...");

    session.sentences = await getSentences(session.numSentences, session.maxWords, session.difficulty);
    await generateImages(session);
    session.currentIndex = 0;

    logAxiomEvent("SESSION_DETAILS", { chatId: ctx.chat.id, payload: { session } });

    sendNextSentence(ctx, session);
    return;
}
