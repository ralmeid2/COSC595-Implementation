import { UserContext } from '../context'
import {useContext, useEffect, useState} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import style from './Header.module.css'

import Weather from './Weather'
import logo from '../images/logo-white.svg'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useContext(UserContext)

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
    if (user) {
      if (location.pathname === '/'){
      return <>
       <button className={style.action} onClick={() => navigate('/edit')}><div className={style.text}>Admin</div></button>
       <button className={style.action} onClick={() => {logout()
        navigate('/')}}>Logout</button>
      </>
      } else if (location.pathname === '/display'){
        return false
      }
      else{
        return <>
       <button className={style.action} onClick={() => navigate('/')}><div className={style.text}>Home</div></button>
       <button className={style.action} onClick={() => {logout()
        navigate('/')}}>Logout</button>
      </>
      }
    }
    else {
      return location.pathname !== '/login' ? (
        <>
        <button className={style.action} onClick={() => navigate('/admin')}><div className={style.text}>Admin</div></button>
        <button className={style.action} onClick={() => navigate('/login')}><div className={style.text}>Login</div></button>
        </>
      ): (
        <>
        <button className={style.action} onClick={() => navigate('/admin')}><div className={style.text}>Admin</div></button>
        <button className={style.action} onClick={() => navigate('/sign-up')}><div className={style.text}>Sign Up</div></button>
        </>
      )
    }
  }

  return (
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
  )
}
