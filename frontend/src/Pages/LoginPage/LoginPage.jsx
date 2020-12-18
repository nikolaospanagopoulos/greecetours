import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/userActions";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import {Link} from 'react-router-dom'
import './LoginPage.css'
const LoginScreen = ({location,history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const {loading, userInfo,error} = userLogin
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if(userInfo){
      history.push(redirect)
    }
  },[dispatch,history,userInfo,redirect])


  const submitHandler = (e) => {
  e.preventDefault()
  dispatch(login(email,password))
  };



  return (
    <div >
      <h1 className='login-title'>Sign In</h1>
      {loading  && <Loader/>}
      {error && <Message color='red'> {error} </Message>}
      <form onSubmit={submitHandler}>
      <div className='email-container-login'>
        <label>Email Address: </label>
        <input type="email" placeholder="your email..." value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      <div className='password-container-login'>
        <label>Password: </label>
        <input type="password" placeholder="your password..." value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      <div className='login-button-container'>
          <button type='submit' > SUBMIT </button>
      </div>
      </form>
      

      <div className='login-redirect'>
          New Customer ?
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> Register </Link>
      </div>
    </div>
  );
};

export default LoginScreen;
