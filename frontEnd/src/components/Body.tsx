import { UserContext } from '../context'
import {useContext, useEffect, useState} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import style from './Body.module.css'
import Timer from './Timer'
import PointsChart from './PointsChart'


export default function Body() {
  const houses = [
    { name: 'Clancy', points: 100, color: '#FCDF15' },
    { name: 'Haydon', points: 75, color: '#DF3F33' },
    { name: 'Mulrooney', points: 120, color: '#68D0E9' },
    { name: 'O\'Brien', points: 90, color: '#DEDEDE' },
    { name: 'Rice', points: 90, color: '#1E8A4E' },
    { name: 'Tracy', points: 90, color: '#1A2B95' },
    
  ];
  return (

      <div className = {style.container} >

        <div className = {style.component} >
            <Timer/>
        </div>
        <div className = {style.component} >
            <h3>Space for a component</h3>
            <p>Content goes here</p>
        </div>  
        <div className = {style.component} >
        <PointsChart houses={houses} />
          </div>      

      </div>

  )
}
