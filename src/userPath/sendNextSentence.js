import { t, getUserLanguage } from "../utils/translate.js";

export async function sendNextSentence(ctx, session) {
    const lang = getUserLanguage(ctx);
    const progress = `[${session.currentIndex + 1}/${session.sentences.length}]`;
    const reply = progress + t("SENTENCE_REQUEST", lang);

    ctx.reply(reply, {
        reply_markup: { keyboard: [["Stop"]], resize_keyboard: true, one_time_keyboard: true },
    });

    await ctx.replyWithPhoto({ source: session.sentences[session.currentIndex].hebrewCursive });
    
    return;
}
