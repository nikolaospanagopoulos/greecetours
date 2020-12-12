import React from 'react';
import './HomePage.css'
const HomePage = ({history}) => {

const handleClick = () => {
    history.push('/tours')
}

    return (
        <div className='homepage'>
            <div className='homepage-container'>
            <h1 className='home-title'>Visit the amazing Greece</h1>
           <button className='btn-homepage' onClick={handleClick}> Our Tours </button>
            </div>
           
            
        </div>
    );
}
 
export default HomePage;