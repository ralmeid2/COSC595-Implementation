
import express, { Request, Response, Router } from 'express';
const eventsHandler: Router = express.Router();

/*
    Route handler for returning events from the school's publically available calendar. 
    The calendar is retrieved from:
    https://sec.act.edu.au/?post_type=tribe_events&tribe-bar-date=2023-05-27&ical=1&eventDisplay=list
    with today's date substituted in the correct place in the URL.

    which returns a .ics universal calendar file format in the text field of the response.

    We use the ICAL library to parse this data, see:

    https://www.npmjs.com/package/ical

    The API route is /api/events/

    The 3 closest upcoming events are returned in JSON format in the following format:
    {
        events: [
            {
                "event": string (the title of the event)
                "date": the date of the event in the format "Mmm DD" e.g. "Mar 21"  
            }
        ]
    }
*/

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

let currentData: any
let timeout = 60000
let lastRetrievalTime = Date.now()

eventsHandler.get('/', async (req: Request, res: Response) => {
    if (!currentData || Date.now() - lastRetrievalTime > timeout) {
        const today = new Date().toJSON().slice(0, 10);

        const webcalLink = 'https://sec.act.edu.au/?post_type=tribe_events&tribe-bar-date=' + today + '&ical=1&eventDisplay=list';

        console.log("Making new events request.")
        // Fetch the data from the webcal link
        const response = await fetch(webcalLink);
        const data = await response.text();
        const ICAL = require('ical.js');
        const jcalData = ICAL.parse(data);
        const comp = new ICAL.Component(jcalData);

        let list = []
        // parse event data and convert into correct format
        for (let i = 0; i < comp.jCal[2].length; i++) {
            if (comp.jCal[2][i][1][6] != undefined) {
                const listDate = new Date(comp.jCal[2][i][1][0][3])
                if (!comp.jCal[2][i][1][6][3].startsWith("Week")) {
                    list.push({
                        event: comp.jCal[2][i][1][6][3],
                        date: `${months[listDate.getMonth()]} ${listDate.getDate()}`
                    })
                }

            }
        }
        // only return the first 3 events
        list = list.slice(0, 3)

        currentData = list

        // Send the events as JSON in the response
        res.json({ events: list });
    } else {
        console.log('Returning cached events data.')
        return currentData
    }
});

export default eventsHandler;