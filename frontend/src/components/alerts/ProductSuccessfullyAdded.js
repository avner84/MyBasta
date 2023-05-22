import { Link } from 'react-router-dom';

const ProductSuccessfullyAdded = () => {
  return (
    <div className='form_container'>
    <div className='heading'>
        <h2>המוצר נוסף בהצלחה</h2>
    </div>
    <div className='success_warp'>
        <h3>ברכות! המוצר נוסף לחנות שלך בהצלחה</h3>
        <p>על מנת להוסיף מוצר נוסף ניתן ללחוץ <Link to='/product_upload'>כאן</Link></p>
        <p>על מנת לחזור לחנות שלך יש ללחוץ <Link to='/user_store'>כאן</Link></p>                                
    </div>
</div>
  )
}

export default ProductSuccessfullyAdded