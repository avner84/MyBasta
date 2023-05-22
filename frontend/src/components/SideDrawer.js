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