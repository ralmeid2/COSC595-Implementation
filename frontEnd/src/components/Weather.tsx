import React, { useEffect, useState } from 'react';
import styles from './Weather.module.css';

interface WeatherProps {
    weatherData: {
        temperature: number;
        iconUrl: string;
    };
}

const Weather: React.FC<WeatherProps> = ({ weatherData }) => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true}));

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true}));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.weatherContainer}>
            <div className={styles.weatherTitle}>Current Weather</div>
            <div className={styles.time}>{currentTime}</div>
            <div className={styles.weatherInfoContainer}>
                <img src={weatherData.iconUrl} alt="weather icon" className={styles.weatherIcon} />
                <div className={styles.temperature}>{weatherData.temperature}<sup className={styles.superscript}>°C</sup></div>
            </div>
        </div>
    );
};

export default Weather;
