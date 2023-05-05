import { object, TypeOf } from 'zod';

// there's really no schema for the weather request.
export const getWeatherSchema = object ({
    
})

export type getWeather = TypeOf<typeof getWeatherSchema>