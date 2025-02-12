import { resetSession } from "../sessionManager.js";
import { getUserLanguage, t } from "../utils/translate.js";

export async function handleUserAction(ctx) {
  const data = ctx.callbackQuery.data;
  console.log("🚀 ~ handleUserAction ~ data:", data)

  // Handle language setting actions, e.g., "lang_eng", "lang_rus", "lang_esp"
  if (data.startsWith("lang_")) {
    const lang = data.split("_")[1];
    if (!ctx.session) {
      ctx.session = {};
    }
    ctx.session.language = lang;
    await ctx.answerCbQuery();
    await ctx.reply(t("LANGUAGE_IS_SET", lang));
    await ctx.reply(t("PROMPT_NUMBER_OF_SENTENCES", lang));
  }
  // Handle session restart action
  else if (data === "restart_session") {
    resetSession(ctx);
    const lang = getUserLanguage(ctx);
    await ctx.answerCbQuery();
    await ctx.reply(t("SESSION_RESTARTED", lang));
  }
  // Optionally, handle other actions here
  else {
    // Fallback if the action is unrecognized
    await ctx.answerCbQuery("Unknown action", { show_alert: true });
  }
}
