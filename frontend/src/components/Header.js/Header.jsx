import React from "react";
import styled from "styled-components";
import Burger from "./Burger";


import { Link } from "react-router-dom";

const Nav = styled.nav`
@import url('https://fonts.googleapis.com/css2?family=Sue+Ellen+Francisco&display=swap');
  width: 100%;
  height: 75px;

  background-image: linear-gradient(to bottom right, #4dff4d, #66ffe0);
  display: flex;
  justify-content: space-between;

  .logo {
    position: relative;
    bottom: 0.4rem;
   
  }

.logo h3{
  font-size:1.8rem;
  color:white;
  margin-left:10px;
}

  a{
    font-family: 'Sue Ellen Francisco', cursive;
    text-decoration:'none';
  
    text-decoration: none;
    color: black;
    text-transform: uppercase;
    
    -webkit-text-stroke: 1px black;
  
  }
`;

const Header = () => {
  return (
    <Nav>
      <div className="logo">
        <Link to="/">
          <h3 style={{}}>GreekTours</h3>
        </Link>
      </div>
      <Burger />
    </Nav>
  );
};

export default Header;
