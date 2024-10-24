import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("your_key").then(() => console.log("connected to database")).catch((err) => console.log(err));
        
}