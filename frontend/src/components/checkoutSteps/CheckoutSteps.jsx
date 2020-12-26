import React from "react";
import { Link } from "react-router-dom";
import './CheckoutSteps.css'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div  className='process-link-container'>
      <div>
        {step1 ? (
          <Link to="/login" className='cart-active-link'>Sign In</Link>
        ) : (
          <Link disabled className='disable-link' >
            Sign In
          </Link>
        )}
      </div>
      <div>
        {step2 ? (
          <Link to="/tourbuy" className='cart-active-link'>Payment Data</Link>
        ) : (
          <Link disabled  className='disable-link' >
            Payment Data
          </Link>
        )}
      </div>
      <div>
        {step3 ? (
          <Link to="/payment" className='cart-active-link'>Payment</Link>
        ) : (
          <Link disabled  className='disable-link'>Payment</Link>
        )}
      </div>
      <div>
        {step4 ? (
          <Link to="/finalize" className='cart-active-link'>Finalize</Link>
        ) : (
          <Link disabled  className='disable-link'>
            Finalize
          </Link>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
