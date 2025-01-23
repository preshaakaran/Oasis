import express from "express";
import Stripe from "stripe";
import bookingModel from "../models/bookingModel.js";

const stripe = new Stripe("your_stripe_key");

const placeOrder = async (req, res) => {
    const frontend_url=process.env.FRONTEND_URL;

    try{
        const newBooking = new bookingModel({
            userId:req.body.userId,
            userEmail:req.body.userEmail,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            numNights:req.body.numNights,
            cabinPrice:req.body.cabinPrice,
            breakFastPrice:req.body.breakFastPrice,
            cabinId:req.body.cabinId,
            currentDate:req.body.currentDate,
            
        });

        await newBooking.save();

        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price_data: {
                  currency: "inr",
                  product_data: {
                    name: "Cabin Booking",
                  },
                  unit_amount: (req.body.cabinPrice+req.body.breakFastPrice)*100*80,
                },
                quantity: 1,
              },
            ],
            mode: "payment",
            success_url: `${frontend_url}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${frontend_url}/cancel`,
          });

          res.json({ success: true, session_url: session.url, booking: bookingModel });
    }catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "An internal server error occurred" });
      }

};

const getBookings = async (req, res) => {
  const { sessionId } = req.params;

try {
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.json(session);
} catch (error) {
    console.error("Error fetching session details:", error);
    res.status(500).json({ success: false, message: "Could not fetch session details" });
}
};

//fetch reservations of the user
const getReservations = async (req, res) => {
  const { userId } = req.params;

  try {
    const reservations = await bookingModel.find({ userId });
    res.json(reservations);
  }

  catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ success: false, message: "Could not fetch reservations" });
  }
};

//Detele Reservation
const deleteReservation = async (req, res) => {
  const { reservationId } = req.params;

  try {
    const deletedReservatio = await bookingModel.findByIdAndDelete(reservationId);
    if (!deletedReservatio) {
      return res.status(404).json({ success: false, message: 'Reservation not found' })
    }
    res.json({ success: true, message: 'Reservation deleted successfully' })
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).json({ success: false, message: "Could not delete reservation" });
  }
};


const allReservations = async (req, res) => {
  try {
    const reservations = await bookingModel.find();
    res.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ success: false, message: "Could not fetch reservations" });
  }
};

export {placeOrder, getBookings,getReservations,deleteReservation,allReservations};
