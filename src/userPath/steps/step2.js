export async function stepTwo(ctx, session) {
    const maxWords = parseInt(ctx.message.text, 10);

    if (!maxWords) {
        ctx.reply("Max words per sentence? (15 max)");
        return;
    }

    session.maxWords = maxWords;
    session.step = 3;

    return ctx.reply("Choose a difficulty level from 1 to 5 (1 — easy, 5 — professional):");
}
