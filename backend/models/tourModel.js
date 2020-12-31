import mongoose from 'mongoose'


const reviewSchema = mongoose.Schema({
    name:{type:String,required:true},
    rating:{type:String,required:true},
    comment:{type:String,required:true}
},{
    timestamps:true
})


const tourSchema = mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:true
    },
    image1:{
        type:String,
        required:true,
    },
    image2:{
        type:String,
        required:true,
    },
    image3:{
        type:String,
        required:true,
    },
    image4:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    people:{
        type:Number,
        required:true
    },
    reviews:[
        reviewSchema
    ],
    rating:{
        type:Number,
        required:true,
        default:0
    },
    numReviews:{
        type:Number,
        required:true,
        default:0
    },
    HotelStars:{
        type:Number,
        required:true
    },
    HotelName:{
        type:String,
        required:true
    },
    meals:{
        type:String,
        required:true
    },
    datesAvailable:{
        type:String,
        required:true,

    },
  
    duration:{
        type:Number,
        required:true
    },
    
},{
    timestamps:true
})

const Tour = mongoose.model('Tour',tourSchema)

export default Tour