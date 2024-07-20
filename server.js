import express from "express";
import connectDB from "./database.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import mentorRoutes from "./routes/mentorRoutes.js";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import StuMentor from "./models/stumentor.js";
import MentorCred from "./models/mentor.js";
import Message from "./models/messages.js";
import messageRoutes from "./routes/gk.js";
import filterRoutes from "./routes/stufil.js";
import Notifications from "./models/Notifications.js";

const app = express();
const server = http.createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __dir = path.resolve();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/mentors", mentorRoutes);
app.use("/api/users", userRoutes);
app.use("/api/msg", messageRoutes);
app.use("/api/stufilter", filterRoutes);
app.use("/api/notifs", Notifications);

// Serve the frontend static files
app.use(express.static(path.join(__dir, "/frontend/build")));

// Serve index.html for any other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dir, "/frontend/build/index.html"));
});

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
