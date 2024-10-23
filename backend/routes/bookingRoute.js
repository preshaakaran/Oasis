import express from 'express'
import { placeOrder } from '../controllers/bookingController';


const bookingRouter = express.Router();

bookingRouter.post("/place", placeOrder);

export default bookingRouter;