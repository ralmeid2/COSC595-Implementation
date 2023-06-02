import mongoose from "mongoose";


/*
    Sets up a connection to the mongoDB database server. 
    See the backEnd/.env file for the URI for the database and
    credentials. 
*/
const connectDB = async () => {
    const dbUri = process.env.dbURI || ''
    console.log(`[server]: Connecting to DB...`)
    try {
        await mongoose.connect(dbUri)
    } catch (error) {
        console.log(`[server]: Could not connect to db`)
        console.log(error)
        process.exit(1)
    }
}

export default connectDB;