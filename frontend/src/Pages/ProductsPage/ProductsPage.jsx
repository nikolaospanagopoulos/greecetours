import React,{useEffect,useState} from 'react';
import Tour from '../../components/Tour/Tour';

import './ProductsPage.css'
import axios from 'axios'

const ProductsScreen = () => {
    const [tours,setTours] = useState([])


    useEffect(()=>{
        const fetchTours = async () => {
            const {data} = await axios.get('/api/v1/tours')

            setTours(data)
        }
        fetchTours()
    },[])
    return (
        <div>
            <h1>Our Tours</h1>
            <div className="grid-container">
                {tours.map(tour=>( 
                    <div className='grid-item' key={tour._id}>
                       <Tour tour={tour}/>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default ProductsScreen;