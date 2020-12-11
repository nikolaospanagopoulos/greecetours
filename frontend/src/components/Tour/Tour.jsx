import React from 'react';
import './Tour.css';
import {Link} from 'react-router-dom'
import Rating from '../Rating/Rating';


const Tour = ({tour}) => {
    return ( 
        <div className='card'>
            <div className='container'>
            <Link to={`/tours/tour/${tour._id}`}>
                <img src={tour.image1} alt="tour poster" className='card-image'/>
            </Link>
            </div>
            
            <div className='details'>
            <Link to={`/tours/tour/${tour._id}`}>
                <h3> {tour.name} </h3>
                </Link>
                <Rating value={tour.rating} text={`${tour.numReviews} reviews`}/>
                <p>
                €{tour.price}
                </p>
            </div>
        </div>
     );
}
 
export default Tour;