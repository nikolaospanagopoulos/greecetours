import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import {USER_UPDATE_PROFILE_RESET} from '../../constants/userConstants'
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
  


  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])


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
    history.push('/')
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
          <div className="register-container">
            <div className="name-container-login">
              <label>Name: </label>
              <input
                type="text"
                placeholder="your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="email-container-login">
              <label>Email Address: </label>
              <input
                type="email"
                placeholder="your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password-container-login">
              <label>Password: </label>
              <input
                type="password"
                placeholder="your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="register-password-container-login">
              <label>Confirm Password: </label>
              <input
                type="password"
                placeholder="confirm your password..."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="login-button-container">
              <button type="submit"> Update </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <h2>orders</h2>
      </div>
    </div>
  );
};

export default ProfilePage;
