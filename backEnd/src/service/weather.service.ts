import { response } from "express";
import { resourceLimits } from "worker_threads"


/*
  Requests current weather information for the school's location from the OpenMeteo API.

  We need to pass in a latitude and longitude. For the school this is:
  { -35.322273333916776, 149.1455993 }

  The response contains various pieces of weather information and is parsed to just include
  current temperation, the weathercode, and the time. 

  For details about weathercodes, see WMOWeathercodes.md in this folder.

  For OpenMeteo API details, see https://open-meteo.com/en/docs

  Uses the axios library to make the asynchronous https call to OpenMeteo. 
  https://www.npmjs.com/package/axios
*/

const axios = require('axios').default;
const params = `?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
const weatherApiurl = `https://api.open-meteo.com/v1/forecast`
let currentData: weatherData
type ResponseType = { data: any }
type weatherData = {
  current_temp: string,
  weathercode: string,
  time: string
}
let lastRetrievalTime = Date.now()
let timeout = 60000 // we only call once per minute

export async function getWeather() {
  try {
    if (!currentData || Date.now() - lastRetrievalTime > timeout) {
      const response: ResponseType = await axios.get(weatherApiurl + params)
      console.log("making new weather request")
      currentData = {
        current_temp: response.data.current_weather.temperature,
        weathercode: response.data.current_weather.weathercode,
        time: response.data.current_weather.time
      }
      lastRetrievalTime = Date.now()
      return currentData
    } else {
      console.log('returning cached weather data')
      return currentData
    }
  } catch (err) {
    console.log(err)
  }
}