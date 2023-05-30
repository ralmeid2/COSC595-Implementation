import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import Button from "./Button";
import styles from './Options.module.css';
//Multicomponent view controls whether to display default view
//All other options control whether the screen should cycle through components in full screen mode
//broadcast message can be added to display any message on the full screen. 
interface OptionData {
  timer: boolean;
  points: boolean;
  events: boolean;
  notices: boolean;
  multiComponentView: boolean;
  broadcast: boolean;
  broadcastMessage: string;
}

const Options: React.FC = () => {
  const [options, setOptions] = useState<OptionData>({
    timer: false,
    points: false,
    events: false,
    notices: false,
    multiComponentView: false,
    broadcast: false,
    broadcastMessage: '',
  });

  useEffect(() => {
    fetch('/api/options')
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
      })
      .catch((error) => {
        console.error('Error fetching options:', error);
      });
  }, []);

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, checked, type } = event.target;
    setOptions((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : event.target.value,
    }));
  };

  const handleTextareaChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    fetch('/api/options', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ options }),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success or show a success message
        } else {
          throw new Error('Error occurred during submission.');
        }
      })
      .catch((error) => {
        // Handle error or show an error message
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.optionsForm}>
      <h1>Select Display Mode</h1>
      <label className={styles.label}>
        <input
          type="checkbox"
          name="multiComponentView"
          className={styles.checkbox}
          checked={options.multiComponentView}
          onChange={handleCheckboxChange}
        />
        Multi Component View
      </label>
      <h1>Select Options to Display in Single Mode</h1>
      <div className={styles.optionsContainer}>
        <div className={styles.column}>
          <label className={styles.label}>
            Timer:
            <input
              type="checkbox"
              name="timer"
              className={styles.checkbox}
              checked={options.timer}
              onChange={handleCheckboxChange}
            />
          </label>
          <br />
          <label className={styles.label}>
            Points:
            <input
              type="checkbox"
              name="points"
              className={styles.checkbox}
              checked={options.points}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
        <div className={styles.column}>
          <label className={styles.label}>
            Events:
            <input
              type="checkbox"
              name="events"
              className={styles.checkbox}
              checked={options.events}
              onChange={handleCheckboxChange}
            />
          </label>
          <br />
          <label className={styles.label}>
            Notices:
            <input
              type="checkbox"
              name="notices"
              className={styles.checkbox}
              checked={options.notices}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
      </div>
      <br />
      <label className={styles.label}>
        Broadcast:
        <input
          type="checkbox"
          name="broadcast"
          className={styles.checkbox}
          checked={options.broadcast}
          onChange={handleCheckboxChange}
        />
      </label>
      <br />
      <label className={styles.label}>
        Broadcast Message:
        <textarea
          name="broadcastMessage"
          value={options.broadcastMessage}
          onChange={handleTextareaChange}
        />
      </label>
      <br />
      <Button type="submit">Submit</Button>
    </form>
  );


};

export default Options;
