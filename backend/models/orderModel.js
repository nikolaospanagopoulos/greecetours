import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    orderItems:[{
        name:{type:String,required:true},
        people:{type:Number,required:true},
        image1:{type:String,required:true},
        price:{type:Number,required:true},
        product:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Tour'
        }

    }],
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
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
},{
    timestamps:true
})

const Order = mongoose.model('Order',orderSchema)

export default Order