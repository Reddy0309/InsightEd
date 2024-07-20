import express from "express";
import Message from "../models/messages.js";

const router = express.Router();

router.post("/send", async (req, res) => {
  const { sender, receiver, message } = req.body;

  const newMessage = new Message({
    sender: sender,
    receiver: receiver,
    message: message,
    timestamp: new Date(),
  });
  await newMessage.save();
  res.json({ message: "Message sent successfully", newMessage: newMessage });
});
router.post("/see", async (req, res) => {
  const { name, usn } = req.body;
  const messages = await Message.find({ sender: usn, receiver: name }).sort({
    timestamp: -1,
  });
  res.json(messages);
});

router.post("/parentsee", async (req, res) => {
  const { name, usn } = req.body;
  const messages = await Message.find({ sender: name, receiver: usn }).sort({
    timestamp: -1,
  });
  res.json(messages);
});

router.post("/send-notifications", async (req, res) => {
  const { students } = req.body;

  if (!students || !Array.isArray(students)) {
    return res.status(400).send({ message: "Invalid students data." });
  }

  try {
    for (const student of students) {
      const usn = student.USN;
      const messageText = `\nDear Parent,\nPTM is scheduled.\nDate: 20/09/2024\nTime: 10:30Am\nVenue: KSIT, Meeting Area\nYou are requested to come and meet your ward's respective mentors.\nRegards,\nKSIT,Bangalore`;

      const notificationMessage = new Message({
        sender: "Mentor", // Assuming you have a sender field
        receiver: usn,
        message: messageText,
        timestamp: new Date(),
      });

      await notificationMessage.save();
    }

    res.send({ message: "PTM notifications sent successfully." });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).send({ message: "Failed to send PTM notifications." });
  }
});

router.get("/notifications/:usn", async (req, res) => {
  const usn = req.params.usn;

  try {
    const notifications = await Message.find({
      receiver: usn,
      sender: "Mentor",
    }).sort({ timestamp: -1 });
    res.send({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).send({ message: "Failed to fetch notifications." });
  }
});
export default router;
