import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../actions/cartActions";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import "./PaymentScreen.css";
const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { paymentData } = cart;

  if (!paymentData) {
    history.push("/tourbuy");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/finalize");
  };

  return (
    <div>
      <CheckoutSteps step3 />
      <h1 className="payment-screen-title">Choose Payment Method</h1>
      <form onSubmit={onFormSubmit}>
        <div className="payment-screen-method">
         <label htmlFor="">PayPal</label>
          <input
            type="radio"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>
        <div className='payment-screen-button-container'>
          <button type="submit"> Continue </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentScreen;
