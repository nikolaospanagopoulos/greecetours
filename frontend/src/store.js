import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  tourListReducer,
  tourDetailsReducer,
  tourDeleteReducer,
  tourCreateReducer,
  tourUpdateReducer,
  tourReviewReducer,
} from "./reducers/tourReducers";
import { cartReducer } from "./reducers/cartReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
  orderStartedReducer,
} from "./reducers/orderReducer";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
const reducer = combineReducers({
  tourList: tourListReducer,
  tourDetails: tourDetailsReducer,
  tourDelete: tourDeleteReducer,
  tourCreate:tourCreateReducer,
  tourUpdate:tourUpdateReducer,
  tourReview:tourReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMyList: orderListMyReducer,
  userUpdate: userUpdateReducer,
  orderList:orderListReducer,
  orderStarted:orderStartedReducer
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
  cart: {
    cartItems: cartItemsFromStorage,
    paymentData: paymentDataFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
