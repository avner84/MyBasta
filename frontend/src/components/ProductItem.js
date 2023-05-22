import './ProductItem.css'
import { Link } from 'react-router-dom';

const ProductItem = (props) => {

    const product = props.product;

  return (
    <div className='product'>
        <Link to={`/product/${product._id}`}>
        <img className='imgProduct' src={product.imgUrl} alt={product.title} />
        <div className='product__info'>
            <p className='info__name'> {product.title}</p>
            <p className='info__desription'> 
            {product.description}
            </p>
            <p className='info__price'>{product.price} ש"ח</p>
        </div>
        </Link>
    </div>
  )
}

export default ProductItem