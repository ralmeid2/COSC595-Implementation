import { UserContext } from '../context'
import { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import style from './Header.module.css'

import Weather from './Weather'
import logo from '../images/SEC-logo-name.png'
import placeHolderWeatherIcon from '../images/placeholder/rain.png'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useContext(UserContext)

  const getActions = () => {
    if (user) {
      if (location.pathname === '/'){
      return <>
       <button className={style.action} onClick={() => navigate('dashboard')}>Dashboard</button>
       <button className={style.action} onClick={() => {logout() 
        navigate('/')}}>Logout</button>
      </>
      }
      else{
        return <>
       <button className={style.action} onClick={() => navigate('home')}>Home</button>
       <button className={style.action} onClick={() => {logout() 
        navigate('/')}}>Logout</button>
      </>
      }
    }
    else {
      return location.pathname !== '/login' ? (
        <button className={style.action} onClick={() => navigate('login')}>Login</button>
      ): (
        <button className={style.action} onClick={() => navigate('sign-up')}>Sign Up</button> 
      )
    }
  }

  const weatherData = {
    temperature: 20,
    iconUrl: placeHolderWeatherIcon
  }
  return (
    <header className={style.header}>
      <div className={style.container}>
        <Link to="/">
            <img src={logo} alt="logo" className={style.logo} />
        </Link>
        <Weather  weatherData={weatherData}/>
        <div className={style.actions}>
          { getActions() }
        </div>
      </div>
    </header>
  )
}
