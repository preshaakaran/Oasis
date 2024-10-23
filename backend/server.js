import express from 'express'
import cors from 'cors'
import mongoose, { connect } from 'mongoose'

import bookingRouter from './routes/bookingRoute'
import { connectDB } from './config/db'

const app = express()
const PORT = process.env.PORT || 5000

//middleware
app.use(express.json());
app.use(cors())

//connect to db
connectDB();

//import routes
// app.use('/api/cabins', require('./routes/cabinRoute'))
app.use('/api/booking', bookingRouter)

app.get('/', (req, res) => {
    res.send('API working')
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))