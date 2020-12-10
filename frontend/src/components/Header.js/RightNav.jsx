import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'

const Ul = styled.ul`

list-style:none;
display:flex;
flex-flow:row nowrap;


li{
    padding:18px 15px;
}


@media (max-width: 768px){
    flex-flow:column nowrap;
    background-color:#66ff66;
    position:fixed;
    transform:${({open}) => open ? 'translateX(0)' : 'translateX(100%)'};
    top:0;
    right:0;
    height:100vh;
    width:300px;
    padding-top:3.5rem;
    z-index:18;
    transition:transform 0.3s ease-in-out;

    li{

    }
}


`



const RightNav = ({open,setOpen}) => {

    const handleClick = () => {
        setOpen(false)
    }
    return (
        <Ul open={open} onClick={handleClick}>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/tours'>Tours</Link></li>
                <li>Services</li>
                <li>About</li>
                <li>Contact</li>
                <li>Sign In</li>
            </Ul>
    );
}
 
export default RightNav
