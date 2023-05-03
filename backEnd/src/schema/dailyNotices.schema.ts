import { object, string, number, array, TypeOf, any } from 'zod';

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
    userId: string({
      required_error: 'User id is required',
    }),
  }),
}

//this works for getting ALL dailyNotices
export const getDailyNoticesSchema = object ({
    
})

export const getDailyNoticesByIdSchema = object({
    ...getParams,
})
export const createDailyNoticesSchema = object({
    ...payload,
})

export const updateDailyNoticesSchema = object({
    ...payload,
})


export type getGamesByIdInput = TypeOf<typeof getDailyNoticesByIdSchema>
export type CreateGamesInput = TypeOf<typeof createDailyNoticesSchema>
export type UpdateGamesInput = TypeOf<typeof updateDailyNoticesSchema>
export type GetGamesInput = TypeOf<typeof getDailyNoticesSchema>



