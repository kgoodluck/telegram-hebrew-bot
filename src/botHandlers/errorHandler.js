import { Markup } from "telegraf";
import { getSession, resetSession } from "../sessionManager.js";

export function applyGlobalErrorHandler(bot) {
    bot.catch(async (error, ctx) => {
        const session = getSession(ctx);
        console.error("❌ Error in bot handler:", error);
        console.error("User session:", session);

        await ctx.reply(
            "⚠️ Oops! Something went wrong. Click below to restart.",
            Markup.inlineKeyboard([Markup.button.callback("Restart", "restart_session")])
        );
    });

    bot.action("restart_session", async (ctx) => {
        resetSession(ctx.chat.id);
        await ctx.reply("Session restarted. How many sentences do you want?");
    });

    // Enable graceful stop
    process.once("SIGINT", () => bot.stop("SIGINT"));
    process.once("SIGTERM", () => bot.stop("SIGTERM"));
}
