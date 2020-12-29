import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { tourListReducer, tourDetailsReducer } from "./reducers/tourReducers";
import { cartReducer } from "./reducers/cartReducer";
import {orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer} from './reducers/orderReducer'
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";
const reducer = combineReducers({
  tourList: tourListReducer,
  tourDetails: tourDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate:orderCreateReducer,
  orderDetails:orderDetailsReducer,
  orderPay:orderPayReducer,
  orderMyList:orderListMyReducer
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const paymentDataFromStorage = localStorage.getItem("paymentData")
  ? JSON.parse(localStorage.getItem("paymentData"))
  : {};

const initialState = {
  cart: { cartItems: cartItemsFromStorage,paymentData:paymentDataFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
