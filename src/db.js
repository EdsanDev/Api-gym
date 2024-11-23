import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect( `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`)
        console.log("[+] base de datos esta conectado!")
    } catch (error) {
        console.log(error)
    }
}