import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listTours,deleteTour ,crateTour} from "../../actions/tourActions";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import {TOUR_CREATE_RESET} from '../../constants/tourConstants'

const TourListPage = ({ history, match }) => {
  const dispatch = useDispatch();

  const tourList = useSelector((state) => state.tourList);
  const { loading, error, tours } = tourList;


  const tourDelete = useSelector((state) => state.tourDelete);
  const { loading:loadingDelete, error:errorDelete, success:successDelete } = tourDelete;

  
  const tourCreate = useSelector((state) => state.tourCreate);
  const { loading:loadingCreate, error:errorCreate, success:successCreate, tour:createdTour } = tourCreate;


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({type:TOUR_CREATE_RESET})

    if (!userInfo.isAdmin) {
      history.push('/')
    
    }

    if(successCreate){
      history.push(`/admin/tour/${createdTour._id}/edit`)
        
      
    }else{
      dispatch(listTours())
    }
  }, [dispatch, history, userInfo,successDelete,successCreate,createdTour]);

  const deleteTourHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTour(id))
    }
  };

  const createProductHandler = () => {
    dispatch(crateTour())
  };

  return (
    <div className="users-title">
      <h1>Tours</h1>
      <div>
        <button onClick={createProductHandler}>
          {" "}
          <i className="fas fa-plus"></i> Create Product
        </button>
      </div>
      {loadingDelete && <Loader/>}
      {errorDelete && <Message> {errorDelete} </Message>}
      {loadingCreate && <Loader/>}
      {errorCreate && <Message> {errorCreate} </Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message color="red"> {error} </Message>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>HOTEL NAME</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour._id}>
                <td> {tour._id} </td>
                <td> {tour.name} </td>
                <td>{tour.price}</td>
                <td> {tour.category}</td>
                <td> {tour.HotelName}</td>
                <td>
                  {" "}
                  <Link to={`/admin/tour/${tour._id}/edit`}>
                    <i className="fas fa-edit"></i>
                  </Link>
                  <button onClick={() => deleteTourHandler(tour._id)}>
                    {" "}
                    <i className="fas fa-trash"></i>{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TourListPage;
