import notices from '../data/dailynotices.json'
import DailyNotices from '../types/DailyNotices'
import fs from 'fs'

/*
  The service defines functions that can are called by the daily notices handler
  to interact with the 'database', which is a json text file.. 
*/

export async function getDailyNoticesByDocId(id: string) {
    const notice = notices.find((n) => n._id === parseInt(id));
    return [notice];
}

export async function getAllDailyNotices() {
    return notices
}

// note: notices aren't sorted so this is O(N)
// if database retrieval gets too slow, this could
// be improved. Unlikely to be an issue. 
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
