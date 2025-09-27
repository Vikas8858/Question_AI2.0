export function isQuestion(text) {
    if (!text) return false;

    const questionIndicators = [
        "kya","kaun","kab","kaise","kis","kon",
        "how","what","why","when","where",
        "is","are","do","does","did","can","could"
    ];

    const lowerText = text.toLowerCase().trim();
    if (lowerText.endsWith("?")) return true;

    for (let word of questionIndicators) {
        if (lowerText.includes(word + " ")) return true;
    }
    return false;
}
