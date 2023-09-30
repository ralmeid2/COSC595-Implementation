import React, { useEffect, useState } from 'react';
import style from './Body.module.css';

//broadcast message is set on the admin options page
//broadcast is used to display a single message on the screen
export default function Broadcast() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/options/message')
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (
    <div className= {style.bcmessage}>
      {message}
    </div>
  );
}
