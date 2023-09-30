import style from './Timer.module.css'
import React, {useEffect, useState} from 'react'
// Please see https://github.com/wojtekmaj/react-clock for Clock documentation
import Clock from 'react-clock'
import 'react-clock/dist/Clock.css'

interface TimerProps {
    isFullScreen: boolean;
}

/**
 * Period and time display
 * @param isFullScreen - boolean to determine if the timer is in fullscreen mode
 * @returns Timer component
 * This component displays the current period and time
 * It uses the getCurrentPeriod function to determine the current school period
 * It uses the Clock component from react-clock to display the current time
 * **/
export default function Timer ({ isFullScreen }: TimerProps) {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

    const containerStyle = isFullScreen? style.fullScreen : style.multiScreen

    return <div className = {containerStyle}>
      <div className={style.container}>
        <Clock value={value} className={style.clock} />
        <div className={style.period}>{getCurrentPeriod()}</div>
      </div>
    </div>
}

//uses the current time to search through the timetable array and return appropriate period
//TODO: add a countdown to the next class if it is not classtime.
export const getCurrentPeriod = () => {
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
    return "See you tomorrow"
}

//information about the school timetable
export const timetable =
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
