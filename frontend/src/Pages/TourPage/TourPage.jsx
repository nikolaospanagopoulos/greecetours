import React from 'react';
import axios from 'axios'
import { useState,useEffect } from 'react';
import {Link} from 'react-router-dom'
import Rating from '../../components/Rating/Rating'

const TourPage = ({match}) => {
    const [tour,setTour] = useState({})

    useEffect(()=>{
        const fetchTour = async () => {
            const {data} = await axios.get(`/api/v1/tours/${match.params.id}`)

            setTour(data)
        }
        fetchTour()
    },[match])
    return ( 
        <div>
{tour.price}
        </div>
    );
}
 
export default TourPage 
