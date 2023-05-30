import StoreItem from '../components/StoreItem'
import './UserStorePage.css'
import { useState } from "react";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import DeleteProductModal from '../components/DeleteProductModal';

const UserStorePage = () => {
// Retrieve products and user information from the Redux store
  const products = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.user.currentUser);

  // Filter the products based on the current user as the seller
  const userProduct = products.filter(product => product.selerId === user._id);

  // State for controlling the display of the delete product modal
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [productIdForDelete, setProductIdForDelete] = useState("");

  return (
    showDeleteProductModal?
     // Render the delete product modal if showDeleteProductModal is true
    <DeleteProductModal setShowDeleteProductModal={setShowDeleteProductModal} setProductIdForDelete={setProductIdForDelete} productId={productIdForDelete} />
    :
    (<div className='userStorePage'>
      <h2>החנות שלי</h2>
      <div className='userStorePage__uploadBtnDiv'>
        <Link to='/product_upload'><button>הוספת מוצר</button></Link>

      </div>
      <div className='userStorePage__itemContainer'>
        {userProduct.map((product) => {
          return (
            <StoreItem key={product._id} product={product} setShowDeleteProductModal={setShowDeleteProductModal} setProductIdForDelete={setProductIdForDelete}/>
          )

        })}

        <div>

        </div>
      </div>
    </div>)
  )
}

export default UserStorePage
