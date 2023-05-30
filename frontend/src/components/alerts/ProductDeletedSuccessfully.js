import { Link } from 'react-router-dom';

// Component for displaying the product deletion success message
const ProductDeletedSuccessfully = () => {
  return (
    <div className="wrapper">
    <div className='form_container'>
        <div className='account_delete_div'> 
        <p>המוצר נמחק בהצלחה.</p>
        <p>על מנת לחזור לחנות שלך יש ללחוץ <Link to='/user_store'>כאן</Link></p>                                
        
        </div>
        
    </div>
</div>
  )
}

export default ProductDeletedSuccessfully