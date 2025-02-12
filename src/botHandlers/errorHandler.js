import { Markup } from "telegraf";
import { getSession, resetSession } from "../sessionManager.js";
import { logAxiomEvent } from "../utils/logAxiomEvent.js";
import { getUserLanguage, t } from "../utils/translate.js";

export function applyGlobalErrorHandler(bot) {

    bot.catch(async (error, ctx) => {
        const language = getUserLanguage(ctx);
        const session = getSession(ctx);
        console.error("❌ Error in bot handler:", error);
        console.error("User session:", session);
        logAxiomEvent("SESSION_ERROR", { chatId: ctx.chat.id, payload: { level: "error", error, session } });

        await ctx.reply(
            t("ERROR_SOMETHING_WENT_WRONG", language),
            Markup.inlineKeyboard([Markup.button.callback(t("RESTART_BUTTON_TEXT", language), "restart_session")])
        );
    });

    bot.action("restart_session", async (ctx) => {
        resetSession(ctx);
        const language = getUserLanguage(ctx);
        await ctx.reply(t("RESTART_BUTTON_TEXT", language));
    });

    // Enable graceful stop
    process.once("SIGINT", () => bot.stop("SIGINT"));
    process.once("SIGTERM", () => bot.stop("SIGTERM"));
}
