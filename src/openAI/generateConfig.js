export function generateConfig(prompt) {
    const config = {
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content:
                    "You are a Hebrew tutor. Respond in JSON format with Hebrew sentences and English translations.",
            },
            { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
    };

    return config;
}
