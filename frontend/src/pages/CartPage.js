import './CartPage.css'
import { useSelector } from 'react-redux';
import React, { useState } from 'react';

import CartItem from '../components/CartItem'
import axios from '../api/axios';
import {getCookie} from '../api/CookiesMethodes'

const PAY_URL = '/api/order/pay';

function CartPage() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const { cartProducts, totalAmount, totalPrice } = useSelector((state) => state.cart);
  
  const hundlePayBtn = () => {
    const loginVerificationToken = getCookie("loginVerification");

    if(loginVerificationToken){
    axios.post(PAY_URL, { cartProducts, totalAmount, totalPrice },
      {
        headers: {
          Authorization: `Bearer ${loginVerificationToken}`
        }
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setShowSuccessAlert(true); 
          window.location = res.data.forwardLink;
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
    
  }



  return (
    <div className='cartPage'>

{showSuccessAlert && (       
          <p>תודה רבה על רכישתך.</p>
      )}


  <div className='cartPage__right'>
    <h2>עגלת קניות</h2>
    {cartProducts.length > 0 ?
      cartProducts.map((product) => {
        return (
          <CartItem key={product._id} product={product} />)
      })
      :
      <h3>עגלת הקניות שלך ריקה</h3>
    }
  </div>

  {cartProducts.length > 0 &&
    <div className='cartPage__left'>
      <div className='cartPage__info'>
        <p>סך הכל {totalAmount} מוצרים</p>
        <p>{totalPrice} ש"ח</p>
      </div>
      <div>
        <button onClick={hundlePayBtn}>מעבר לתשלום</button>
      </div>
    </div>
  }
</div>
  )
}

export default CartPage


// The CartPage component represents the shopping cart page.

// It retrieves the cartProducts, totalAmount, and totalPrice from the Redux store using the useSelector hook.

// The component manages the state of showSuccessAlert, which controls whether to display a success message after successful payment.

// When the user clicks the "מעבר לתשלום" (Proceed to Payment) button, the handlePayBtn function is called. It sends a POST request to the PAY_URL endpoint, including the cartProducts, totalAmount, and totalPrice in the request payload. The request is authenticated by adding the loginVerificationToken to the request headers.

// If the payment request is successful (status code 200), the success message is displayed, and the user is redirected to the forwardLink received in the response.

// If the cart is empty, a message indicating that the cart is empty is shown.