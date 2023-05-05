import React, { useEffect, useState } from 'react';
import styles from './Weather.module.css';

interface WeatherProps {
    weatherData: {
        current_temp: number;
        weathercode: number;
    } | null;
    isLoading: boolean;
}

const Weather: React.FC<WeatherProps> = ({ weatherData, isLoading }) => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true}));

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true}));
        }, 1000);
        return () => clearInterval(timer);
    }, []);


    if (isLoading || !weatherData) {
        // Placeholder while weather is being fetched from API
        return <div className={styles.weatherContainer}>Loading weather...</div>;
    } else {
        return (
            <div className={styles.weatherContainer}>
                <div className={styles.weatherTitle}>Current Weather</div>
                <div className={styles.time}>{currentTime}</div>
                <div className={styles.weatherInfoContainer}>
                    <div className={styles.weatherIcon}>Code {weatherData.weathercode}</div>
                    {/*I'll leave this commented out while we implement the code -> icon logic*/}
                    {/*<img src={weatherData.weathercode} alt="weather icon" className={styles.weatherIcon} />*/}
                    <div className={styles.temperature}>{weatherData.current_temp}<sup className={styles.superscript}>°C</sup></div>
                </div>
            </div>
        );
    }


};

export default Weather;
