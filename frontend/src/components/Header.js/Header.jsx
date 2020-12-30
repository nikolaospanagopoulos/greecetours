import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';
import greektours from './greektours.png'
import greektours2 from './greektours2.png'
import {Link} from 'react-router-dom'

const Nav = styled.nav`
width:100%;
height:75px;

background-image: linear-gradient(to bottom right,#4dff4d, #66ffe0);
display:flex;
justify-content:space-between;


.logo{
    position:relative;
    bottom:0.4rem;
   
    
    
    
}



`




const Header = () => {
    return ( 
        <Nav >
            <div className='logo' >
                <Link to='/' ><img src={greektours2}  style={{height:"80px"}} alt="greek tours logo"/></Link>
            </div>
            <Burger/>
        </Nav>
     );
}
 
export default Header;