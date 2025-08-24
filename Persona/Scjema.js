import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, 
    messages: [
      {
        role: { type: String, enum: ["system", "user", "model","assistant"], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
