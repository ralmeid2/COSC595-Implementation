import express, { Request, Response } from 'express'; 
import mongoose from 'mongoose';
import validateSchema from '../middleware/validateSchema';
import { createDailyNotices, getDailyNoticesByDocId, updateDailyNotices, updateDailyNotices2, getAllDailyNotices, getOne, deleteDailyNoticesById } from '../service/dailyNotices.service';
import { createDailyNoticesSchema, updateDailyNoticesSchema, getDailyNoticesByIdSchema, getDailyNoticesSchema } from '../schema/dailyNotices.schema';
const dailyNoticesHandler = express.Router();
let gameId: number;
let currentPlayer: string

/*
    Route handler for API requests relating to the daily notices.
    Base route is /api/dailyNotices

    GET /api/dailyNotices/ - returns all dailyNotices in the database
    GET /api/dailyNotices/id - returns a dailyNotice where id is the _id of the daily notice
    POST /api/dailyNotices/ - creates a new daily notices in the database
        request body should contain daily notice information as specified src/schema/dailyNotices.schema.ts
    PUT /api/dailyNotices/id - update a daily notice where id is the _id of the daily notice 
        request body should contain daily notice information as specified src/schema/dailyNotices.schema.ts
    DELETE /api/dailyNotices/id - delete a daily notice from the database where id is the _id of the daily notice
*/

dailyNoticesHandler.get("/", validateSchema(getDailyNoticesSchema), async (req: Request, res: Response) => {
    const userId = req.userId
    try{
        const dn = await getAllDailyNotices();
        return res.status(200).send(dn);
    }catch (err) {
        return res.status(500).send(err);
    }
});

dailyNoticesHandler.get("/:id", validateSchema(getDailyNoticesByIdSchema), async (req: Request, res: Response) => {
    const id = req.params.id
    console.log(req.params.id as string)
    console.log(id)
    try{
        const oneDoc = await getDailyNoticesByDocId(id);
        console.log(oneDoc)
        return res.status(200).send(oneDoc);
    }catch (err) {
        return res.status(500).send(err);
    } 
});

dailyNoticesHandler.post("/", validateSchema(createDailyNoticesSchema), async (req: Request, res: Response) => {
    const r = req.body
        const newDailyNotice = await createDailyNotices(r)
        return res.status(200).send(newDailyNotice)
 })

dailyNoticesHandler.put("/:id", validateSchema(getDailyNoticesSchema), async (req: Request, res: Response) => {
    try{
        const id = req.params.id
        const update = req.body
        const result = await updateDailyNotices2(id, {...update})
        res.status(200).send(result)
        console.log(result)
    }catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
});

dailyNoticesHandler.delete("/:id", validateSchema(updateDailyNoticesSchema), async (req: Request, res: Response) => {
    try{
        const id = req.params.id
        const result = await deleteDailyNoticesById(id)
        res.status(200).send(result)
    }catch (err) {
        return res.status(500).send(err)
    }
});

export default dailyNoticesHandler;