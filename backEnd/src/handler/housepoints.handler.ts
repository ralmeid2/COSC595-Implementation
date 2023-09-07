import express, { Request, Response, Router } from 'express';
import fs from 'fs';
import path from 'path';
import validateSchema from '../middleware/validateSchema';
import { updateOptionsSchema } from '../schema/options.schema';
const housepointsHandler: Router = express.Router();

// Path to the options.json file
const filePath = path.join(__dirname, '../../', 'housepoints.json');

/*  
  Route handler for API requests relating to retrieving and setting display options
  for the front end.
    Base route is /api/options

    GET /api/options/ - returns JSON with the current option settings
    POST /api/options - updates the options to reflect what is sent
    GET /api/options/message - returns JSON with the current broadcast message

  An options object should be sent in the body of the POST request, 
  in the following format.

  body: {
    options: {
      timer: boolean
      points: boolean
      events: boolean
      notices: boolean
      multiComponentView: boolean
      broadcast: boolean
      broadcastMessage: string
    }
  } 

  The current options are stored in the options.json folder
  located at /backEnd/options.json

  See the documentation for a description of the intended functionality of each option.
*/

housepointsHandler.get('/', (req: Request, res: Response) => {
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

housepointsHandler.post('/', validateSchema(updateOptionsSchema), async (req: Request, res: Response) => {
  const options = req.body.options;
  // Convert options object to JSON string
  const optionsJSON = JSON.stringify(options, null, 2);

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



export default housepointsHandler;