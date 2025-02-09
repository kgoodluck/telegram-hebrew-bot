import OpenAI from "openai";

import { generateConfig } from "./generateConfig.js";
import { generatePrompt } from "./generatePrompt.js";
import { getSentencesFromResponse } from "./getSentencesFromResponse.js";

import { mockData } from "./mockData.js";

const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getSentences(numSentences, maxWords, difficulty) {
    const prompt = generatePrompt({ numSentences, maxWords, difficulty });
    const openAIConfig = generateConfig(prompt);

    try {
        const response = await openAI.chat.completions.create(openAIConfig);
        const sentences = getSentencesFromResponse(response);

        return sentences;
    } catch (error) {
        console.error("Error fetching from OpenAI:", error.response?.data || error.message);
        return mockData;
    }
}
