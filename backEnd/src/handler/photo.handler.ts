import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const photoHandler = express.Router();

photoHandler.use(cors());

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const destinationPath = `../frontEnd/public/uploads`;
      fs.mkdirSync(destinationPath, { recursive: true });
      cb(null, destinationPath);
    },
    filename: (req: any, file: any, cb: any) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });
  
  photoHandler.post('/', upload.fields([{ name: 'photo' }, { name: 'category' }]), (req: Request, res: Response) => {
    console.log(req.body)
    const photoFile = req.files['photo'][0]; // Access the uploaded photo
    const category = req.body.category; // Access the category
    const filename = photoFile.filename; 
    console.log(filename)
    const jsonFilePath = '../frontEnd/public/photo-manifest.json';
    
    let existingData = [];
    try {
      const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
      existingData = JSON.parse(jsonData);
    } catch (error) {


    }
    
    existingData.push({name:filename,category:category});
    try {
        fs.writeFileSync(jsonFilePath, JSON.stringify(existingData, null, 2));
        console.log('Data added to JSON file');
    } catch (error) {
    }
    return res.json({
      message: 'File uploaded successfully',
      category: category,
    });
  });

  photoHandler.get('/:category', (req: Request, res: Response) => {
    const jsonFilePath = '../frontEnd/public/photo-manifest.json'; 
    let photos = [];
    const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
    photos = JSON.parse(jsonData);
    if (req.params.category == "all") {
        return res.json(photos);
    } else {
        const filteredPhotos = photos.filter(photo => photo.category === req.params.category);
        return res.json(filteredPhotos);
    }

  });
  
  photoHandler.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const filePath = path.join('../frontEnd/public/uploads/'+ id);
 
    const jsonFilePath = '../frontEnd/public/photo-manifest.json';   
    let existingData = [];
    try {
      const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
      existingData = JSON.parse(jsonData);

    } catch (error) {


    }
    var filtered = existingData.filter(function(el) { return el.name != id; }); 

    try {
        fs.writeFileSync(jsonFilePath, JSON.stringify(filtered, null, 2));
        console.log('Edited photo manifest');
    } catch (error) {
    }

    fs.unlink(filePath, (error) => {
      if (error) {
        console.error('Error deleting file:', error);
        return res.status(500).json({ message: 'Error deleting file' });
      }
  
      return res.json({ message: 'File deleted successfully' });
    });
  });

export default photoHandler;
