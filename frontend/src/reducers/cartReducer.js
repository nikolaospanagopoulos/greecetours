import {CART_ADD_ITEM,CART_REMOVE_ITEM} from './../constants/cartConstants'

export const cartReducer = (state={cartItems:[]},action) => {
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
        default:
            return state
    }
}