import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import { Redis } from "@telegraf/session/redis";
import { Telegraf, session } from "telegraf";
import { startBot } from "./src/botHandlers/startBot.js";
import { handleUserInput } from "./src/botHandlers/handleUserInput.js";
import { applyGlobalErrorHandler } from "./src/botHandlers/errorHandler.js";

const app = express();
app.use(bodyParser.json());

const store = Redis({ url: process.env.REDIS_URL });

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.use(session({ store }));
bot.start((ctx) => startBot(ctx));
bot.on("text", async (ctx) => handleUserInput(ctx));
bot.launch();

applyGlobalErrorHandler(bot);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
