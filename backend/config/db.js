import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://karanpresha:akd80hsunV0cENjs@cluster0.bo7if.mongodb.net/").then(() => console.log("connected to database")).catch((err) => console.log(err));
        
}