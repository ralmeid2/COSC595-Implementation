import style from './Upcoming.module.css'
import React from 'react'

interface UpcomingProps {
    isFullScreen: boolean;
}


export default function Upcoming({ isFullScreen }: UpcomingProps) {
    
    const containerStyle = isFullScreen? style.fullScreen : style.multiScreen
    return <div className = {containerStyle}>
        <h3>Upcoming Events:</h3>
    </div>
}


