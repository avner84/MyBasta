
import axios from "./axios"
import { useSelector, useDispatch } from 'react-redux';

import { loginSuccess, logout } from '../redux/userSlice';
import { setCartProducts } from '../redux/cartSlice'
import { setOrders, setIsDataLoaded, resetIsDataLoaded } from '../redux/ordersSlice'

import { FetchCartFromDB } from '../api/FetchCartFromDB'

import { FetchOrdersFromDB } from '../api/FetchOrdersFromDB'



const LOGIN_BY_TOKEN_URL = '/api/auth/login_by_token';

// Function to sign in user using a token
export async function SigninUserByToken() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    
    // Check if user is not already logged in
    if (!user) {
        const loginVerificationToken = getCookie("loginVerification");

        // If token exists, make a request to login by token
        if (loginVerificationToken) {
            try {
                const response = await axios.get(LOGIN_BY_TOKEN_URL, {
                    headers: {
                        Authorization: `Bearer ${loginVerificationToken}`
                    },
                    withCredentials: true
                });

                // Dispatch login success action with the response data
                dispatch(loginSuccess(response?.data));
                console.log("response.data from SigninUserByToken: ", response.data);

                // Reset the isDataLoaded flag
                dispatch(resetIsDataLoaded());

                // Fetch cart products and update the cart slice in Redux store
                const user = response.data;
                console.log('userID :', user._id);
                const cartForReduxStore = await FetchCartFromDB(user._id);
                dispatch(setCartProducts(cartForReduxStore));

                // Fetch user orders and update the orders slice in Redux store
                const ordersForReduxStore = await FetchOrdersFromDB(user._id);
                dispatch(setOrders(ordersForReduxStore));

                // Set the isDataLoaded flag to true
                dispatch(setIsDataLoaded());
                /*Explanation: The dispatch(setIsDataLoaded()) action is dispatched to indicate that the data has been loaded successfully.
                This helps solve any issues that may arise during the order update process in the PaymentSuccessfulPage.js file.
                By setting isDataLoaded to true, it ensures that the necessary data is available before updating the orders and clearing the cart.*/
                
            } catch (error) {
                console.log(error);

                // If the token is not valid, log the user out
                dispatch(logout);
            }
        }
    }
}

// Function to get cookie value by name
export function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
}