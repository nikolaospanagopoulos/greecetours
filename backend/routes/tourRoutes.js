import express from 'express'
import Tour from '../models/tourModel.js'
import asyncHandler from 'express-async-handler'
const router = express.Router()


    

router.get('/', asyncHandler(async (req,res) => {
    const tours = await Tour.find({})
    res.json(tours)
}))

router.get('/:id',asyncHandler(async(req,res) => {
    const tour = await Tour.findById(req.params.id)

    if(tour){  
        res.json(tour)
    }else{
        res.status(404)
        throw new Error('Tour not found')
    }

   
}))


export default router