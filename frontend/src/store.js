import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {tourListReducer,tourDetailsReducer} from './reducers/tourReducers'
import {cartReducer} from './reducers/cartReducer'
const reducer = combineReducers({
   tourList:tourListReducer,
   tourDetails:tourDetailsReducer,
   cart:cartReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []


const initialState = {
   cart:{cartItems:cartItemsFromStorage}
}


const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store