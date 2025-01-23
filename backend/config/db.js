import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI).then(() => console.log("connected to database")).catch((err) => console.log(err));
   
}