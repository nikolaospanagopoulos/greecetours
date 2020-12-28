import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { getOrderDetails } from "../../actions/orderActions";


const OrderPage = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

 
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;




  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, []);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message color="red"> {error} </Message>
  ) : (
    <div>
      <h1> {order._id} </h1>
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
         {order.isPaid ? <Message color='green'> Order Paid At {order.paidAt} </Message> : <Message color='red'> Not Paid </Message>}
            </div>
            <div>
         {order.tourStarted ? <Message color='green'> Tour Started At {order.startedAt} </Message> : <Message color='red'> Tour hasn't started yet </Message>}
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
        <div></div>
      </div>
    </div>
  );
};

export default OrderPage;
