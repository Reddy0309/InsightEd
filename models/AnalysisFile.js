// models/File.js
import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const AnalysisFile = mongoose.model("AnalysisFile", fileSchema);

export default AnalysisFile;
