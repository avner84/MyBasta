import React from 'react'
import { useSelector } from 'react-redux';
import OrderItem from '../components/OrderItem'

// The OrdersPage component displays the user's orders.
// It retrieves the orders data from the Redux store using the useSelector hook.
// If there are orders available, it renders a list of OrderItem components, each representing an individual order.
// If there are no orders available, it displays a message indicating that no orders have been made yet,
// and encourages the user to make purchases on the website.

const OrdersPage = () => {

  const { orders } = useSelector((state) => state.orders);


  return (
    <div className='cartPage'>
      <div>
        {orders.length > 0 ? (
          <>
            <h2>ההזמנות שלי</h2>
            {orders.map((product, index) => (
              <OrderItem key={`${product._id}-${index}`} product={product} />
            ))}
          </>
        ) : (
          <>
            <h2>עד כה לא בוצעו הזמנות</h2>
            <p>לאחר ביצוע רכישות באתר, פרטי ההזמנות יופיעו בדף זה</p>
          </>
        )}
      </div>
    </div>

  );
}

export default OrdersPage