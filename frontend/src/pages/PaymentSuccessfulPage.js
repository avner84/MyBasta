import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addOrder } from '../redux/ordersSlice';
import { emptyCart } from '../redux/cartSlice';

const PaymentSuccessfulPage = () => {
  const { cartProducts } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const handleUpdateOrder = useCallback(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const formattedDate = `${year}-${month}-${day}, שעה ${hours}:${minutes}`;

    const order = cartProducts.map((product) => {
      return {
        ...product,
        date: formattedDate,
      };
    });

    dispatch(addOrder({ order, userId: user._id }));
    dispatch(emptyCart());
  }, [cartProducts, user, dispatch]);

  useEffect(() => {
    
    const isFromPaypal = window.location.pathname === '/success';

    if (isFromPaypal) {
      if (cartProducts && user && orders && cartProducts.length > 0 && orders.length > 0) {
        handleUpdateOrder();
      }
    }
    else {
      // Redirect to home page if not coming from the server
      window.location.href = 'http://localhost:3000/';
    }

  }, [cartProducts, user, orders, handleUpdateOrder]);

  return (
    <div className="wrapper">
      <div className="form_container">
        <h2>הזמנתך נקלטה בהצלחה</h2>
        <p>לצפייה בדף ההזמנות <Link to='/my_order'>לחץ כאן</Link></p>
      </div>
    </div>
  );
};

export default PaymentSuccessfulPage;