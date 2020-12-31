import React from "react";
import { useEffect, useState } from "react";
import Rating from "../../components/Rating/Rating";
import "./TourPage.css";
import { tourGetDetails } from "../../actions/tourActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
const TourPage = ({ match, history }) => {
  const [positions, setPositions] = useState(1);

  const dispatch = useDispatch();

  const tourDetails = useSelector((state) => state.tourDetails);
  const { tour, loading, error } = tourDetails;

  useEffect(() => {
    dispatch(tourGetDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?positions=${positions}`);
  };
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
            <img src={tour.image4} alt="" />
            
          </div>
          <div className='information'>
              <h4 className='tour-description'> <strong >Description: </strong> {tour.description} </h4>
              <h4> <strong>Hotel Name: </strong>{tour.HotelName} </h4>
              <h4>
                {" "}
                <strong>Hotel Rating: </strong> <Rating value={tour.HotelStars} />{" "}
              </h4>
              <h4> <strong>Meals included:</strong> {tour.meals} </h4>
              <h4><strong>Price per person :</strong> {tour.price}€ </h4>
              <h4> <strong>Duration :</strong> {tour.duration} days </h4>
              <h4> <strong>Available Dates :</strong> {tour.datesAvailable}</h4>
              <div>
                {tour.people > 0
                  ? <strong>Seats Available</strong>
                  : <strong>All Seats Are Booked</strong>}
              </div>
              <h4>
              <strong>Tour Reviews:</strong>{" "}
                <Rating value={tour.rating} text={tour.numReviews} />{" "}
              </h4>
              {tour.people > 0 && (
                <div className="cart-select">
                  {" "}
                  <h4><strong>Select Number Of Seats:</strong></h4>
                  <select
                   
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

              <button
                onClick={addToCartHandler}
                className="buy-button"
                disabled={tour.people === 0}
              >
                {" "}
                Add to Cart{" "}
              </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default TourPage;
