import express, { Request, Response, Router } from 'express';
import fs from 'fs';
import path from 'path';

const housepointsHandler: Router = express.Router();

// Path to the housepoints.json file
const filePath = path.join(__dirname, '../../', 'housepoints.json');

/*  
  Route handler for API requests relating to retrieving and setting display options
  for the front end.
    Base route is /api/options

    GET /api/housepoints/ - returns JSON with the current housepoints
    POST /api/housepoints/ - updates housepoints to reflect what is sent

  A housepoints array should be sent in the body of the POST request, 
  in the following format.

  [{
    "name": string,
    "points": number,
    "color": string
  }]

  The current housepoints are stored in the housepoints.json folder
  located at /backEnd/housepoints.json

  See the documentation for a description of the intended functionality of each option.
*/

housepointsHandler.get('/', (req: Request, res: Response) => {
  // Read the housepoints JSON from the file
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

housepointsHandler.post('/', async (req: Request, res: Response) => {
  const housepoints = req.body.houses;
  console.log(housepoints)
  // Convert housepoints array to JSON string
  const housepointsJSON = JSON.stringify(housepoints, null, 2);

  // Write the housepoints JSON to the file
  fs.writeFile(filePath, housepointsJSON, (err) => {
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