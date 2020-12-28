import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    orderItems:[{
        name:{type:String,required:true},
        positions:{type:Number,required:true},
        image:{type:String,required:true},
        price:{type:Number,required:true},
        tour:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Tour'
        }

    }],
    paymentData: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
       
      },
    paymentMethod:{
        type:String,
        required:true
    },
    paymentResult:{
        id:{type:String},
        status:{type:String},
        update_time:{type:String},
        email_address:{type:String},
    },
    taxPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0,
      },
    totalPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false
    },
    paidAt:{
        type:Date
    },
    tourStarted:{
        type:Boolean,
        required:true,
        default:false
    },
    startedAt:{
        type:Date
    },
    
},{
    timestamps:true
})

const Order = mongoose.model('Order',orderSchema)

export default Order