import './StoreItem.css'
import { Link } from 'react-router-dom';
const StoreItem = ({product, setShowDeleteProductModal, setProductIdForDelete}) => {

          
    const handleDelete =()=>{
        setShowDeleteProductModal(true)
        setProductIdForDelete(product._id)
    }

    return (
        <div className='storeItem'>
            <div className='storeItem__image'>
                <img src={product.imgUrl} alt={product.title}/>
            </div>
            <div className='storeItem__name'>
                <h3>שם המוצר:</h3>
                <p>{product.title}</p>
            </div>

            <div className='storeItem__price'>
                <h3>מחיר:</h3>
                <p>{product.price} ש"ח</p>
            </div>
            <div className='storeItem__category'>
                <h3>קטגוריה:</h3>
                <p>{product.category}</p>
            </div>
            <div className='storeItem__description'>
                <h3>תיאור המוצר:</h3>
                <p>{product.description}</p>
            </div>

            <div className='storeItem__btns'>
            <Link to={`/product_editing/${product._id}`}>              
                <button className='storeItem__editBtn'>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
                </Link>
                <button className='storeItem__deleteBtn' onClick={handleDelete}>
                    <i className="fa fa-trash" ></i>
                </button>
            </div>


        </div>
    )
}

export default StoreItem