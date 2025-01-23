import express from 'express'
import cors from 'cors'
import mongoose, { connect } from 'mongoose'

import bookingRouter from './routes/bookingRoute.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'
import cabinRouter from './routes/cabinRoute.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

//middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173','http://localhost:5174','https://oasis-k4jg.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    
}))



//connect to db
connectDB();

//import routes

app.use('/api/booking', bookingRouter)
app.use('/api/cabins', cabinRouter)
app.use("/images",express.static('public'));

app.get('/', (req, res) => {
    res.send('API working')
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
