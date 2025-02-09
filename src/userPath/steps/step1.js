import { resetSession } from "../../sessionManager.js";

export async function stepOne(ctx, session) {
    const numSentences = parseInt(ctx.message.text, 10);

    if (!numSentences) {
        resetSession(ctx.chat.id);
        return ctx.reply("How many sentences do you want? (10 max)");
    }

    session.numSentences = numSentences;
    session.step = 2;

    return ctx.reply("Max words per sentence? (15 max)");
}
