import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'


const addOrderItems = asyncHandler(async(req,res) => {
    const {
        orderItems,paymentData,paymentMethod,itemsPrice,taxPrice,totalPrice
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No items in your cart')
    }else{
        const order = new Order({
            orderItems,user:req.user._id,paymentData,paymentMethod,itemsPrice,taxPrice,totalPrice
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
})

export {addOrderItems}