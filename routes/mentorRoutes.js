// backend/routes/mentorRoutes.js
//  import bcrypt from 'bcryptjs'; // For password hashing
import express from "express";
import MentorCredentials from "../models/mentor.js";
import multer from "multer";
import File from "../models/File.js";
import AnalysisFile from "../models/AnalysisFile.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import xlsx from "xlsx";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  },
});

const upload1 = multer({ storage: storage });

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if mentor exists
    const mentorCredentials = await MentorCredentials.findOne({ username });
    if (!mentorCredentials) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    if (password != mentorCredentials.password)
      return res.status(400).json({ message: "Invalid username or password" });
    // Handle successful login (e.g., return success message or token)
    res.json({ message: "Login successful", mentor: mentorCredentials });
  } catch (error) {
    console.error("Error logging in mentor:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/upload-sheet", upload.single("file"), async (req, res) => {
  try {
    const { originalname, filename } = req.file;
    const { username } = req.body;

    const newFile = new File({
      filename: originalname,
      oldpath: "",
      path: `/uploads/${filename}`,
      uploadedBy: username,
      fileType: "excel",
    });

    await newFile.save();

    res.json({ message: "File uploaded successfully", file: newFile });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ message: "Server error while uploading file" });
  }
});
router.post("/update-sheet", upload.single("file"), async (req, res) => {
  try {
    const { file } = req;
    const { updatedData } = req.body;

    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0]; // Assuming only one sheet
    const worksheet = workbook.Sheets[sheetName];

    // Process and apply updatedData to worksheet
    const updatedDataObj = JSON.parse(updatedData);

    // Example: updating cell A1 with updatedData
    worksheet["A1"] = { t: "s", v: updatedDataObj.A1 };

    // Write the updated workbook back to the file path
    xlsx.writeFile(workbook, file.path);

    res.json({ message: "Excel sheet updated successfully" });
  } catch (error) {
    console.error("Error updating Excel sheet:", error);
    res
      .status(500)
      .json({ message: "Server error while updating Excel sheet" });
  }
});
router.get("/files", async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (err) {
    console.error("Error fetching files:", err);
    res.status(500).json({ message: "Server error while fetching files" });
  }
});

// Handle file upload and store metadata
router.post("/analysis-upload", upload.single("file"), (req, res) => {
  try {
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Assuming the JSON data has 'USN' and 'SUM' fields
    const processedData = jsonData.map((item) => ({
      USN: item.USN,
      Name: item.NAME,
      SUM: item.SUM,
    }));

    res.status(200).json({ data: processedData });
  } catch (error) {
    res.status(500).json({ error: "Failed to process file" });
  }
});

router.post("/update-sheet", upload.single("file"), async (req, res) => {
  try {
    const { file } = req;
    const { updatedData } = req.body;
    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0]; // Assuming only one sheet
    const worksheet = workbook.Sheets[sheetName];

    // Process and apply updatedData to worksheet
    const updatedDataObj = JSON.parse(updatedData);

    // Example: updating cell A1 with updatedData
    worksheet["A1"] = { t: "s", v: updatedDataObj.A1 };

    // Write the updated workbook back to the file path
    xlsx.writeFile(
      workbook,
      "C:/Users/rteja/OneDrive/Desktop/6/MINIPROJECT/6Buploadmarkssheet.xlsx"
    );

    res.json({ message: "Excel sheet updated successfully" });
  } catch (error) {
    console.error("Error updating Excel sheet:", error);
    res
      .status(500)
      .json({ message: "Server error while updating Excel sheet" });
  }
});

router.get("/file/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../uploads", filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("File not found:", filePath);
      return res.status(404).json({ message: "File not found" });
    }

    res.sendFile(filePath, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  });
});
export default router;
