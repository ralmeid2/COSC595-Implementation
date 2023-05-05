// using the Open-Metoe open source Weather API.
// we need to pass in a latitude and longitude. For the school this is:
// { -35.322273333916776, 149.1455993 }

import { response } from "express";
import { resourceLimits } from "worker_threads"

// import WeatherDocument from "../model/weather.model";

const axios = require('axios').default;
const https = require('https')
type ResponseType = { data: any }
const params = `?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
const weatherApiurl = `https://api.open-meteo.com/v1/forecast`

const http = require('https')

export async function getWeather() {
  try{
    const response: ResponseType = await axios.get(weatherApiurl+params)
    const output = {
      current_temp: response.data.current_weather.temperature,
      weathercode: response.data.current_weather.weathercode,
      time: response.data.current_weather.time
    }
    return output
  } catch (err) {
    console.log(err)
  }
}