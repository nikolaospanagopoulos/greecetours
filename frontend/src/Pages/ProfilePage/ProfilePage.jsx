import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import {listMyOrders} from "../../actions/orderActions";
import {Link} from 'react-router-dom'
import './ProfilePage.css'

import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";
const ProfilePage = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders())
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        })
      );
    }
    history.push("/");
  };

  return (
    <div>
      <div>
        <h1 className="login-title">User Profile</h1>
        {loading && <Loader />}
        {error && <Message color="red"> {error} </Message>}
        {message && <Message color="tomato"> {message} </Message>}
        {success && <Message color="green"> Profile Updated </Message>}
        <form onSubmit={submitHandler}>
          <div className="profile-container">
            <div className="name-container-profile">
              <label>Name: </label>
              <input
                type="text"
                placeholder="your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="email-container-profile">
              <label>Email Address: </label>
              <input
                type="email"
                placeholder="your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password-container-profile">
              <label>Password: </label>
              <input
                type="password"
                placeholder="your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="password-container-profile-confirm">
              <label>Confirm Password: </label>
              <input
                type="password"
                placeholder="confirm your password..."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="order-button-container">
              <button type="submit"> Update </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <h2 className='profile-orders-title'>My Tours</h2>
        {loadingOrders ? <Loader/> : errorOrders ? <Message color='red'> {errorOrders} </Message> : (
          <table className='order-table'>
            <thead>
              <tr>
               
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>STARTED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                 
                  <td> {order.createdAt.substring(0,10)} </td>
                  <td> {order.totalPrice}$ </td>
                  <td> {order.isPaid ? order.paidAt.substring(0,10) : (
                    <i className='fas fa-times' style={{color:"red"}}></i>
                  )} </td>
                   <td> {order.tourStarted ? order.startedAt.substring(0,10) : (
                    <i className='fas fa-times' style={{color:"red"}}></i>
                  )} </td>
                  <td>
                    <Link to={`/order/${order._id}`}>Details</Link>
                  </td>
                </tr> 
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
