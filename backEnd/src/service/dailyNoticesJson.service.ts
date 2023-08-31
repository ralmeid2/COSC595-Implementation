import notices from '../data/dailynotices.json'
import DailyNotices from '../types/DailyNotices'
import fs from 'fs'
import { DocumentDefinition, FilterQuery, Types } from "mongoose";
import { DailyNoticesDocument } from "../model/dailyNotices.model";

/*
  The service defines functions that can are called by the daily notices handler
  to interact with the database. 
*/

export async function getDailyNoticesByDocId(id: string) {
    const notice = notices.find((n) => n._id === parseInt(id));
    console.log(notice)
    return [notice];
}

export async function getAllDailyNotices() {
    return notices
}

export async function updateDailyNotices(id: string,
    dailyNotice: DailyNotices
) {
    const notice = notices.find((n) => n._id === parseInt(id))
    if (notice) {
        const idx = notices.findIndex((n) => n._id === parseInt(id))
        const updatedNotice = { _id: parseInt(id), ...dailyNotice }
        notices[idx] = updatedNotice
        fs.writeFileSync('./src/data/dailynotices.json', JSON.stringify(notices));
        return [notice]
    } else {
        // couldn't find a notice with that id
        return [{}]
    }
}

export async function createDailyNotices(
    input: DailyNotices
) {
    let newId = 0
    if (notices.length > 0) {
        // TS not liking this is beyond my comprehension
        newId = parseInt(notices[notices.length - 1]._id) + 1
    }
    const newNotice = { _id: newId, ...input }
    notices.push(newNotice)
    fs.writeFileSync('./src/data/dailynotices.json', JSON.stringify(notices));
    return [newNotice]
}

export async function deleteDailyNoticesById(id: string) {
    const notice = notices.find((n) => n._id === parseInt(id))
    if (notice) {
        const idx = notices.findIndex((n) => n._id === id)
        const deleted = notices.splice(idx, 1)
        fs.writeFileSync('./src/data/dailynotices.json', JSON.stringify(notices));
        return [deleted]
    } else {
        // couldn't find a notice with that id
        return [{}]
    }
}
