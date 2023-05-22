import './Navbar.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {SigninUserByToken} from '../api/CookiesMethodes'

import Logo from '../logo/logo.png';

import LinkForGuest from './links/LinksForGuest'
import LinkForUser from './links/LinksForUser'


const Navbar = ({ click }) => {
    const {totalAmount} = useSelector((state)=>state.cart);
    const user= useSelector((state)=>state.user.currentUser);
    
    //The function checks if a valid token is saved and if so it connects the user automatically:
    SigninUserByToken();

    return (
        <nav className='navbar'>

            <div className='navbae_right_erea'>
                <div className='navbar_logo'>
                    <Link to='/'><img src={Logo} alt='logo' /></Link>
                </div>
            </div>
            <div className='navbae_left_erea'>
                <ul className='navbar_links'>
                    {!user&&<LinkForGuest />}
                    {user&&<LinkForUser/>}
                    {user&& <li className='cart_link_li'>
                        <Link className='cart_link' to='/cart'>
                            <i className="fas fa-cart-shopping" />
                            <span className='cartLogo_badget'>{totalAmount}</span>
                        </Link>
                    </li>}
                </ul>

                <div className='hamburger_menu' onClick={click}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>



        </nav>
    )
}

export default Navbar