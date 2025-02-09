import { resetSession } from "../sessionManager.js";

export function startBot(ctx) {
    resetSession(ctx.chat.id);
    ctx.reply("How many sentences do you want? (e.g., 5)");
}
