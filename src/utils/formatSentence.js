export function formatSentence(text) {
    text = text.trim();

    // Remove all spaces that are not single (i.e., double, triple, etc.)
    text = text.replace(/\s{2,}/g, " ");

    // Remove punctuation from the beginning, middle, and end of the text
    text = text.replace(/^[.!?]+|[.!?]+$/g, ""); // Remove punctuation at the start or end
    text = text.replace(/[.!?]+/g, ""); // Remove punctuation from the middle

    return text;
}
