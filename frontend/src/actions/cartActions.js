import axios from 'axios'
import {CART_ADD_ITEM,CART_REMOVE_ITEM, SAVE_PAYMENT_DATA} from './../constants/cartConstants'


export const addToCart = (id,positions) => async (dispatch,getState) => {
    const {data} = await axios.get(`/api/v1/tours/${id}`)

    dispatch({
        type:CART_ADD_ITEM,
        payload:{
            tour:data._id,
            name:data.name,
            price:data.price,
            image:data.image1,
            people:data.people,
            positions
        }
    })
localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))


}

export const cartRemoveItem = (id,) => async (dispatch,getState) => {
   

    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id
        })
    
localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))


}

export const savePaymentData = (data) => async (dispatch) => {
   

    dispatch({
        type:SAVE_PAYMENT_DATA,
        payload:data
        })
    
localStorage.setItem('paymentData',JSON.stringify(data))


}