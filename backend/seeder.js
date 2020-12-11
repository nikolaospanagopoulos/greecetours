import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import tours from './data/products.js'
import User from './models/userModel.js'
import Tour from './models/tourModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try{
       await Order.deleteMany()
       await User.deleteMany()
       await Tour.deleteMany()

       const createdUsers = await User.insertMany(users)

       const adminUser = createdUsers[0]._id

       const sampleTours = tours.map(tour => {
           return {...tour,user:adminUser}
       })

       await Tour.insertMany(sampleTours)

       console.log('data imported')
       process.exit()
    }catch(err){
        console.error(err)
        process.exit(1)
    }
}

const destroyData = async () => {
    try{
       await Order.deleteMany()
       await User.deleteMany()
       await Tour.deleteMany()

       console.log('data deleted')
    }catch(err){
        console.error(err)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}