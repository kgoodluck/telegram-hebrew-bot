import { getSession, resetSession } from "../sessionManager.js";
import { getCurrentStep } from "../userPath/getCurrentStep.js";

export async function handleUserInput(ctx) {
    const session = getSession(ctx);
    const chatId = ctx.chat.id;

    if (ctx.message.text === "Stop") {
        resetSession(chatId);
        ctx.reply("The session is stopped. Please text the number of sentences if you want to continue.");
        return;
    }

    const stepFunction = getCurrentStep(session.step);

    if (stepFunction) {
        await stepFunction(ctx, session);
    } else {
        ctx.reply("Unexpected step. Please restart the session.");
    }

    return;
}
