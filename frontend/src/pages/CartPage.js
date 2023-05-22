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
          setShowSuccessAlert(true); // מציג את ההודעה כאשר התשלום בוצע בהצלחה
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