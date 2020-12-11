import express from 'express'
const app = express()
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import tourRoutes from './routes/tourRoutes.js'
import {notFound,errorHandler} from './Middleware/errorMiddleware.js'
dotenv.config()

connectDB()

 
app.get('/',(req,res) => {
    res.send('Api is running')
})


app.use('/api/v1/tours',tourRoutes)



app.use(notFound)



app.use(errorHandler)



const PORT = process.env.PORT || 5000
  

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))