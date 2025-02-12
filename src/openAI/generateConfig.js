export function generateConfig({ prompt, language }) {
    const config = {
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content:
                    `You are a Hebrew tutor. Respond in JSON format (there must be hebrew, translation and nativePronunciation fields) with Hebrew sentences, translations for ${language} and pronaunciation in ${language}. Adhear to number of sentences, number of words in a sentence, difficulty level and language. Hebrew sentences must not have vowel signs`,
            },
            { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
    };

    return config;
}
