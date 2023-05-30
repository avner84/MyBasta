import axios from './axios';
import { getCookie } from '../api/CookiesMethodes';

const UPDATE_ORDERS_IN_DB_URL = 'api/order/updateOrderInDB';

// Function for updating the order in the database
const UpdateOrderInDB = async (orderDetails) => {
    // Retrieve the login verification token from the cookie
    const loginVerificationToken = getCookie("loginVerification");
    if (loginVerificationToken) {
        try {
            // Make a POST request to update the order in the database
            const response = await axios.post(
                UPDATE_ORDERS_IN_DB_URL,
                JSON.stringify(orderDetails),
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

export default UpdateOrderInDB;
