// backend/models/mentor.js
import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures uniqueness of username
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const MentorCredentials = mongoose.model("mentorcred", mentorSchema);

export default MentorCredentials;
