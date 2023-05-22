import './Product.css'
import { Link } from 'react-router-dom';

const Product = () => {
  return (
    <div className='product'>
        <Link to={`/product/${1234}`}>
        <img src="https://market.marmelada.co.il/images/detailed/6175/PHOTO-2021-08-01-17-29-55__3_.jpg?source_page=products.view" alt='product name'/>
        <div className='product__info'>
            <p className='info__name'> מוצר 1</p>
            <p className='info__desription'> Lorem d;dm km,mkdmkdsk kc k slms ksoms ksmoms scmkl dm sd l sk slpomklds m sodmcl 
            </p>
            <p className='info__price'>120 ש"ח</p>
        </div>
        </Link>
    </div>
  )
}

export default Product