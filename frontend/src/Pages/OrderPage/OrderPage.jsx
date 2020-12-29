import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { getOrderDetails, payOrder } from "../../actions/orderActions";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../../constants/orderConstants";

const OrderPage = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/v1/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [order, orderId, dispatch, successPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message color="red"> {error} </Message>
  ) : (
    <div>
      <h2 style={{ textAlign: "center" }}>Tour id: {order._id} </h2>
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
              {order.paymentData.address}
              <strong> City: </strong>
              {order.paymentData.city}
              <strong> Postal Code: </strong>
              {order.paymentData.postalCode}
            </p>
          </div>
          <div>
            <h3>Payment Method:</h3>
            <h2>Method:</h2>
            {order.paymentMethod}
            <div>
              {order.isPaid ? (
                <Message color="green"> Order Paid At {order.paidAt} </Message>
              ) : (
                <Message color="red"> Not Paid </Message>
              )}
            </div>
            <div>
              {order.tourStarted ? (
                <Message color="green">
                  {" "}
                  Tour Started At {order.startedAt}{" "}
                </Message>
              ) : (
                <Message color="red"> Tour hasn't started yet </Message>
              )}
            </div>
          </div>
          <div className="tour-finalize-info">
            <h3>Tours in Cart:</h3>
            {order.orderItems.length === 0 ? (
              <Message> Your Order Is Empty </Message>
            ) : (
              <div>
                {order.orderItems.map((item, index) => (
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
            <strong>Tours: </strong> ${order.itemsPrice}{" "}
          </div>

          <div>
            {" "}
            <strong>Tax: </strong>${order.taxPrice}{" "}
          </div>

          <div>
            {" "}
            <strong>Total: </strong> ${order.totalPrice}{" "}
          </div>
        </div>
        {!order.isPaid && (
          <div>
            {loadingPay && <Loader />}
            {!sdkReady ? (
              <Loader />
            ) : (
              <PayPalButton
                amount={order.totalPrice}
                onSuccess={successPaymentHandler}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
