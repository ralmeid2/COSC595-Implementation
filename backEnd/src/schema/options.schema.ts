import { object, string, number, array, TypeOf, boolean, any } from 'zod';
import mongoose from 'mongoose';

/* 
    Schema to ensure that requests routed to the options
    handler conforms to the required schema. 

    If a field is not present, an error is returned to the client. 

    To update the options, all fields must are required and 
    should be of the required type.  
*/ 

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