import React, { useEffect, useState } from 'react';
import style from './Upcoming.module.css'

interface Event {
    event: string;
    date: string;
}

interface EventListProps {
    isFullScreen: boolean;
}

const Upcoming: React.FC<EventListProps> = ({ isFullScreen }) => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        fetch('/api/events')
            .then((response) => response.json())
            .then((data) => {
                setEvents(data.events);
            })
            .catch((error) => {
                console.error('Error fetching events:', error);
            });
    }, []);
    const containerStyle = isFullScreen ? style.fullScreen : style.multiScreen

    return (
        <div className={containerStyle}>
            <h2>Upcoming Events</h2>
            <ul className={style.eventList}>
                {events.map((event, index) => (
                    <li key={index}>
                        <strong>{event.event}</strong> - {event.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Upcoming;
