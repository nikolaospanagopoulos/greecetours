import {
  TOUR_LIST_REQUEST,
  TOUR_LIST_SUCCESS,
  TOUR_LIST_FAIL,
  TOUR_DETAILS_REQUEST,
  TOUR_DETAILS_SUCCESS,
  TOUR_DETAILS_FAIL,
  TOUR_DELETE_REQUEST,
  TOUR_DELETE_SUCCESS,
  TOUR_DELETE_FAIL,
  TOUR_CREATE_REQUEST,
  TOUR_CREATE_SUCCESS,
  TOUR_CREATE_FAIL,
  TOUR_UPDATE_REQUEST,
  TOUR_UPDATE_SUCCESS,
  TOUR_UPDATE_FAIL,
} from "../constants/tourConstants";
import axios from "axios";

export const listTours = (sort = "") => async (dispatch) => {
  try {
    dispatch({ type: TOUR_LIST_REQUEST });

    const { data } = await axios.get(`/api/v1/tours?sort=${sort}`);

    dispatch({
      type: TOUR_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: TOUR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const tourGetDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TOUR_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/tours/${id}`);

    dispatch({
      type: TOUR_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOUR_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTour = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TOUR_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/v1/tours/${id}`, config);

    dispatch({
      type: TOUR_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TOUR_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const crateTour = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TOUR_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {data} = await axios.post(`/api/v1/tours`, {},config);

    dispatch({
      type: TOUR_CREATE_SUCCESS,
      payload:data
    });
  } catch (error) {
    dispatch({
      type: TOUR_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTour = (tour) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TOUR_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type':'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {data} = await axios.put(`/api/v1/tours/${tour._id}`, tour,config);

    dispatch({
      type: TOUR_UPDATE_SUCCESS,
      payload:data
    });
  } catch (error) {
    dispatch({
      type: TOUR_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
