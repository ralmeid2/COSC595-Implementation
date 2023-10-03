import express, { Request, Response } from 'express';
import validateSchema from '../middleware/validateSchema';
import { } from '../service/dailyNotices.service';
import { deleteDailyNoticesById, getAllDailyNotices, createDailyNotices, getDailyNoticesByDocId, updateDailyNotices } from '../service/dailyNoticesJson.service';
import { createDailyNoticesSchema, updateDailyNoticesSchema, getDailyNoticesByIdSchema, getDailyNoticesSchema } from '../schema/dailyNotices.schema';

/*
    Route handler for the daily notices.

    See backEnd/model/dailyNotices for the data shape for daily notices.

    This implementation does not use a database, it stores the
    daily notices in a local text file in JSON format. This choice was made
    because ports are restricted on the school's network. We originally implemented
    with a MongoDB cloud instance but this would have caused issues with 
    accessing the database through the school's network. 

    If the number of daily notices gets large, the retrivel and
    update times might get slow. 

    Every request requires a disk read - (unless node.js is doing some
        automatic caching). 

    See backEnd/service/dailyNoticesJson.server for implementation.
*/

const dailyNoticesHandler = express.Router();

dailyNoticesHandler.get("/", validateSchema(getDailyNoticesSchema), async (req: Request, res: Response) => {
    try {
        const dn = await getAllDailyNotices();
        return res.status(200).send(dn);
    } catch (err) {
        console.log("err")
        return res.status(500).send(err);
    }
});

dailyNoticesHandler.post("/", validateSchema(createDailyNoticesSchema), async (req: Request, res: Response) => {
    console.log(req.body)
    const r = req.body
    const newDailyNotice = await createDailyNotices(r)
    return res.status(200).send(newDailyNotice)
})

dailyNoticesHandler.get("/:id", validateSchema(getDailyNoticesByIdSchema), async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const oneDoc = await getDailyNoticesByDocId(id);
        return res.status(200).send(oneDoc);
    } catch (err) {
        return res.status(500).send(err);
    }
});

dailyNoticesHandler.put("/:id", validateSchema(getDailyNoticesSchema), async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const update = req.body
        const result = await updateDailyNotices(id, { ...update })
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
});

dailyNoticesHandler.delete("/:id", validateSchema(updateDailyNoticesSchema), async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const result = await deleteDailyNoticesById(id)
        res.status(200).send(result)
    } catch (err) {
        return res.status(500).send(err)
    }
});

export default dailyNoticesHandler;