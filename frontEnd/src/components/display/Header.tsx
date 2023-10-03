import { useEffect, useState} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import style from './Header.module.css'

import Weather from './Weather'
import logo from '../../images/logo-white.svg'

interface HeaderProps {
  isFullScreen: boolean;
}

/**
 * Displays the header. This header is shown in the main multi-component view
 * Has weather information fetched from the open-meteo API (see backend/weather.service.ts)
 * @param isFullScreen
 * @constructor
 */
export default function Header({isFullScreen}: HeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const [weatherData, setWeatherData] = useState<{
        current_temp: number;
        weathercode: number;
    } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Get the weather data from the backend API and store it in state
    useEffect(() => {
      const fetchWeatherData = async () => {
        try {
          // While the fetch is ongoing, set isLoading to true so it shows a loading message
          setIsLoading(true);
          const response = await fetch("/api/weather");

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

        const data = await response.json();

        // Store the weather data in state
        setWeatherData({
          current_temp: data.current_temp,
          weathercode: data.weathercode,
        });

        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);

        // Remove the loading message after the fetch has finished
        } finally {
          setIsLoading(false);
        }
      };

      fetchWeatherData();
    }, []);

  const getActions = () => {
    //the menu options aren't needed on the 'display' route
    if (location.pathname === '/'){
      return <>
        <button className={style.action} onClick={() => navigate('/admin-options')}><div className={style.text}>Admin</div></button>
      </>
    } else if (location.pathname === '/display'){
      return false
    }
    else{
      return <>
      <button className={style.action} onClick={() => navigate('/')}><div className={style.text}>Home</div></button>
      </>
    }
  }

  const containerStyle = isFullScreen ? style.fullScreen : style.multiScreen

  return (
    <div className={containerStyle}>
      <header className={style.header}>
        <div className={style.container}>
          <Link to="/">
              <img src={logo} alt="logo" className={style.logo} />
          </Link>
          <Weather isLoading={isLoading} weatherData={weatherData}/>
          <div className={style.actions}>
            { getActions() }
          </div>
        </div>
      </header>
    </div>
  )
}
