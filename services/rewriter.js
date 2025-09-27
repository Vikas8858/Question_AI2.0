import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    
 // ya direct yaha dal sakte ho
});

console.log("API Key = ",process.env.OPENAI_API_KEY);
export async function rewriteQuestion(text) {
    if (!text) return "";

    const prompt = `
You are a professional AI assistant. 
1. Identify if the given sentence is a question.
2. Rewrite the sentence into a professional, clear, numbered question format.
3. Output only the numbered questions.

Example:
Input: "Hye! kya hal hai. chlo start krte hai sbse phle apne bare me kch btao or fir ye btao ki react kya hota hai or uske features v."
Output:
1. Introduce yourself.
2. What is React and explain its features.

Now rewrite this sentence professionally:
"${text}"
`;

    const response = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
            { role: "system", content: "You are a helpful AI that converts sentences into professional questions." },
            { role: "user", content: prompt }
        ],
        temperature: 0.5
    });

    return response.choices[0].message.content.trim();
}
