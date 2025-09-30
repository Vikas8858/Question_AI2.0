import dotenv from "dotenv";
dotenv.config();

export async function rewriteQuestion(text) {
  if (!text) return { isQuestion: false };

  const prompt = `
Return a valid JSON object only, with no code block, no explanation, and no markdown formatting. Do NOT include triple backticks or "json" tag.

Determine if the input text is a question.

If yes, return JSON in this format only:
{
  "isQuestion": "yes",
  "question": "<h2>Proper English question</h2>",
  "answer": "<HTML-formatted detailed answer using multiple tags like <p>, <b>, <ul>, <li>, <u>, etc.> for clear structure>"
}

If no or unclear, return JSON in this format only:
{
  "isQuestion": "no"
}

Text: ${text}`;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("API KEY Not Found ❌");
    return { isQuestion: false };
  }

  const uri = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  try {
    const response = await fetch(uri, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    // ✅ Safe parsing: remove ```json or backticks if present
    const cleanedText = textResponse?.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch (err) {
      console.warn("Failed to parse Gemini response, returning fallback object", err);
      parsed = { isQuestion: false, raw: cleanedText }; // raw text return for debug
    }

    return parsed;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { isQuestion: false };
  }
}
