import './SideDrawer.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LinkForGuest from './links/LinksForGuest'
import LinkForUser from './links/LinksForUser'

const SideDrawer = ({ show, click }) => {
  const { totalAmount } = useSelector((state) => state.cart);
  const user= useSelector((state)=>state.user.currentUser);

  const sideDrawerClass = ['sidedrawer'];

  if (show) {
    sideDrawerClass.push("show");
  }
  return <div className={sideDrawerClass.join(" ")}>

    <ul className='sidedrawer__links' onClick={click}>
      {!user && <LinkForGuest />}
      {user && <LinkForUser />}
      {user &&<li >
        <Link to='/cart'>
          <i className="fas fa-cart-shopping" />
          <span className='sidedrawer__cartbadge'>{totalAmount}</span>
        </Link>
      </li>}
    </ul>

  </div>;

}

export default SideDrawer

// The SideDrawer component is responsible for rendering a side drawer menu. It is used to replace the navbar on screens with a width of less than 600 pixels.

// The component retrieves the total amount of items in the cart from the cart state using the useSelector hook.
// It also retrieves the current user information from the user state.

// The sideDrawerClass array is used to dynamically determine the class name for styling the side drawer based on the show prop.
// If the show prop is true, the "show" class is added to the side drawer.

// The side drawer menu is rendered as an unordered list with the sidedrawer__links class.
// The click event is handled by the click prop, which is triggered when an item in the side drawer is clicked.

// If the user is not authenticated, the LinkForGuest component is rendered to display appropriate links for guests.
// If the user is authenticated, the LinkForUser component is rendered to display appropriate links for authenticated users.

// Additionally, if the user is authenticated, a link to the shopping cart is displayed with the total amount of items in the cart.