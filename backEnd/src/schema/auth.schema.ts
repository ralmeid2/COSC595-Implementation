import { object, string, number, array, TypeOf, union } from 'zod'

/* 
    Schemas to ensure that requests routed to the authorisation
    handler conform to the required schema. 

    If a field is not present, an error is returned to the client. 

    Username and password fields are required in the request body.
*/ 

const payload = {
  body: object({
    username: string({
      required_error: 'Username is required',
    }),
    password: string({
      required_error: 'Password is required',
    }),
  }),
}

export const registerSchema = object({
  ...payload,
})

export const loginSchema = object({
  ...payload,
})

export type RegisterInput = TypeOf<typeof registerSchema>
export type LoginInput = TypeOf<typeof loginSchema>