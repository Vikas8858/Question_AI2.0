import express from "express";
import { rewriteQuestion } from "../services/rewriter.js";

const router = express.Router();

router.post("/question-check", async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    try {
        const rewritten = await rewriteQuestion(text);

        res.json({
            original: text,
            rewrittenQuestion: rewritten
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
