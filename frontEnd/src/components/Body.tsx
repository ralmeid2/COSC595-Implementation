import { UserContext } from '../context'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import style from './Body.module.css'
import Timer from './Timer'
import PointsChart from './PointsChart'
import Slideshow from './Slideshow'

import { DailyNotice } from "../types";
import DailyNoticesView from "./DailyNotices";




export default function Body() {
    const houses = [
        { name: 'Clancy', points: 100, color: '#FCDF15' },
        { name: 'Haydon', points: 75, color: '#DF3F33' },
        { name: 'Mulrooney', points: 120, color: '#68D0E9' },
        { name: 'O\'Brien', points: 90, color: '#DEDEDE' },
        { name: 'Rice', points: 90, color: '#1E8A4E' },
        { name: 'Tracy', points: 90, color: '#1A2B95' },
    ];

    const [noticesData, setNoticesData] = useState<Array<DailyNotice>>([]);
    const [dailyNoticesLoading, setDailyNoticesLoading] = useState<boolean>(true);

    // Fetch notices data from the API
    useEffect(() => {
        const fetchNoticesData = async () => {
            try {
                setDailyNoticesLoading(true);
                const response = await fetch("/api/dailyNotices");

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();

                setNoticesData(data);

            } catch (error) {
                console.error("There was a problem with the fetch operation:", error);
            } finally {
                setDailyNoticesLoading(false);
            }
        };

        fetchNoticesData();
    }, []);

    return (

        <div className={style.container} >
            <div className={style.columnHolder}>
                <div className={style.leftColumn}>
                    <div className={style.component} >
                        <Timer />
                    </div>
                    <div className={style.component} >
                        <PointsChart houses={houses} />
                    </div>
                    <div className={style.component} >
                        <h1>Upcoming Events</h1>
                    </div>
                </div>
                <div className={style.rightColumn}>
                    <div className={style.component} >
                        <DailyNoticesView noticesData={noticesData} isLoading={dailyNoticesLoading} />
                    </div>
                </div>
            </div>
            <Slideshow />
        </div>

    )
}
