import fs from "fs";
import path from "path";
import { logAxiomEvent } from "./utils/logAxiomEvent.js";

export function getSession(ctx) {
    if (!ctx.session?.step) {
        ctx.session = { ...ctx.session, step: 1, sentences: [], currentIndex: 0, chatId: ctx.chat.id, user: ctx.from };
    }

    return ctx.session;
}

export function resetSession(ctx) {
    const chatId = ctx.chat.id;
    const language = ctx.session?.language || null;

    const dirPath = path.join("assets", "images", chatId.toString());
    fs.rmSync(dirPath, { recursive: true, force: true });

    logAxiomEvent('SESSION_FINISHED', { chatId });

    ctx.session = { step: 1, sentences: [], currentIndex: 0, chatId, user: ctx.from, language };;
}
