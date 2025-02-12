import { getSession, resetSession } from "../sessionManager.js";
import { getCurrentStep } from "../userPath/getCurrentStep.js";
import { t } from "../../src/utils/translate.js";

export async function handleUserInput(ctx) {
    const session = getSession(ctx);

    if (ctx.message.text === "Stop") {
        resetSession(ctx);
        return ctx.reply(t("SESSION_ABORTED", session.language));
    }

    const stepFunction = getCurrentStep(session.step);

    if (stepFunction) {
        await stepFunction(ctx, session);
    } else {
        ctx.reply(t("UNEXPECTED_STEP", session.language));
    }

    return;
}
