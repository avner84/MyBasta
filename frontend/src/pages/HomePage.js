import './HomePage.css'
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productsActions';

import ProductItem from '../components/ProductItem';


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