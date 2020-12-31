import asyncHandler from "express-async-handler";
import Tour from "../models/tourModel.js";

const getTours = asyncHandler(async (req, res, next) => {
  let query;

  const reqQuery = { ...req.query };

  const removeFields = ["select", "sort", "page", "limit"];

  removeFields.forEach((param) => delete reqQuery[param]);
  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = Tour.find(JSON.parse(queryStr));

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  //sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //pagination

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const starIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Tour.countDocuments();

  query = query.skip(starIndex).limit(limit);

  const tours = await query;

  //pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (starIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  res
    .status(200)
    .json({ success: true, count: tours.length, pagination, data: tours });
});

const getTourById = asyncHandler(async (req, res) => {
  const tour = await Tour.findById(req.params.id);

  if (tour) {
    res.json(tour);
  } else {
    res.status(404);
    throw new Error("Tour not found");
  }
});

const deleteTour = asyncHandler(async (req, res) => {
  const tour = await Tour.findById(req.params.id);

  if (tour) {
    await tour.remove();
    res.json({ message: "tour removed" });
  } else {
    res.status(404);
    throw new Error("Tour not found");
  }
});


const createTour = asyncHandler(async (req, res) => {
   const tour = new Tour({
     name:'sample name',
     user:req.user._id,
     image1: '/images/sample.jpg',
    image2: '/images/sample.jpg',
    image3:'/images/sample.jpg',
    image4:'/images/sample.jpg',
    description:'sample description',
    place:'sample place',
    category:'sample category',
    price:0,
    people:0,
    HotelStars:0,
    HotelName:'hotel',
    numReviews:0,
    meals:'meals',
    datesAvailable:'date',
    duration:0
   })

   const createdTour = await tour.save()
   res.status(201).json(createdTour)
});


const updateTour = asyncHandler(async (req, res) => {
  const {name,image1,image2,image3,image4,description,place,category,price,people,HotelStars,HotelName,numReviews,meals,datesAvailable,duration} = req.body

  const tour = await Tour. findById(req.params.id)

  if(tour){
    tour.name = name
    
    tour.image1 = image1
    tour.image2 = image2
    tour.image3 = image3
    tour.image4 = image4
    tour.description = description
    tour.place = place
    tour.category = category
    tour.price = price
    tour.people = people
    tour.HotelStars = HotelStars
    tour.HotelName = HotelName

    tour.meals = meals
    tour.datesAvailable = datesAvailable
    tour.duration = duration


    const updatedTour = await tour.save()
  res.json(updatedTour)
  }else{
    res.status(404)
    throw new Error('tour not found')
  }

  
});
export { getTours, getTourById, deleteTour,createTour,updateTour };
