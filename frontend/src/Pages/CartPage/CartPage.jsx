import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import Message from '../../components/Message/Message'
import {addToCart} from '../../actions/cartActions'
import {Link} from 'react-router-dom'
import './CartPage.css'
const CartPage = ({match,location,history}) => {
    const tourId = match.params.id
    
    const positions = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state=>state.cart)
    const {cartItems} = cart
    useEffect(()=> {
        if(tourId){
            dispatch(addToCart(tourId,positions))
        }
    },[dispatch,tourId,positions])

    const removeFromCart = (id) => {

    }

    const checkoutHandler = () => {

    }


    return ( 
        <div>
            <div>
                <h1 className='cart-title'>Shopping cart</h1>
                {cartItems.length === 0 ? <Message color='blue'>  Your Cart Is Empty. <Link to='/tours'>Go Back</Link> </Message> : (
                  <div>
                      {cartItems.map(item => (
                          <div key={item.tour} className='cart-container'>
                              <div> <img className='cart-image' src={item.image} alt={item.name}/> </div>
                              <div> <Link to={`/tours/tour/${item.tour}`} className='cart-title'> {item.name} </Link> </div>
                              <div> {item.price} $ </div>
                              <div> <div  className='carttour-select'> <h4 >Select places:</h4>
                  <select 
                    className='options-tour'
                    
                    value={item.positions}
                    
                    onChange={(e) => dispatch(addToCart(item.tour,Number(e.target.value)))}
                  >
                    {[...Array(item.people).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                         {x + 1}
                      </option>
                    ))}
                  </select>{" "}

                </div>
                <div>
                  <button className='icon-button' onClick={()=>removeFromCart(item.tour)}>
                    <i className='fas fa-trash '></i>
                  </button>
                </div>
                </div>
                          </div>
                      ))}
                  </div>  
                )}
            </div>
            <div>
              <div className='price-cart'>
                your total:  ${cartItems.reduce((acc,item)=>acc + item.positions*item.price,0).toFixed(2)}
              </div>
              <div className='cart-button-container'>
                <button className='cart-button' onClick={() => checkoutHandler()} disabled={cartItems.length === 0}> Proceed to checkout </button>
              </div>
            </div>
        </div>
     );
}
 
export default CartPage;