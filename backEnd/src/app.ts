import express, { Express } from 'express';
import dotenv from 'dotenv';
import connectDB from './util/connectDB';
import dailyNoticesHandler from './handler/dailyNotices.handler'
import photoHandler from './handler/photo.handler';
import eventsHandler from './handler/events.handler';
import weatherHandler from './handler/weather.handler';
import optionsHandler from './handler/options.handler';

/* 
    The Express.js App. 

    Connects to the database, sets up the routes and handlers
    and waits for requests. 
*/

dotenv.config();
connectDB();
const app: Express = express();
const port = process.env.PORT;
app.use(express.json({ limit: '500kb' }));
app.use('/api/dailyNotices', dailyNoticesHandler)
app.use('/api/weather', weatherHandler)
app.use('/api/photo', photoHandler)
app.use('/api/options', optionsHandler)
app.use('/api/events', eventsHandler)

export default app;