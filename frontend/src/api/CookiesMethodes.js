
import axios from "./axios"
import { useSelector, useDispatch } from 'react-redux';

import { loginSuccess, logout } from '../redux/userSlice';
import { setCartProducts } from '../redux/cartSlice'
import {setOrders} from '../redux/ordersSlice'

import { FetchCartFromDB } from '../api/FetchCartFromDB'

import {FetchOrdersFromDB} from '../api/FetchOrdersFromDB'



const LOGIN_BY_TOKEN_URL = '/api/auth/login_by_token';

export async function SigninUserByToken() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    if (!user) {
        const loginVerificationToken = getCookie("loginVerification");
        if (loginVerificationToken) {
            try {
                const response = await axios.get(LOGIN_BY_TOKEN_URL, {
                    headers: {
                        Authorization: `Bearer ${loginVerificationToken}` // מוסיף את הטוקן לכותרת Authorization
                    },
                    withCredentials: true
                });
                dispatch(loginSuccess(response?.data));
                console.log("response.data from SigninUserByToken: ",response.data);
                const user = response.data;
                console.log('userID :', user._id);
                const cartForReduxStore = await FetchCartFromDB(user._id);
                dispatch(setCartProducts(cartForReduxStore));
                const ordersForReduxStore = await FetchOrdersFromDB(user._id);
                dispatch(setOrders(ordersForReduxStore));
            } catch (error) {
                console.log(error);
                //If the token is not valid, the system disconnects
                dispatch(logout);
            }
        }
    }
}

export function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
}