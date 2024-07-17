// routes/mentorRoutes.js
import express from 'express';
import multer from 'multer';
import File from '../models/File.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
  const { username } = req.body;

  const newFile = new File({
    filename: originalname,
    oldpath: path,
    path: path,
    uploadedBy: username,
    fileType: 'excel'
  });

  await newFile.save();
  
  // Emit the new file event
  req.app.get('io').emit('newFile', newFile);

  res.json({ message: 'File uploaded successfully', file: newFile });
});

router.get('/files', async (req, res) => {
  const files = await File.find();
  res.json(files);
});

export default router;
