import React, { useEffect, useRef, useState, FormEvent, ChangeEvent } from 'react';
import style from './PointsForm.module.css'
import Button from "../utility/Button";
import Form from "../utility/Form";

//create a form to update house points manually
//this might come from an API to get real time data in the future
interface House {
  name: string;
  points: number;
  color: string;
}


// Produce a form populated with current housepoints
const PointsForm = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [submitMessage, setSubmitMessage] = useState<string>('');
  const [submitMessageClass, setSubmitMessageClass] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/housepoints');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse the JSON response
        setHouses(data); // Update the state with the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    const updatedHouses = [...houses];
    const houseIndex = updatedHouses.findIndex((house) => house.name === name);
    updatedHouses[houseIndex].points = parseInt(value)
    setHouses(updatedHouses);

  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    fetch('/api/housepoints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ houses }),
    })
      .then((response) => {
        setTimeout(() => {
          setSubmitMessage('');
          setSubmitMessageClass('');
        }, 3000);
        if (response.ok) {
          setSubmitMessage('House Points saved successfully.');
          setSubmitMessageClass('success');
        } else {
          setSubmitMessage('Error occurred during submission.');
          setSubmitMessageClass('error');
          throw new Error('Error occurred during submission.');
        }
      })
      .catch((error) => {
        setSubmitMessage(`Error occurred during submission: ${error}`);
        setSubmitMessageClass('error');
      });
  };


  return (
    <>
    <Form onSubmit={handleSubmit}>
      <h1>Update House Points</h1>
        <ul className={style.ul}>
        {houses.map((house, index) => (
            <li className={style.li}>
              <label>
                {house.name}
              </label>
              <input
                key={index}
                value ={house.points}
                name = {house.name}
                onChange={handleInputChange}
              />
              <br/>
            </li>
        ))}
        </ul>
        <div>{submitMessage}</div>
        <Button type="submit">Update House Points</Button>

    </Form>
    </>
  );
};

export default PointsForm;
