import React, { useEffect, useState } from 'react';

// Icon names from https://react-icons.github.io/react-icons/
import {
    FaSun,
    FaMoon,
    FaCloud,
    FaSmog,
    FaCloudRain,
    FaSnowflake,
    FaBolt,
    FaSmile,
    FaCloudSun,
    FaCloudMoon
} from "react-icons/fa";

import styles from './Weather.module.css';

export default function Weather({ weatherData, isLoading }: WeatherProps) {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true}));

    const weatherCodeToIcon = (code: number) => {
        /**
        Based on https://open-meteo.com/en/docs
        0	Clear sky
        1, 2, 3	Mainly clear, partly cloudy, and overcast
        45, 48	Fog and depositing rime fog
        51, 53, 55	Drizzle: Light, moderate, and dense intensity
        56, 57	Freezing Drizzle: Light and dense intensity
        61, 63, 65	Rain: Slight, moderate and heavy intensity
        66, 67	Freezing Rain: Light and heavy intensity
        71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
        77	Snow grains
        80, 81, 82	Rain showers: Slight, moderate, and violent
        85, 86	Snow showers slight and heavy
        95 *	Thunderstorm: Slight or moderate
        96, 99 *	Thunderstorm with slight and heavy hail
         **/

        const currentHour = new Date().getHours();

        const isDayTime = currentHour >= 6 && currentHour < 18;
        const baseIcon = isDayTime ? <FaSun /> : <FaMoon />;

        // Weird switch statement used to include multiple cases, see https://stackoverflow.com/a/60048899
        switch (true) {
            case code === 0:
                return baseIcon;
            case [1, 2].includes(code):
                return isDayTime ? <FaCloudSun /> : <FaCloudMoon />;
            case [3].includes(code):
                return <FaCloud />;
            case [45, 48].includes(code):
                return <FaSmog />;
            case [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code):
                return <FaCloudRain />;
            case [71, 73, 75, 77, 85, 86].includes(code):
                return <FaSnowflake />;
            case [95, 96, 99].includes(code):
                return <FaBolt />;
            default:
                // Smiley face if we don't have an icon for the weather code (only if the API is updated, checked on 30/09/2023)
                return <FaSmile />;
        }
    }


    useEffect(() => {
        // Getting time every second in HH:MM AM/PM format
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true}));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (isLoading || !weatherData)
        return <div className={styles.weatherContainer}>Loading weather...</div>;

    return (
        <div className={styles.weatherContainer}>
            <div className={styles.weatherTitle}>Current Weather</div>
            <div className={styles.time}>{currentTime}</div>
            <div className={styles.weatherInfoContainer}>
                <div className={styles.weatherIcon}>{weatherCodeToIcon(weatherData.weathercode)}</div>
                <div className={styles.temperature}>{weatherData.current_temp}<sup className={styles.superscript}>°C</sup></div>
            </div>
        </div>
    );
}



interface WeatherProps {
    weatherData: {
        current_temp: number;
        weathercode: number;
    } | null;
    isLoading: boolean;
}
