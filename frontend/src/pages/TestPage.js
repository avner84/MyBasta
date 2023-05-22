import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../components/ProductItem';
import { fetchProducts } from '../redux/productsActions';

const TestPage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const productsStatus = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);
  
    useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);
  
    if (productsStatus === 'loading') {
      return <div>Loading...</div>;
    } else if (productsStatus === 'failed') {
      return <div>{error}</div>;
    } else {
      return (
        <div>
          <h1>Products:</h1>
          <ul>
            {products.map((product) => (
              <ProductItem key={product.productId} product={product} />
            ))}
          </ul>
        </div>
      );
    }
}

export default TestPage