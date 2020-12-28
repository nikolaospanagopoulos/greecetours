import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../../components/Message/Message";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import { Link } from "react-router-dom";
import { createOrder } from "../../actions/orderActions";
import "./FinalizePage.css";

const FinalizePage = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  //calculate price
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.positions, 0)
  );

  cart.taxPrice = addDecimals(Number((0.09 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.taxPrice)).toFixed(
    2
  );

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        paymentData: cart.paymentData,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div>
        <div className="client-information">
          <div>
            <h2> Client Information: </h2>
            <p style={{ display: "flex", flexDirection: "column" }}>
              <strong> Name: </strong>
              {userInfo.name}
              <strong> Email: </strong>
              {userInfo.email}
              <strong> Address: </strong>
              {cart.paymentData.address}
              <strong> City: </strong>
              {cart.paymentData.city}
              <strong> Postal Code: </strong>
              {cart.paymentData.postalCode}
            </p>
          </div>
          <div>
            <h3>Payment Method:</h3>
            <h2>Method:</h2>
            {cart.paymentMethod}
          </div>
          <div className="tour-finalize-info">
            <h3>Tours in Cart:</h3>
            {cart.cartItems.length === 0 ? (
              <Message> Your Cart Is Empty </Message>
            ) : (
              <div>
                {cart.cartItems.map((item, index) => (
                  <div key={index}>
                    <div>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div>
                      <Link to={`/tours/tour/${item.tour}`}> {item.name} </Link>
                    </div>
                    <div>
                      {item.positions} x {item.price} = $
                      {item.positions * item.price}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="purchase-summury">
          <h2>Your purchase summury:</h2>

          <div>
            {" "}
            <strong>Tours: </strong> ${cart.itemsPrice}{" "}
          </div>

          <div>
            {" "}
            <strong>Tax: </strong>${cart.taxPrice}{" "}
          </div>

          <div>
            {" "}
            <strong>Total: </strong> ${cart.totalPrice}{" "}
          </div>
        </div>
        <div>
          <div>{error && <Message color="red"> {error} </Message>}</div>
          <div className='purchase-button-container'>
            <button
              type="button"
              onClick={() => placeOrderHandler()}
              disabled={cart.cartItems === 0}
            >
              {" "}
              Place your order{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalizePage;
