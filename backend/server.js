import express from 'express'
import tours from './data/products.js'
const app = express()
import dotenv from 'dotenv'
dotenv.config()

app.get('/',(req,res) => {
    res.send('Api is running')
})


app.get('/api/v1/tours',(req,res) => {
    res.json(tours)
})

app.get('/api/v1/tours/:id',(req,res) => {
    const tour = tours.find(tour => tour._id === req.params.id)
    res.json(tour)
})

const PORT = process.env.PORT || 5000


app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))