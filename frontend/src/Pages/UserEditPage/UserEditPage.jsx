import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails,updateUser } from "../../actions/userActions";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import {USER_UPDATE_RESET} from '../../constants/userConstants'
import { Link } from "react-router-dom";
import './UserEditPage.css'


const UserEditPage = ({ match,history}) => {
  const userId = match.params.id;
  const [email, setEmail] = useState("");

  const [name, setName] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();


  const userDetails = useSelector(state=>state.userDetails)
  const {loading,error,user} = userDetails

  const userUpdate = useSelector(state=>state.userUpdate)
  const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = userUpdate

  useEffect(() => {
    if(successUpdate){
      dispatch({type:USER_UPDATE_RESET})
      history.push('/admin/userlist')
    }else{
      if(!user || !user.name || user._id !== userId){
        dispatch(getUserDetails(userId))
      }else{
          setName(user.name)
          setEmail(user.email)
          setIsAdmin(user.isAdmin)
      }
    }
   
  }, [user,dispatch,userId,successUpdate,history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({_id:userId,name,email,isAdmin}))
  };

  return (
    <div>
      <div>
        <Link to="/admin/userlist" className='admin-users-page-link'><button>Back</button></Link>
        <h1 className='admin-users-title'>Edit User</h1>
        {loadingUpdate && <Loader/> }
        {errorUpdate && <Message> {errorUpdate} </Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message color="red"> {error} </Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="profile-container">
              <div className="name-container-profile-edit">
                <label>Name: </label>
                <input
                  type="text"
                  placeholder="name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="email-container-profile-edit">
                <label>Email Address: </label>
                <input
                  type="email"
                  placeholder="email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="admin-container-profile-edit">
                <label> User is Admin ? </label>
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              </div>
              <div className="admin-users-button-container">
                <button type="submit"> Update </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserEditPage;
