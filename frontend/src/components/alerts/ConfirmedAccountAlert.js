import { Link } from 'react-router-dom';

const ConfirmedAccountAlert = () => {
    return (
        <div className='form_container'>
            <div className='heading'>
                <h2>חשבונך אומת</h2>
            </div>
            <div className='success_warp'>
                <h3>ברכות! חשבונך אומת והופעל בהצלחה</h3>
                <p>על מנת להתחבר לאתר יש ללחוץ על הקישור <Link to='/signin'>הזה</Link></p>                
            </div>
        </div>
    )
}

export default ConfirmedAccountAlert