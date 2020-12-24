import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  li {
    padding: 18px 15px;
  }
a{
  text-decoration:none;
  color:black;
}
  .logoutlink{
    
    text-align:center;
    border-top:0px;
    background-image: linear-gradient(to top ,#4dff4d, #66ffe0);
    
    
  }
.logoutlink a{
  text-decoration:none;
  color:black;
}
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #66ff66;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    z-index: 18;
    transition: transform 0.3s ease-in-out;

    li {
    }
  }
`;

const RightNav = ({ open, setOpen,history }) => {

    const [menuAppear,setMenuAppear] = useState(false)
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const handleClick = () => {
    setOpen(false);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <Ul open={open} onClick={handleClick}  onMouseEnter={()=>setMenuAppear(false)}>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/tours">Tours</Link>
      </li>
      <li>
        <Link to="/cart">Cart</Link>
      </li>
      <li>Services</li>
      <li>About</li>
      <li>Contact</li>
      {userInfo ? (
        <div onMouseEnter={()=>setMenuAppear(!menuAppear)}  onMouseLeave={()=>setMenuAppear(false)}>
          <li >
            <Link to="/profile"   >{userInfo.name}</Link>
          </li>
          {menuAppear && (
              <li className='logoutlink'>
              <Link  to='/' onClick={() => logoutHandler()}>Logout</Link >
            </li>
          )}
          
        </div>
      ) : (
        <li>
          <Link to="/login">Sign In</Link>
        </li>
      )}
    </Ul>
  );
};

export default RightNav;
