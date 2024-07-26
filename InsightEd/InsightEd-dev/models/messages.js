// backend/models/message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("message", messageSchema);

export default Message;
