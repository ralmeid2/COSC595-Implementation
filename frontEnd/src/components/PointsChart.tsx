import style from './PointsChart.module.css'

import React, { useState, useEffect, useRef } from 'react';


interface House {
  name: string;
  points: number;
  color: string;
}

interface CanvasProps {
  houses: House[];
}

const PointsChart: React.FC<CanvasProps> = ({ houses }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;


    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw numbers on the canvas
    //check what the scale of the map should be
    let pointsArray = houses.map(house => house.points)
    let maxPoints = Math.max(...pointsArray)
    let topValue = maxPoints + (50 - maxPoints % 50)
    let interval = (canvas.height - 40)/4
    let pixelPointRatio = (canvas.height - 40)/topValue
    console.log(interval)
    ctx.fillText(topValue.toString(), 20, 20)
    ctx.beginPath()
    ctx.moveTo(40, 20)
    ctx.lineTo(canvas.width - 20, 20)
    ctx.strokeStyle = "#ccc"
    for (let i = 1; i < 5; i++) {
      ctx.moveTo(40, i*interval + 20 )
      ctx.lineTo(canvas.width - 20, i *interval +20)
      ctx.fillText((topValue - ( i *topValue/4)).toString(), 20, i*interval+20)
    }
    ctx.stroke()
    let barInterval = (canvas.width - 60)/houses.length

    houses.forEach((house, index) => {
      ctx.fillStyle = house.color
      let x = 40 + index * barInterval
      let y = 20 + (topValue - house.points)*pixelPointRatio
      ctx.fillRect(x,y,barInterval* .75, house.points*pixelPointRatio)
    })

  }, [houses]);

  return <div><h1>House Points</h1><canvas height = "400px" width = "800px" ref={canvasRef} /></div>;
};

export default PointsChart;

const drawChartLines = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, pointsArray: number[]) => {

}

const drawBars = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, houses: House[]) =>{

}