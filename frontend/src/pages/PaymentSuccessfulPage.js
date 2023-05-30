import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addOrder } from '../redux/ordersSlice';
import { emptyCart } from '../redux/cartSlice';

const PaymentSuccessfulPage = () => {
  const { orders } = useSelector((state) => state.orders);
  const isDataLoaded = useSelector((state) => state.orders.isDataLoaded);
  const { cartProducts } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  
  const dispatch = useDispatch();

  // handleUpdateOrder function is responsible for updating the order details
  // and emptying the cart after a successful payment.
  const handleUpdateOrder = useCallback(() => {
    // Get the current date and time
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
 
    // Format the date and time
    const formattedDate = `${year}-${month}-${day}, שעה ${hours}:${minutes}`;

    // Create an updated order object for each product in the cart
    const order = cartProducts.map((product) => {
      return {
        ...product,
        date: formattedDate,
      };
    });

    // Dispatch the addOrder action to update the orders state
    dispatch(addOrder({ order, userId: user._id }));

    // Dispatch the emptyCart action to clear the cart
    dispatch(emptyCart());
  }, [cartProducts, user, dispatch]);

  useEffect(() => {
    // Check if the user is redirected from the PayPal success page
    const isFromPaypal = window.location.pathname === '/success';

    if (isFromPaypal) {
      // Check if the required data is available to update the order
      if (cartProducts && user && orders && cartProducts.length > 0 && isDataLoaded) {
        handleUpdateOrder();
      }
    } else {
      // Redirect to the home page if not redirected from the designated success page
      // Replace 'http://localhost:3000/' with the appropriate URL for the home page
      window.location.href = 'http://localhost:3000/';
    }
  }, [cartProducts, user, orders, isDataLoaded, handleUpdateOrder]);

  return (
    <div className="wrapper">
      <div className="form_container">
        <h2>הזמנתך נקלטה בהצלחה</h2>
        <p>לצפייה בדף ההזמנות <Link to="/my_order">לחץ כאן</Link></p>
      </div>
    </div>
  );
};

export default PaymentSuccessfulPage;
