import asyncHandler from 'express-async-handler'
import Tour from '../models/tourModel.js'


const getTours = asyncHandler(async(req,res,next) => {
    let query;

    const reqQuery = {...req.query}


    const removeFields = ['select','sort']

    removeFields.forEach(param =>delete reqQuery[param] )
    let queryStr = JSON.stringify(reqQuery)

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
    
    query = Tour.find(JSON.parse(queryStr))

    if(req.query.select){
        const fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
    }



    //sort
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        query=query.sort(sortBy)
    }else{
        query = query.sort('-createdAt')
    }



    const tours = await query
    res.status(200)
    .json({success:true,count:tours.length,data:tours})
})

const getTourById = asyncHandler(async(req,res) => {
    const tour = await Tour.findById(req.params.id)

    if(tour){  
        res.json(tour)
    }else{
        res.status(404)
        throw new Error('Tour not found')
    }

})

export {getTours,getTourById} 