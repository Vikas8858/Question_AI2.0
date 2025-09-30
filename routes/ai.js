import express from "express";
import { rewriteQuestion } from "../services/rewriter.js";

const router = express.Router();

router.post("/question-check", async (req, res) => {
    try {
        const { text } = req.body;
        console.log('TEXT:', text);

        if (!text || text.trim() === "") {
            return res.status(400).json({ error: "Text is required" });
        }

        const result = await rewriteQuestion(text); // ✅ Already object
        res.json(result); // ✅ JSON.parse ki zarurat nahi

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
