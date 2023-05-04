
import mongoose, { DocumentDefinition, FilterQuery, Types } from "mongoose";
import dailyNoticesModel, { DailyNoticesDocument } from "../model/dailyNotices.model";

export async function getDailyNoticesByUserId(userId: string) {
    return await dailyNoticesModel.find({ userId: userId} ).lean()
}

export async function getAllDailyNotices(){
  return await dailyNoticesModel.find()
}

export async function getOne(query: FilterQuery<DailyNoticesDocument>){
    return await dailyNoticesModel.findOne(query)
}

export async function updateDailyNotices(
  dailyNotice: DocumentDefinition<DailyNoticesDocument>
) {
  const result = await dailyNoticesModel.findByIdAndUpdate(
    dailyNotice.id,
    dailyNotice,
    { new : true }
  )
  return result
}

export async function createDailyNotices(
  input: DocumentDefinition<DailyNoticesDocument>
) 
{
  return await dailyNoticesModel.create(input)
}

export async function deleteDailyNoticesById(dailyNoticeId: String) {
  return await dailyNoticesModel.findByIdAndDelete(dailyNoticeId)
}
