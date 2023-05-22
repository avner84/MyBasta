import { Link } from 'react-router-dom';

const LinkForGuest = () => {
    return (
        <>
            <li>
                <Link to='/register'>הירשם</Link>
            </li>
            <li className='signinLink'>
                <Link to='/signin'>התחבר</Link>
            </li>
        </>
    )
}

export default LinkForGuest