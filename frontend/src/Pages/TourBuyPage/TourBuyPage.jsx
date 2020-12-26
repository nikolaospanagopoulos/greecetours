import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {savePaymentData} from '../../actions/cartActions'
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps'
import './TourBuyPage.css'

const TourBuyScreen = ({ history }) => {

    const dispatch = useDispatch()


    const cart = useSelector(state => state.cart)
    const {paymentData} = cart




  const [address, setAddress] = useState(paymentData.address); 
  const [city, setCity] = useState(paymentData.city);
  const [postalCode, setPostalCode] = useState(paymentData.country);

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentData({address,city,postalCode}))
    history.push('/payment')
  };

  return (
    <div>
      
      <CheckoutSteps step1 step2/>
      <h1 className='payment-data-title'>Fill in your information</h1>
      <form onSubmit={onFormSubmit}>
      
        <div className='pay-data-container'>

        
        <div className="address-container-pay">
          <label>Address: </label>
          <input
            type="text"
            placeholder="your address..."
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            className='address'
          />
        </div>

        <div className="city-container">
          <label>City: </label>
          <input
            type="text"
            placeholder="city..."
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="pcode-container">
          <label>Postal Code: </label>
          <input
            type="text"
            placeholder="postal code..."
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div className='payment-data-submit-button-container'>
        <button type="submit" className='submit-payment-data'> Submit </button>
        </div>
       
        </div>
      </form>
    
    </div>
  );
};

export default TourBuyScreen;
