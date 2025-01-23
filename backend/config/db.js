import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI).then(() => console.log("connected to database")).catch((err) => console.log(err));
<<<<<<< HEAD
   
}
=======
        
}
>>>>>>> 5825f4f383cf969de1ffa36a93cd78bbc6452e72
