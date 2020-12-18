import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import Tour from '../../components/Tour/Tour';
import {listTours} from '../../actions/tourActions'
import './ProductsPage.css'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
const ProductsScreen = ({match,history}) => {
    
    const dispatch = useDispatch()
    const tourList = useSelector(state=>state.tourList)
    const {tours,loading,error} = tourList
    const { sort}=match.params
    


    useEffect(()=>{
        dispatch(listTours(sort))
        
    },[dispatch,sort,history])
    return (
        <div>
            <h1>Our Tours</h1>
            <button onClick={()=>history.push('/tours/price')}>Price</button>
            <button onClick={()=>history.push('/tours/numReviews')}>reviews</button>
            {loading ? <Loader/> : error ? <Message color='red'> {error} </Message> : (
                <div className="grid-container">
                {tours.map(tour=>( 
                    <div className='grid-item' key={tour._id}>
                       <Tour tour={tour}/>
                    </div>
                ))}
            </div>
            )}
            
        </div>
    );
}
 
export default ProductsScreen;