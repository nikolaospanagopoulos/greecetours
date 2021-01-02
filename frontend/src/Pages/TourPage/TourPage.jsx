import React from "react";
import { useEffect, useState } from "react";
import Rating from "../../components/Rating/Rating";
import "./TourPage.css";
import { Link } from "react-router-dom";
import { tourGetDetails, createTourReview } from "../../actions/tourActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { TOUR_REVIEW_RESET } from "../../constants/tourConstants";

const TourPage = ({ match, history }) => {
  const [positions, setPositions] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const tourDetails = useSelector((state) => state.tourDetails);
  const { tour, loading, error } = tourDetails;

  const tourReview = useSelector((state) => state.tourReview);
  const { error: errorReview, success: successReview } = tourReview;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if(successReview){
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({type:TOUR_REVIEW_RESET})
    }
    dispatch(tourGetDetails(match.params.id));
  }, [dispatch, match,successReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?positions=${positions}`);
  };

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createTourReview(match.params.id,{
      rating,comment
    }))
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
          <div className="information">
            <h4 className="tour-description">
              {" "}
              <strong>Description: </strong> {tour.description}{" "}
            </h4>
            <h4>
              {" "}
              <strong>Hotel Name: </strong>
              {tour.HotelName}{" "}
            </h4>
            <h4>
              {" "}
              <strong>Hotel Rating: </strong> <Rating rating={tour.HotelStars} />{" "}
            </h4>
            <h4>
              {" "}
              <strong>Meals included:</strong> {tour.meals}{" "}
            </h4>
            <h4>
              <strong>Price per person :</strong> {tour.price}€{" "}
            </h4>
            <h4>
              {" "}
              <strong>Duration :</strong> {tour.duration} days{" "}
            </h4>
            <h4>
              {" "}
              <strong>Available Dates :</strong> {tour.datesAvailable}
            </h4>
            <div>
              {tour.people > 0 ? (
                <strong>Seats Available</strong>
              ) : (
                <strong>All Seats Are Booked</strong>
              )}
            </div>
            <h4>
              <strong>Tour Reviews:</strong>{" "}
              <Rating rating={tour.rating} numreviews={tour.numReviews} />{" "}
            </h4>
            {tour.people > 0 && (
              <div className="cart-select">
                {" "}
                <h4>
                  <strong>Select Number Of Seats:</strong>
                </h4>
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
          <div className='review'>
            <div  className='review-container'>
              <h2>Reviews:</h2>
              {tour.reviews.length === 0 && (
                <Message color="green"> No Reviews Yet </Message>
              )}
              <div>
                {tour.reviews.map((review) => (
                  <div key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating rating={review.rating} />
                    <p> {review.createdAt.substring(0, 10)} </p>
                    <p> {review.comment} </p>
                  </div>
                ))}
                <div >
                  <h2>Write a customer Review:</h2>
                  {errorReview && (
                    <Message color="red"> {errorReview} </Message>
                  )}
                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <div className='select-review'>
                        <label>Rating</label>
                        <select
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=""> Select... </option>
                          <option value="1"> 1 Poor</option>
                          <option value="2"> 2 Fair</option>
                          <option value='3'> 3 Good</option>
                          <option value="4"> 4 Very Good</option>
                          <option value="5"> 5 Excellent</option>
                        </select>
                      </div>
                      <div className='review-text'>
                        <label>Comment</label>
                        <textarea
                          value={comment}
                          rows="3"
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      <div>
                        <button type="submit">Submit Review</button>
                      </div>
                    </form>
                  ) : (
                    <Message color="green">
                      {" "}
                      Please login to Leave a Review{" "}
                      <Link to="/login"> Login </Link>{" "}
                    </Message>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourPage;
