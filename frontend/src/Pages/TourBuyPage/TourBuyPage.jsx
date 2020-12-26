import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {savePaymentData} from '../../actions/cartActions'
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps'
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
      <h1>Fill in your information</h1>
      <CheckoutSteps step1 step2/>
      <form onSubmit={onFormSubmit}>
        <div className="address-container-login">
          <label>Address: </label>
          <input
            type="text"
            placeholder="your address..."
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="city-container-login">
          <label>City: </label>
          <input
            type="text"
            placeholder="city..."
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="pcode-container-login">
          <label>Postal Code: </label>
          <input
            type="text"
            placeholder="postal code..."
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>

        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default TourBuyScreen;
