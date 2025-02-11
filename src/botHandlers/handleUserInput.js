import { getSession, resetSession } from "../sessionManager.js";
import { getCurrentStep } from "../userPath/getCurrentStep.js";

export async function handleUserInput(ctx) {
    const session = getSession(ctx);

    if (ctx.message.text === "Stop") {
        resetSession(ctx);
        return ctx.reply("The session is stopped. Please text the number of sentences if you want to continue.");
    }

    const stepFunction = getCurrentStep(session.step);

    if (stepFunction) {
        await stepFunction(ctx, session);
    } else {
        ctx.reply("Unexpected step. Please restart the session.");
    }

    return;
}
