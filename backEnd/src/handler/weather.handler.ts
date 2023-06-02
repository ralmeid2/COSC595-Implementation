import express, { Request, Response } from 'express'; 
import validateSchema from '../middleware/validateSchema';
import { getWeather } from '../service/weather.service';
import { getWeatherSchema } from '../schema/weather.schema';
const weatherHandler = express.Router();
const axios = require('axios')

/*
    Route handler for getting the current weather information from the Weather service.
    No information should be sent with the request. 
    For response details, see /service/weather.service
*/

weatherHandler.get("/", validateSchema(getWeatherSchema), async (req: Request, res: Response) => {
    const response = await getWeather()
    return res.status(200).send(response)
});

export default weatherHandler;