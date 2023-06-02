import { object, string, number, array, TypeOf, any } from 'zod';
import mongoose from 'mongoose';

/* 
    Schemas to ensure that requests routed to the dailynotices
    handlers conform to the required schema. 

    If a field is not present, an error is returned to the client. 

    For update/create requests, all fields are required.

    For get requests, an ID is required. 
*/ 

const payload = {
    body: object ({
        title: string({
            required_error: "Title is required",
        }),
        message: string({
            required_error: "Message is required",
        }),
        startDate: string({
            required_error: "Start date is required",
        }),
        expiryDate: string({
            required_error: "Expiry date is required",
        }),
    })
}

const getParams = {
  params: object({
    id: string({
      required_error: 'Doc id is required',
    }),
  }),
}

//this works for getting ALL dailyNotices - no schema enforced
export const getDailyNoticesSchema = object ({
    
})

export const getDailyNoticesByIdSchema = object({
    ...getParams,
})
export const createDailyNoticesSchema = object({
    ...payload,
})

export const updateDailyNoticesSchema = object({
    ...getParams,
})

export type getGamesByIdInput = TypeOf<typeof getDailyNoticesByIdSchema>
export type CreateGamesInput = TypeOf<typeof createDailyNoticesSchema>
export type UpdateGamesInput = TypeOf<typeof updateDailyNoticesSchema>
export type GetGamesInput = TypeOf<typeof getDailyNoticesSchema>



