import express from "express";
import Conversation from "./Scjema.js";
import  askAI  from "./cot.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, message } = req.body;

    let conversation = await Conversation.findOne({ userId });
    if (!conversation) {
      conversation = new Conversation({ userId, messages: [] });
    }

    // Save user message
    conversation.messages.push({ role: "user", content: message });

    // Take last 5 messages for context
    const shortHistory = conversation.messages.slice(-5);

    // Ask Gemini
    const aiResponse = await askAI(message, shortHistory);

    // Save only the content, not the whole object
    conversation.messages.push({ role: "model", content: aiResponse.content });

    await conversation.save();

    res.json({ response: aiResponse.content });
  } catch (err) {
    console.error("Chat Route Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
