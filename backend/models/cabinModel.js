import mongoose from "mongoose";

const cabinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    originalPrice: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const cabinModel = mongoose.models.cabin || mongoose.model("cabin", cabinSchema);
export default cabinModel;