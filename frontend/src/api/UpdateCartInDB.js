// import { useSelector } from 'react-redux';
import axios from './axios';
import { getCookie } from '../api/CookiesMethodes';

const UPDATE_CART_IN_DB_URL = 'api/cart/updateCartInDB';

// Function for updating the cart in the database
const UpdateCartInDB = async (cart) => {
    // Retrieve the login verification token from the cookie
    const loginVerificationToken = getCookie("loginVerification");
    if (loginVerificationToken) {
        try {
            // Make a POST request to update the cart in the database
            const response = await axios.post(
                UPDATE_CART_IN_DB_URL,
                JSON.stringify(cart),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${loginVerificationToken}`
                    },
                    withCredentials: true
                }
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
};

export default UpdateCartInDB;
