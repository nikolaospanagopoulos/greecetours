import React from "react";
import { useEffect, useState } from "react";
import Rating from "../../components/Rating/Rating";
import "./TourPage.css";
import { tourGetDetails } from "../../actions/tourActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
const TourPage = ({ match,history }) => {
  const [positions, setPositions] = useState(1);

  const dispatch = useDispatch();

  const tourDetails = useSelector((state) => state.tourDetails);
  const { tour, loading, error } = tourDetails;

  useEffect(() => {
    dispatch(tourGetDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?positions=${positions}`)
  }
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message color="red"> {error} </Message>
      ) : (
        <div>
          <div>
            <h1 className="tour-title"> {tour.name} </h1>
          </div>
          <div className="tour-images image-grid-container">
            <img src={tour.image1} alt="" />
            <img src={tour.image2} alt="" />
            <img src={tour.image3} alt="" />
            <div className="information">
              <h4> Description: {tour.description} </h4>
              <h4> Hotel name: {tour.HotelName} </h4>
              <h4>
                {" "}
                Hotel rating: <Rating value={tour.HotelStars} />{" "}
              </h4>
              <h4>Meals included: {tour.meals} </h4>
              <h4>Price per person : {tour.price} </h4>
              <h4> Duration: {tour.duration} days </h4>
              <h4>Available Dates: &nbsp;</h4>
              <div>
                {tour.people> 0
                  ? "Seats available!"
                  : "all places are booked!"}
              </div>
              <h4>
                Tour Reviews:{" "}
                <Rating value={tour.rating} text={tour.numReviews} />{" "}
              </h4>
              {tour.people > 0 && (
                <div  className='cart-select'> <h4>Select places:</h4>
                  <select 
                    className='options-cart'
                    
                    value={positions}
                    
                    onChange={(e) => setPositions(e.target.value)}
                  >
                    {[...Array(tour.people).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                         {x + 1}
                      </option>
                    ))}
                  </select>{" "}
                </div>
              )}

              <button  onClick={addToCartHandler} className="buy-button" disabled={(tour.people === 0)}>
                {" "}
                Add to Cart{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourPage;
