import { Link } from 'react-router-dom';

const UserNotLoggedIn = () => {
    return (
        <div className='form_container'>
            <div className='heading'>
                <h2>משתמש לא מחובר</h2>
            </div>
            <div className='success_warp'>
                <p>על מנת להוסיף מוצרים לעגלה יש להתחבר למערכת.</p>
                <p>ניתן להתחבר על ידי לחיצה על  <Link to='/signin'>הקישור הזה</Link>. אם אינך רשום ניתן להירשם <Link to='/register'>כאן</Link>.</p>
            </div>
        </div>
    )
}

export default UserNotLoggedIn