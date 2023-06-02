import { DailyNotices } from './../types/DailyNotices';
import mongoose, { Document } from "mongoose";

/*
    Data model class for the daily notices. 
    
    This is how mongoose interacts with the MongoDB database and enforces 
    a schema.
*/

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