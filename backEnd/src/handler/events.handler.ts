//webcal://sec.act.edu.au/?post_type=tribe_events&tribe-bar-date=2023-05-27&ical=1&eventDisplay=list

import express, { Request, Response, Router } from 'express';

const eventsHandler: Router = express.Router();


eventsHandler.get('/', async (req: Request, res: Response) => {
    const webcalLink = 'https://sec.act.edu.au/?post_type=tribe_events&tribe-bar-date=2023-05-27&ical=1&eventDisplay=list';

    // Fetch the data from the webcal link
    const response = await fetch(webcalLink);
    const data = await response.text();
    const ICAL = require('ical.js');
    const jcalData = ICAL.parse(data);
    const comp = new ICAL.Component(jcalData);
    const months = [
        "January", 
        "February", 
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ]
    let list = []
    for (let i = 0; i < comp.jCal[2].length; i++) {
        if (comp.jCal[2][i][1][6] != undefined) 
        {
            const listDate = new Date(comp.jCal[2][i][1][0][3])
            if (!comp.jCal[2][i][1][6][3].startsWith("Week")){
                list.push({
                    event:comp.jCal[2][i][1][6][3],
                    date: `${months[listDate.getMonth()]} ${listDate.getDate()}` 
                })
            }
            
        }
    }
    list = list.slice(0,5)


    // Send the events as JSON in the response
    res.json({events:list});

});



export default eventsHandler;
