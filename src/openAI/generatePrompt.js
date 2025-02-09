export function generatePrompt(userInput) {
    const { numSentences, maxWords, difficulty } = checkUserInput(userInput);

    const prompt = `Give ${numSentences} Hebrew sentences with a maximum of ${maxWords} words. 
    The sentences should be in the present tense and align with difficulty level ${difficulty}.
    ${difficultyDescriptions[difficulty]} 
    Return them as JSON with 'hebrew' and 'translation' fields.`;

    return prompt;
}


const difficultyDescriptions = {
    1: "Very simple sentences for beginners, suitable for children.",
    2: "Basic sentences with common vocabulary and simple structure.",
    3: "Intermediate sentences with more varied vocabulary and grammar.",
    4: "Advanced sentences using complex grammar and less common words.",
    5: "Professional-level Hebrew, like a native speaker would use in formal writing.",
};


function checkUserInput({ numSentences, maxWords, difficulty }) {
    numSentences = +numSentences > 10 ? 10 : parseInt(numSentences) || 3;
    maxWords = +maxWords > 15 ? 15 : parseInt(maxWords) || 5;
    difficulty = +difficulty >= 5 ? 5 : parseInt(difficulty) || 3;

    return { numSentences, maxWords, difficulty };
}
