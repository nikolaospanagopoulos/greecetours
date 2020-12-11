import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import "./TourPage.css";
const TourPage = ({ match }) => {
  const [tour, setTour] = useState({});

  useEffect(() => {
    const fetchTour = async () => {
      const { data } = await axios.get(`/api/v1/tours/${match.params.id}`);

      setTour(data);
    };
    fetchTour();
  }, [match]);
  return (
    <div>
      <h1 className="tour-title"> {tour.name} </h1>
      <div className="tour-images image-grid-container">
        <img src={tour.image1} alt="" />
        <img src={tour.image2} alt="" />
        <img src={tour.image3} alt="" />
        <div className='information'>
        <h4> Description: {tour.description} </h4>
        <h4> Hotel name: {tour.HotelName} </h4>
        <h4> Hotel rating: <Rating value={tour.HotelStars}/> </h4>
        <h4>Meals included: {tour.meals}  </h4>
        <h4>Price per person : {tour.price}  </h4>
        <h4> Duration: {tour.duration} days </h4>
        <h4>Available Dates:  &nbsp;</h4>
        <h4>Tour Reviews: <Rating value={tour.rating} text={tour.numReviews}/>  </h4>
        
        </div>
        
      </div>
    </div>
  );
};

export default TourPage;
