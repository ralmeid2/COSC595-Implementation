import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

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
    <form onSubmit={handleSubmit}>
      <h1>Select Display Mode</h1>
      <label>
        <input
          type="checkbox"
          name="multiComponentView"
          checked={options.multiComponentView}
          onChange={handleCheckboxChange}
        />
        Multi Component View
      </label>
      <br />
      <h1>Select Options to Display in Single Mode</h1>
      <label>
        Timer:
        <input
          type="checkbox"
          name="timer"
          checked={options.timer}
          onChange={handleCheckboxChange}
        />
      </label>
      <br />
      <label>
        Points:
        <input
          type="checkbox"
          name="points"
          checked={options.points}
          onChange={handleCheckboxChange}
        />
      </label>
      <br />
      <label>
        Events:
        <input
          type="checkbox"
          name="events"
          checked={options.events}
          onChange={handleCheckboxChange}
        />
      </label>
      <br />
      <label>
        Notices:
        <input
          type="checkbox"
          name="notices"
          checked={options.notices}
          onChange={handleCheckboxChange}
        />
      </label>
      <br />
      <label>
        Broadcast:
        <input
          type="checkbox"
          name="broadcast"
          checked={options.broadcast}
          onChange={handleCheckboxChange}
        />
      </label>
      <br />
      <label>
        Broadcast Message:
        <textarea
          name="broadcastMessage"
          value={options.broadcastMessage}
          onChange={handleTextareaChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Options;
