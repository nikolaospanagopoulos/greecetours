import express from 'express'

import dotenv from 'dotenv'
dotenv.config({path:'.env'})
import colors from 'colors'
import connectDB from './config/db.js'
import tourRoutes from './routes/tourRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {notFound,errorHandler} from './Middleware/errorMiddleware.js'
import orderRoutes from './routes/orderRoutes.js'

connectDB()
const app = express()

app.use(express.json())
app.get('/',(req,res) => {  
    res.send('Api is running')
})


app.use('/api/v1/tours',tourRoutes)
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/orders',orderRoutes)

app.use(notFound)



app.use(errorHandler)



const PORT = process.env.PORT || 5000
  

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))