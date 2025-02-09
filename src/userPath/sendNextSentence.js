export async function sendNextSentence(ctx, session) {
    const progress = `[${session.currentIndex + 1}/${session.sentences.length}]`;

    ctx.reply(`${progress} Type the following sentence:`, {
        reply_markup: { keyboard: [["Stop"]], resize_keyboard: true, one_time_keyboard: true },
    });

    await ctx.replyWithPhoto({ source: session.sentences[session.currentIndex].hebrewCursive });
    
    return;
}
