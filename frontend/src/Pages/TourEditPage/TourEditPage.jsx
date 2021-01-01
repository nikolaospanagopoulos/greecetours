import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { tourGetDetails, updateTour } from "../../actions/tourActions";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { TOUR_UPDATE_RESET } from "../../constants/tourConstants";

const TourEditPage = ({ match, history }) => {
  const tourId = match.params.id;

  const [name, setName] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [people, setPeople] = useState(0);
  const [HotelStars, setHotelStars] = useState(0);
  const [HotelName, setHotelName] = useState("");
  const [meals, setMeals] = useState("");
  const [datesAvailable, setDatesAvailable] = useState("");
  const [duration, setDuration] = useState(0);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  const tourDetails = useSelector((state) => state.tourDetails);
  const { loading, error, tour } = tourDetails;

  const tourUpdate = useSelector((state) => state.tourUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = tourUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: TOUR_UPDATE_RESET });
      history.push("/admin/tourlist");
    } else {
      if (!tour.name || tour._id !== tourId) {
        dispatch(tourGetDetails(tourId));
      } else {
        setName(tour.name);
        setImage1(tour.image1);
        setImage2(tour.image2);
        setImage3(tour.image3);
        setImage4(tour.image4);
        setDescription(tour.description);
        setCategory(tour.category);
        setDatesAvailable(tour.datesAvailable);
        setDuration(tour.duration);
        setHotelName(tour.HotelName);
        setHotelStars(tour.HotelStars);
        setPrice(tour.price);
        setPeople(tour.people);
        setPlace(tour.place);
        setMeals(tour.meals);
      }
    }
  }, [dispatch, tourId, history, tour, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateTour({
        _id: tourId,
        name,
        price,
        image1,
        image2,
        image3,
        image4,
        category,
        description,
        place,
        meals,
        duration,
        HotelName,
        HotelStars,
        people,
        datesAvailable,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/v1/upload", formData, config);
      setImage1(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const uploadFileHandler2 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/v1/upload", formData, config);
      setImage2(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const uploadFileHandler3 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/v1/upload", formData, config);
      setImage3(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const uploadFileHandler4 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/v1/upload", formData, config);
      setImage4(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <div>
      <div>
        <Link to="/admin/userlist" className="admin-users-page-link">
          <button>Back</button>
        </Link>
        <h1 className="admin-users-title">Edit Tour</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message> {errorUpdate} </Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message color="red"> {error} </Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="profile-container">
              <div className="name-container-profile-edit">
                <label>Name: </label>
                <input
                  type="text"
                  placeholder="name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label>Price: </label>
                <input
                  type="number"
                  placeholder="price..."
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label> Number of People ? </label>
                <input
                  type="number"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                />
              </div>
              <div>
                <label> Image 1 ? </label>
                <input
                  type="text"
                  value={image1}
                  onChange={(e) => setImage1(e.target.value)}
                />
                <input
                  type="file"
                  id="image-file"
                  onChange={uploadFileHandler}
                />
                {uploading && <Loader />}
              </div>

              <div>
                <label> Image 2 ? </label>
                <input
                  type="text"
                  value={image2}
                  onChange={(e) => setImage2(e.target.value)}
                />
                <input
                  type="file"
                  id="image-file"
                  onChange={uploadFileHandler2}
                />
                {uploading && <Loader />}
              </div>

              <div>
                <label> Image 3 ? </label>
                <input
                  type="text"
                  value={image3}
                  onChange={(e) => setImage3(e.target.value)}
                />
                <input
                  type="file"
                  id="image-file"
                  onChange={uploadFileHandler3}
                />
                {uploading && <Loader />}
              </div>

              <div>
                <label> Image 4 ? </label>
                <input
                  type="text"
                  value={image4}
                  onChange={(e) => setImage4(e.target.value)}
                />
                <input
                  type="file"
                  id="image-file"
                  onChange={uploadFileHandler4}
                />
                {uploading && <Loader />}
              </div>

              <div>
                <label> Description ? </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label> Dates Available ? </label>
                <input
                  type="text"
                  value={datesAvailable}
                  onChange={(e) => setDatesAvailable(e.target.value)}
                />
              </div>

              <div>
                <label> Hotel Name ? </label>
                <input
                  type="text"
                  value={HotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                />
              </div>

              <div>
                <label> Hotel Stars ? </label>
                <input
                  type="number"
                  value={HotelStars}
                  onChange={(e) => setHotelStars(e.target.value)}
                />
              </div>

              <div>
                <label> Meals ? </label>
                <input
                  type="text"
                  value={meals}
                  onChange={(e) => setMeals(e.target.value)}
                />
              </div>

              <div>
                <label> Place ? </label>
                <input
                  type="text"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />
              </div>

              <div>
                <label> Duration ? </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>

              <div>
                <label> Category ? </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="admin-users-button-container">
                <button type="submit"> Update </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TourEditPage;
