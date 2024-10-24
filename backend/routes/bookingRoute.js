import express from 'express'
import { allReservations, deleteReservation, getBookings, getReservations, placeOrder } from '../controllers/bookingController.js';


const bookingRouter = express.Router();

bookingRouter.post("/place", placeOrder);
bookingRouter.get("/session/:sessionId", getBookings);
bookingRouter.get("/list/:userId",getReservations);
bookingRouter.get("/list",allReservations);
bookingRouter.delete("/delete/:reservationId", deleteReservation);

export default bookingRouter;