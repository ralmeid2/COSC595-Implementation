import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

/*
    Middleware which ensures that requests routed to the handlers conform to 
    the schema that is expected.

    This is a bridge between handlers and schemas and uses the zod library. 
    Note zod is a typescript library and enforces types. 
    https://www.npmjs.com/package/zod

*/

const validate = 
(schema: AnyZodObject) =>
(req: Request, res: Response, next: NextFunction) => {
    try{
        // console.log("parsing schema")
        // console.log(req.body)
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch(e: any) {
        return res.status(400).send(e.errors);
    }
};

export default validate;