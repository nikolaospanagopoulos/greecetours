import asyncHandler from 'express-async-handler'
import Tour from '../models/tourModel.js'


const getTours = asyncHandler(async(req,res,next) => {
    let query;

    const reqQuery = {...req.query}


    const removeFields = ['select','sort','page','limit']

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




    //pagination

    const page = parseInt(req.query.page,10) || 1
    const limit = parseInt(req.query.limit,10) || 20
    const starIndex = (page-1) * limit;
    const endIndex = page * limit
    const total = await Tour.countDocuments()



    query = query.skip(starIndex).limit(limit)

    const tours = await query

    //pagination result
    const pagination = {}

    if(endIndex < total){
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    if(starIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }
    res.status(200)
    .json({success:true,count:tours.length, pagination, data:tours})
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