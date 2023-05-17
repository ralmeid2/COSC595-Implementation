import { DailyNotices } from './../types/DailyNotices';
import mongoose, { Document } from "mongoose";

export interface DailyNoticesDocument extends Document {
    id: DailyNoticesDocument["_id"]
    title: string;
    message: string; 
    startDate: Date;
    expiryDate: Date;
}

const dailyNoticesSchema = new mongoose.Schema ({
    id: { type: mongoose.Schema.Types.ObjectId, ref: "dailyNotices" },
    title: String,
    message: String,
    startDate: String,
    expiryDate: String
}, { timestamps: true })


export default mongoose.model<DailyNoticesDocument>('DailyNotices', dailyNoticesSchema);