import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const photoHandler = express.Router();

photoHandler.use(cors());

const storage = multer.diskStorage({
  destination: '../frontEnd/public/uploads/', // Specify the directory where the uploaded files will be stored
  filename: (req: any, file: any, cb: any) => {
    // Use the original file name as the new file name
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

photoHandler.post('/', upload.single('photo'), (req: Request, res: Response) => {
  // File received and saved successfully
  console.log("hit the route")
  return res.json({ message: 'File uploaded successfully' });
});

photoHandler.get('/', (req: Request, res: Response) => {
  fs.readdir('../frontEnd/public/uploads/', (error, files) => {
    if (error) {
      console.error('Error retrieving photos:', error);
      return res.status(500).json({ message: 'Error retrieving photos' });
    }

    const photos = files.map((file) => ({
      id: file,
      url: `uploads/${file}`,
    }));

    return res.json(photos);
  });
});

photoHandler.delete('/:id', (req: Request, res: Response) => {
  const photoId = req.params.id;
  const filePath = path.join('../frontEnd/public/uploads/', photoId);

  fs.unlink(filePath, (error) => {
    if (error) {
      console.error('Error deleting file:', error);
      return res.status(500).json({ message: 'Error deleting file' });
    }

    // File deleted successfully
    return res.json({ message: 'File deleted successfully' });
  });
});

export default photoHandler;
