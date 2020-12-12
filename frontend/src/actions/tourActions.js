import {TOUR_LIST_REQUEST,TOUR_LIST_SUCCESS,TOUR_LIST_FAIL, TOUR_DETAILS_REQUEST, TOUR_DETAILS_SUCCESS, TOUR_DETAILS_FAIL} from '../constants/tourConstants'
import axios from 'axios'


export const listTours = () => async (dispatch) => {
    try{
        dispatch({type:TOUR_LIST_REQUEST})

        const {data} = await axios.get('/api/v1/tours')

        dispatch({
            type:TOUR_LIST_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:TOUR_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}



export const tourGetDetails = (id) => async (dispatch) => {
    try{
        dispatch({type:TOUR_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/v1/tours/${id}`)

        dispatch({
            type:TOUR_DETAILS_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:TOUR_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}