import express, { Express } from 'express';
import dotenv from 'dotenv';
import dailyNoticesHandler from './handler/dailyNotices.handler'
import photoHandler from './handler/photo.handler';
import eventsHandler from './handler/events.handler';
import weatherHandler from './handler/weather.handler';
import optionsHandler from './handler/options.handler';
import housepointsHandler from './handler/housepoints.handler';

/* 
    The Express.js App. 

    Connects to the database, sets up the routes and handlers
    and waits for requests. 
*/

dotenv.config();
const app: Express = express();
app.use(express.json({ limit: '500kb' }));
app.use('/api/dailyNotices', dailyNoticesHandler)
app.use('/api/weather', weatherHandler)
app.use('/api/photo', photoHandler)
app.use('/api/options', optionsHandler)
app.use('/api/events', eventsHandler)
app.use('/api/housepoints', housepointsHandler)

export default app;