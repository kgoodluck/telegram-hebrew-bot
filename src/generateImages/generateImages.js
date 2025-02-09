import fs from "fs";
import path from "path";
import { UltimateTextToImage } from "ultimate-text-to-image";
import { getImageConfig } from "./getImageConfig.js";

export async function generateImages(session) {
    const { chatId } = session;

    const dirPath = path.join("assets", "images", chatId.toString());

    // Ensure the directory exists
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    for (const sentence of session.sentences) {
        sentence.hebrewCursive = await generateCursiveImage(sentence.hebrew, dirPath);
    }

    return;
}

async function generateCursiveImage(text, dirPath) {
    const imageConfig = getImageConfig();
    const image = new UltimateTextToImage(text, imageConfig);
    const filePath = path.join(dirPath, `${Date.now()}.png`);

    await image.render().toFile(filePath);

    return filePath;
}
