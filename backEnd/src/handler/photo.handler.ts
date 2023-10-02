import express, { Request, Response } from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const photoHandler = express.Router();

photoHandler.use(cors());

/*  
  Route handler for API requests relating to retrieving and sending photo file names to the front end.
    
    Base route is /api/photos
    GET /api/photos/:category - returns JSON with the current housepoints for the requested category
    POST /api/photos/ - saves photo and updates photo manifest with filename and category
    DELETE /api/photos/ - deletes photo and updates photo manifest

  The current photos are stored in the ../frontEnd/public/uploads folder
  
*/

const storage = multer.diskStorage({
  //using multer to upload the file to the specified location in the front end folder
  destination: (req: any, file: any, cb: any) => {
    //path to photos location
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
  //first the data about the photo gets written to the manifest
  const photoFile = req.files['photo'][0]; // The uploaded photo
  const category = req.body.category; // The category
  const filename = photoFile.filename; //The file name
  const jsonFilePath = '../frontEnd/public/photo-manifest.json'; //location of photo manifest
  let existingData = [];
  try {
    //read the file data from the photo manifest
    const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
    existingData = JSON.parse(jsonData);
  } catch (error) {
    //error handling here
  }

  //add the uploaded photo to the array of existing data
  existingData.push({ name: filename, category: category });
  try {
    //write the existing data back to the file
    fs.writeFileSync(jsonFilePath, JSON.stringify(existingData, null, 2));
    console.log('Data added to JSON file');
  } catch (error) {
  }
  return res.json({
    message: 'File uploaded successfully',
    category: category,
  });
});
//gets a list of all photos from a specified category
photoHandler.get('/:category', (req: Request, res: Response) => {
  const jsonFilePath = '../frontEnd/public/photo-manifest.json';
  let photos = [];
  //get a list of all the photos
  const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
  photos = JSON.parse(jsonData);
  //filter to the required category
  if (req.params.category == "all") {
    return res.json(photos);
  } else {
    const filteredPhotos = photos.filter(photo => photo.category === req.params.category);
    return res.json(filteredPhotos);
  }

});

//deletes a photo and removes the information about it from the manifest
//the photo is found by name
photoHandler.delete('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const filePath = path.join('../frontEnd/public/uploads/' + id);
  const jsonFilePath = '../frontEnd/public/photo-manifest.json';
  let existingData = [];
  try {
    const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
    existingData = JSON.parse(jsonData);

  } catch (error) {


  }
  var filtered = existingData.filter(function (el: any) { return el.name != id; });

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
