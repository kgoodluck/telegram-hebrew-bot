export function generatePrompt(userInput) {
    const { numSentences, maxWords, difficulty, language } = checkUserInput(userInput);

    const prompt = `Give ${numSentences} Hebrew sentences with a maximum of ${maxWords} words.
The sentences should align with difficulty level ${difficulty} out of 5.
${difficultyDescriptions[difficulty]}
The sentences should have a translation to ${languageName[language]} and also include the Hebrew pronunciation in ${languageName[language]}, as if you used ${languageName[language]} to write the sounds of Hebrew (e.g., ${example[language]}).
Return them as JSON with 'hebrew', 'translation', and 'nativePronunciation' fields.`;
    
    console.log("🚀 ~ generatePrompt ~ prompt:", prompt);

    return prompt;
}

const difficultyDescriptions = {
    1: "Very simple sentences for beginners, suitable for children.",
    2: "Basic sentences with common vocabulary and simple structure.",
    3: "Intermediate sentences with more varied vocabulary and grammar.",
    4: "Advanced sentences using complex grammar and less common words.",
    5: "Professional-level Hebrew, like a native speaker would use in formal writing.",
};

const example = {
    es: "'Ez-ra, lo ya-da-ti she-ha-yom sha-bat' for 'עזרה, לא ידעתי שהיום שבת'",
    en: "'Ehz-rah, lo yah-dah-tee sheh hah-yohm Shah-baht' for 'עזרה, לא ידעתי שהיום שבת'",
    ru: "'Эзра, ло йодати ше hа-йом шабат' for 'עזרה, לא ידעתי שהיום שבת'",
    fr: "'Ez-ra, lo ya-da‑ti che-ha-yom cha-bat' for 'עזרה, לא ידעתי שהיום שבת'",
}

export const languageName = {
    es: "Spanish",
    en: "English",
    ru: "Russian",
    fr: "French",
};

function checkUserInput({ numSentences, maxWords, difficulty, language }) {
    numSentences = +numSentences > 10 ? 10 : parseInt(numSentences) || 3;
    maxWords = +maxWords > 15 ? 15 : parseInt(maxWords) || 5;
    difficulty = +difficulty >= 5 ? 5 : parseInt(difficulty) || 3;

    return { numSentences, maxWords, difficulty, language };
}
