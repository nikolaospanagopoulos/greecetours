import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {register } from "../../actions/userActions";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import {Link} from 'react-router-dom'
import './RegisterPage.css'

const RegisterPage = ({location,history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)
  const {loading, userInfo,error} = userRegister
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if(userInfo){
      history.push(redirect)
    }
  },[dispatch,history,userInfo,redirect])


  const submitHandler = (e) => {
  e.preventDefault();
  if(password !== confirmPassword){
      setMessage('Passwords do not match')
  }else{
    dispatch(register(name,email,password))
  }
  
  };



  return (
    <div >
      <h1 className='login-title'>Register</h1>
      {loading  && <Loader/>}
      {error && <Message color='red'> {error} </Message>}
      {message && <Message color='tomato'> {message} </Message>}
      <form onSubmit={submitHandler}>
          <div className='register-container'>
      <div className='name-container-register'>
        <label>Name: </label>
        <input type="text" placeholder="your name..." value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div className='email-container-register'>
        <label>Email Address: </label>
        <input type="email" placeholder="your email..." value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      <div className='password-container-register'>
        <label>Password: </label>
        <input type="password" placeholder="your password..." value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      <div className='password-confirm-register'>
        <label>Confirm Password: </label>
        <input type="password" placeholder="confirm your password..." value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
      </div>
      <div className='register-button-container'>
          <button type='submit' > Register </button>
      </div>
      </div>
      </form>
      

      <div className='login-redirect'>
          You already have an account ?
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}> Login </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
