import './CartItem.css'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import SelectAmount from './SelectAmount'
import { updateProductAmount, removeProduct } from '../redux/cartSlice';


const CartItem = (props) => {
    const {product} = props;
    const dispatch = useDispatch();

    const handleSelect = (selectedValue) => {
        dispatch(updateProductAmount({product, quantity:selectedValue})); 
      };

      const handleRemoveProduct=()=>{
        dispatch(removeProduct(product._id))
      }
      
    return (
        <div className='cartItem'>
            <div className='cartItem__image'>
                <img src={product.imgUrl} alt={product.title} />
            </div>
            <Link to={`/product/${product._id}`} className="cartItem__name">
                <p>{product.title}</p>
            </Link>

            <p className='cartItem__price'>{product.price} ש"ח</p>

            <SelectAmount productAmount={product.amount} onSelect={handleSelect}  />

            <button className='cartItem__deleteBtn' onClick={handleRemoveProduct}>
                <i className='fas fa-trash'></i>
            </button>
        </div>
    )
}

export default CartItem