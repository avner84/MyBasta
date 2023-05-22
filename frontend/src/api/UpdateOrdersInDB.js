import axios from './axios';
import {getCookie} from '../api/CookiesMethodes'

const UPDATE_ORDERS_IN_DB_URL = 'api/order/updateOrderInDB';


const UpdateOrderInDB = async (orderDetails) => {
    const loginVerificationToken = getCookie("loginVerification");
        if (loginVerificationToken) {

    try {
        const response = await axios.post(UPDATE_ORDERS_IN_DB_URL,
            JSON.stringify(orderDetails),
            {
                headers: {
                    'Content-Type': 'application/json',
                   ' Authorization': `Bearer ${loginVerificationToken}`
                },
                withCredentials: true
            }
        );
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}
 
}


export default UpdateOrderInDB