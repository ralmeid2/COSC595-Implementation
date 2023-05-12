import { UserContext } from '../context'
import {useContext, useEffect, useState} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import style from './Body.module.css'
import Timer from './Timer'


export default function Body() {

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
            <h3>Space for a component</h3>
            <p>Content goes here</p>
        </div>  
        <div className = {style.clearfix} >

        </div>              
      </div>

  )
}
