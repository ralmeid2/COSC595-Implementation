import { object, string, number, array, TypeOf, boolean, any } from 'zod';
import mongoose from 'mongoose';

const payload = {
    body: object ({
        options: object({
            timer: boolean({
                required_error: "timer is required",
            }),
            points: boolean({
                required_error: "points is required",
            }),
            events: boolean({
                required_error: "events is required",
            }),
            notices: boolean({
                required_error: "notices is required",
            }),
            multiComponentView: boolean({
                required_error: "multiComponentView is required"
            }),
            broadcast: boolean({
                required_error: "broadcast is required",
            }),
            broadcastMessage: string({
                required_error: "broadcastMessage is required",
            }),
        })
    })
}

export const updateOptionsSchema = object({
    ...payload,
})

export type UpdateOptionsInput = TypeOf<typeof updateOptionsSchema>