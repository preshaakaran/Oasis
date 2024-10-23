import e from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url="http://localhost:5173";

    try{
        const newOrder = new orderModel({
            userId:req.body.userId,
            userEmail:req.body.userEmail,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            numNights:req.body.numNights,
            cabinPrice:req.body.cabinPrice,
            breakFastPrice:req.body.breakFastPrice,
            cabinId:req.body.cabinId
            
        });

        await newOrder.save();

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
            success_url: `${frontend_url}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${frontend_url}/cancel`,
          });

          res.json({ success: true, session_url: session.url });
    }catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "An internal server error occurred" });
      }

};

export {placeOrder};