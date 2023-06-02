import { object, TypeOf } from 'zod';

/*
    Schema for the weather handler. 
    This is not really used but is here for consistency.
*/

// there's really no schema for the weather request.
export const getWeatherSchema = object ({
    
})

export type getWeather = TypeOf<typeof getWeatherSchema>