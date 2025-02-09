export function getSentencesFromResponse(response) {
    const { content } = response.choices[0].message;
    const clearedContent = content.replace(/^```json\n/, "").replace(/\n```$/, "");
    const parsedContent = JSON.parse(clearedContent);

    const sentences = Array.isArray(parsedContent) ? parsedContent : [parsedContent];

    return sentences;
}