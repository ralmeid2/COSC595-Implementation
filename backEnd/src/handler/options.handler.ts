import express, { Request, Response, Router } from 'express';
import fs from 'fs';
import path from 'path';
import validateSchema from '../middleware/validateSchema';
import { updateOptionsSchema } from '../schema/options.schema';
const optionsHandler: Router = express.Router();

optionsHandler.post('/', validateSchema(updateOptionsSchema), async (req: Request, res: Response) => {
  const options = req.body.options;
  // Convert options object to JSON string
  const optionsJSON = JSON.stringify(options, null, 2);

  // Path to the options.json file
  const filePath = path.join(__dirname, '../../', 'options.json');
  // Write the options JSON to the file
  fs.writeFile(filePath, optionsJSON, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).send('Error occurred during submission.');
    } else {
      console.log('Options saved successfully.');
      res.sendStatus(200);
    }
  });
});

optionsHandler.get('/', (req: Request, res: Response) => {
  // Path to the options.json file
  const filePath = path.join(__dirname, '../../', 'options.json');

  // Read the options JSON from the file
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Error occurred while fetching options.');
    } else {
      const options = JSON.parse(data);
      res.json(options);
    }
  });
});

optionsHandler.get('/message', (req: Request, res: Response) => {
    // Path to the options.json file
    
  const filePath = path.join(__dirname, '../../', 'options.json');
  
    // Read the options JSON from the file
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        res.status(500).send('Error occurred while fetching options.');
      } else {
        const options = JSON.parse(data);
        res.json({message:options.broadcastMessage});
      }
    });
  });

export default optionsHandler;