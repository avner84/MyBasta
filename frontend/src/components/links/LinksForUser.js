import { useDispatch } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/userSlice';
//import { emptyCart } from '../../redux/cartSlice';


const LinkForUser = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    //dispatch(emptyCart())
    //During disconnection, an authenticated user cookie is deleted:
    document.cookie = "loginVerification=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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