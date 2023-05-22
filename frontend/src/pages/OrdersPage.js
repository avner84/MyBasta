import React from 'react'
import { useSelector} from 'react-redux';


import OrderItem from '../components/OrderItem'

const OrdersPage = () => {
  
    const { orders } = useSelector((state) => state.orders);
   
          
      return (
                 <div className='cartPage'>
            <div>
              {orders.length > 0 ? (
                <>
                  <h2>ההזמנות שלי</h2>
                  {orders.map((product) => (
                    <OrderItem key={product._id} product={product} />
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