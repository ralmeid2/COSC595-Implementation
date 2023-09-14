import React, { useEffect, useRef, useState } from 'react';
import style from './PointsChart.module.css';
import logo from '../images/logo-white.svg';

interface House {
  name: string;
  points: number;
  color: string;
}

interface CanvasProps {
  isFullScreen: boolean;
}

// The PointsChart component now fetches data from the API using vanilla fetch
const PointsChart: React.FC<CanvasProps> = ({ isFullScreen }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [houses, setHouses] = useState<House[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API using vanilla fetch
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;


        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate scale factor based on isFullScreen prop
        let scale = isFullScreen ? 1.5 : 1; // You can adjust the scaling factor as needed

        // Apply scale factor to relevant dimensions and coordinates
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;
        let chartMarginTop = 20;
        let chartMarginBottom = 20;
        let chartMarginLeft = 40;
        let chartMarginRight = 20;
        let chartWidth = canvasWidth - chartMarginLeft - chartMarginRight;
        let chartHeight = canvasHeight - chartMarginTop - chartMarginBottom;

        //get just the houses and their respective points
        let pointsArray = houses.map((house) => house.points);
        //work out the maximum amount of points
        let maxPoints = Math.max(...pointsArray);
        //set a top value for the chart scale above maxpoints
        let topValue = maxPoints + (50 - (maxPoints % 50));
        //work out intervals for chart labels
        let interval = chartHeight / 4;
        //we need this to keep the chart the same size regardless of point amount
        let pixelPointRatio = chartHeight / topValue;
        //set up and draw chart values
        ctx.fillText(topValue.toString(), 20, 20);
        ctx.beginPath();
        ctx.moveTo(chartMarginLeft, chartMarginTop);
        ctx.lineTo(chartMarginLeft + chartWidth, chartMarginTop);
        ctx.strokeStyle = '#ccc';
        for (let i = 1; i < 5; i++) {
            ctx.moveTo(chartMarginLeft, chartMarginTop + i * interval);
            ctx.lineTo(chartMarginLeft + chartWidth, chartMarginTop + i * interval);
            ctx.fillText((topValue - (i * topValue) / 4).toString(), 20, chartMarginTop + i * interval);
        }
        ctx.stroke();
        let barInterval = chartWidth / houses.length;
        //draw bars for each house
        houses.forEach((house, index) => {
            ctx.fillStyle = house.color;
            let x = chartMarginLeft + index * barInterval;
            let y = chartMarginTop + (topValue - house.points) * pixelPointRatio;
            ctx.fillRect(x, y, barInterval * 0.75, house.points * pixelPointRatio);
        });

  }, [houses, isFullScreen]);

  const containerStyle = isFullScreen ? style.fullScreen : style.multiScreen;

  return (
    <div className={containerStyle}>
      <h3 className={style.pointsTitle}>House Points</h3>
      {isFullScreen ? (
        <canvas height={1920} width={1080} ref={canvasRef} />
      ) : (
        <canvas height={200} width={500} ref={canvasRef} />
      )}
      <div className={style.emblemHolder}>
        {houses.map((house, index) => (
          <div key={index} className={style.houseEmblem}>
            <img src={`../houses/${house.name}.png`} alt={house.name} />
            <p>{house.points}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PointsChart;
