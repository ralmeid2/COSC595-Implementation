import style from './Timer.module.css'
import React from 'react'


export default function Timer () {
    return <div>Current Period: {getCurrentPeriod()}</div>
}

function getMillis() {
    var now = new Date(),
    then = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,0,0),
    diff = now.getTime() - then.getTime();
    return diff
}

const getCurrentPeriod = () => {
    let now = new Date()
    for (const period of timetable) {
        let periodEnd = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            period.finish.hours,
            period.finish.minutes
        )
        if (periodEnd > now) {
            return period.name
        }
    }
}

const timetable = 
    [
        {
            name:"Before period 1",
            finish:{
                hours:8,
                minutes:45
            }
        },
        {
            name:"Period 1",
            finish:{
                hours:9,
                minutes:42
            }
        },
        {
            name:"Before Period 2",
            finish:{
                hours:9,
                minutes:45
            }
        },
        {
            name: "Period 2",
            finish:{
                hours:10,
                minutes:37
            }
        },
        {
            name: "Before Tutor Group",
            finish:{
                hours:10,
                minutes:40
            }
        },
        {
            name: "Tutor Group",
            finish:{
                hours:10,
                minutes:55
            }
        },
        {
            name: "Recess",
            finish:{
                hours:11,
                minutes:15
            }
        },
        {
            name: "Period 3",
            finish:{
                hours:12,
                minutes:10
            }
        },
        {
            name: "Before Period 4",
            finish:{
                hours:12,
                minutes:15
            }
        },
        {
            name: "Period 4",
            finish:{
                hours:13,
                minutes:5
            }
        },
        {
            name: "Lunch Time",
            finish: {
                hours:13,
                minutes:35
            }
        },
        {
            name:"End of lunch",
            finish:{
                hours:13,
                minutes:40
            }
        },
        {
            name: "Period 5",
            finish: {
                hours:14,
                minutes:32
            }
        },
        {
            name: "Before Period 6",
            finish: {
                hours: 14,
                minutes: 35
            }
        },
        {
            name: "Period 6",
            finish:{
                hours: 16,
                minutes: 50
            }
        }

    ]
