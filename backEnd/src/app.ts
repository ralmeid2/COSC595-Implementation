 import express, { Express } from 'express';
 import dotenv from 'dotenv';
 import connectDB from './util/connectDB'; 
import dailyNoticesHandler from './handler/dailyNotices.handler'
import photoHandler from './handler/photo.handler';
import authHandler from './handler/auth.handler';
import weatherHandler from './handler/weather.handler';
import optionsHandler from './handler/options.handler';

 dotenv.config();
 connectDB();
 const app: Express = express();
 const port = process.env.PORT;

 app.use(express.json({ limit: '500kb' }));
 app.use('/api/dailyNotices', dailyNoticesHandler)
 app.use('/api/auth', authHandler)
 app.use('/api/weather', weatherHandler)
 app.use('/api/photo', photoHandler)
 app.use('/api/options', optionsHandler)

 export default app;