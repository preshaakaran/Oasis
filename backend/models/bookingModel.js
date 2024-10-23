import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    userEmail:{
        type: String,
        required: true,
    },
    startDate:{
        type: Date,
        required: true,
    },
    endDate:{
        type: Date,
        required: true,
    },
    numNights:{
        type: Number,
        required: true,
    },
    cabinPrice:{
        type: Number,
        required: true,
    },
    breakFastPrice:{
        type: Number,
        required: true,
    },
    cabinId:{
        type: String,
        required: true,
    },
});

const bookingModel = mongoose.models.booking || mongoose.model("booking", bookingSchema);
export default bookingModel;
