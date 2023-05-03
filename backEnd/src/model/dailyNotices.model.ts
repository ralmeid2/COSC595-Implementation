import mongoose, { Document } from "mongoose";

export interface DailyNoticesDocument extends Document {
    title: string;
    message: string; 
    startDate: Date;
    expiryDate: Date;
}

const dailyNoticesSchema = new mongoose.Schema ({
    title: String,
    message: String,
    startDate: String,
    expiryDate: String
}, { timestamps: true })


export default mongoose.model<DailyNoticesDocument>('DailyNotices', dailyNoticesSchema);