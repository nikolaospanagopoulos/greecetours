import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {listOrders} from '../../actions/orderActions'
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";


const OrderListPage = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/");
    }
  }, [dispatch, history, userInfo]);

  

  return (
    <div className="users-title">
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message color="red"> {error} </Message>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>STARTED</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td> {order._id} </td>
                <td> {order.user && order.user.name} </td>
                <td>
                  {" "}
                  {order.createdAt.substring(0,10)}
                </td>
                <td>
                  {" "}
                  {order.totalPrice}
                </td>
                <td>
                  {" "}
                  {order.isPaid ? (
                    order.paidAt.substring(0,10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}{" "}
                </td>
                <td>
                  {" "}
                  {order.tourStarted ? (
                    order.startedAt.substring(0,10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}{" "}
                </td>
                <td>
                  {" "}
                  <Link to={`/order/${order._id}`}>
                   <button>Details</button>
                  </Link>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderListPage;
