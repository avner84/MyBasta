import { Link } from 'react-router-dom';

const ProductEditedSuccessfully = () => {
  return (
    <div className='form_container'>
    <div className='heading'>
        <h2>המוצר עודכן בהצלחה</h2>
    </div>
    <div className='success_warp'>
        <h3>ברכות! עדכון פרטי המוצר בוצעו בהצלחה</h3>        
        <p>על מנת לחזור לחנות שלך יש ללחוץ <Link to='/user_store'>כאן</Link></p>                                
    </div>
</div>
  )
}

export default ProductEditedSuccessfully