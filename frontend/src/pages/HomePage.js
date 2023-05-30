import './HomePage.css'
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productsActions';

import ProductItem from '../components/ProductItem';


/*
The HomePage component represents the home page of the application.

It uses the useDispatch hook from react-redux to dispatch the fetchProducts action, which fetches the list of products from the server and updates the state.

The useEffect hook is used to trigger the fetchProducts action when the component mounts.

The useSelector hook is used to access the products, productsStatus, and error properties from the Redux store.

- products: An array of product objects retrieved from the store.
- productsStatus: A string indicating the status of the products data (loading, success, or failed).
- error: An error message in case the products fetching failed.

Based on the productsStatus value, the component renders different content:

- If the productsStatus is 'loading', a loading message is displayed.
- If the productsStatus is 'failed', an error message is displayed.
- If the productsStatus is 'success', the products are rendered using the ProductItem component.

*/

function HomePage() { 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);  

  const products = useSelector((state) => state.products.products);
  const productsStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);


  
  if (productsStatus === 'loading') {
    return <div>Loading...</div>;
  } else if (productsStatus === 'failed') {
    return <div>{error}</div>;
  }else {
  

  return (
    <div className='homePage'>
      <h2 className='homePage_title'>מוצרים נבחרים</h2>

      <div className='homePage__products'>
      {products.map((product) => {
          return (
            <ProductItem key={product._id} product={product} />
          )

        })}
      </div>

    </div>
  )
}
}

export default HomePage

