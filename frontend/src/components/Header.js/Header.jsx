import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';
import greektours from './greektours.png'


const Nav = styled.nav`
width:100%;
height:75px;

background-image: linear-gradient(to bottom right,#4dff4d, #66ffe0);
display:flex;
justify-content:space-between;


.logo{
    position: relative;
    bottom:4rem
}


`




const Header = () => {
    return ( 
        <Nav >
            <div className='logo'>
                <img src={greektours} alt="greek tours logo"/>
            </div>
            <Burger/>
        </Nav>
     );
}
 
export default Header;