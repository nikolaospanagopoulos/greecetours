import React from "react";
import styled from "styled-components";
import Burger from "./Burger";


import { Link } from "react-router-dom";

const Nav = styled.nav`
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
  -webkit-text-stroke: 1px black;
}

.logo a{
  text-decoration:none;
}

`;

const Header = () => {
  return (
    <Nav>
      <div className="logo">
        <Link to="/" >
          <h3 >GreekTours</h3>
        </Link>
      </div>
      <Burger />
    </Nav>
  );
};

export default Header;
