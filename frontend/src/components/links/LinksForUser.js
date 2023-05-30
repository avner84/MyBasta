import { useDispatch } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/userSlice';


const LinkForUser = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    
    //During disconnection, an authenticated user cookie is deleted:
    document.cookie = "loginVerification=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Navigating back to the home page after logout
    navigate("/");
  };
  return (
    <>
      <li>
        <Link to='/user_store'>החנות שלי</Link>
      </li>
      <li>
        <Link to='/my_order'>ההזמנות שלי</Link>
      </li>
      <li>
        <Link to='/edit_details'>הפרטים שלי</Link>
      </li>
      <li>
        <p onClick={logoutHandler}>התנתקות</p>
      </li>
      
    </>
  )
}

export default LinkForUser