import {CART_ADD_ITEM,CART_REMOVE_ITEM, SAVE_PAYMENT_DATA} from './../constants/cartConstants'

export const cartReducer = (state={cartItems:[],paymentData:{}},action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload

            const existItem = state.cartItems.find((x) =>x.tour === item.tour)

            if(existItem){
                return{
                    ...state,
                    cartItems:state.cartItems.map(x=>x.tour === existItem.tour ? item : x)
                }
            }else{
                return {
                    ...state,
                    cartItems:[...state.cartItems,item]
                }
            }
            case CART_REMOVE_ITEM:
                return{
                    ...state,
                    cartItems:state.cartItems.filter(x => x.tour !== action.payload)
                }
                case SAVE_PAYMENT_DATA:
                    return{
                        ...state,
                        paymentData:action.payload
                    }
        default:
            return state
    }
}