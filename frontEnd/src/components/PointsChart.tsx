import React, { useEffect, useRef } from 'react';
import style from './PointsChart.module.css';

interface House {
  name: string;
  points: number;
  color: string;
}

interface CanvasProps {
  houses: House[];
  isFullScreen: boolean;
}

const PointsChart: React.FC<CanvasProps> = ({ houses, isFullScreen }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    let chartMarginTop = 20 ;
    let chartMarginBottom = 20;
    let chartMarginLeft = 40;
    let chartMarginRight = 20;
    let chartWidth = canvasWidth - chartMarginLeft - chartMarginRight;
    let chartHeight = canvasHeight - chartMarginTop - chartMarginBottom;

    // Draw numbers on the canvas
    let pointsArray = houses.map((house) => house.points);
    let maxPoints = Math.max(...pointsArray);
    let topValue = maxPoints + (50 - (maxPoints % 50));
    let interval = chartHeight / 4;
    let pixelPointRatio = chartHeight / topValue;

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

    houses.forEach((house, index) => {
      ctx.fillStyle = house.color;
      let x = chartMarginLeft + index * barInterval;
      let y = chartMarginTop + (topValue - house.points) * pixelPointRatio;
      ctx.fillRect(x, y, barInterval * 0.75, house.points * pixelPointRatio);
    });
  }, [houses, isFullScreen]);

  const containerStyle = isFullScreen ? style.fullScreen: style.multiScreen;

  return (
    <div className = {containerStyle}>
      <h3 className={style.pointsTitle}>House Points</h3>
      {isFullScreen ? (
        <canvas height={600} width={1080} ref={canvasRef} />
      ) : (
        <canvas height={300} width={500} ref={canvasRef} />
      )}
    </div>
  );
};

export default PointsChart
