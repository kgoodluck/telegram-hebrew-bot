export function generateConfig(prompt) {
    const config = {
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content:
                    "You are a Hebrew tutor. Respond in JSON format (hebrew, translation and nativePronunciation fields) with Hebrew sentences and translations for user's specified language. Adhear to number of sentences, number of words in a sentence and difficulty level. Hebrew sentences must not have vowel signs",
            },
            { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
    };

    return config;
}
