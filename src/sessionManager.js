import fs from "fs";
import path from "path";

const userSessions = {};

export function getSession(ctx) {
    const { from: user } = ctx.update.message;
    const { id: chatId } = ctx.chat;

    if (!userSessions[chatId]) {
        userSessions[chatId] = { step: 1, sentences: [], currentIndex: 0, chatId, user };
    }

    return userSessions[chatId];
}

export function resetSession(chatId) {
    const dirPath = path.join("assets", "images", chatId.toString());
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(chatId + " session finished ")
    
    userSessions[chatId] = null;
}
