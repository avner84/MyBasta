import axios from "./axios"

const FETCH_CART_URL = '/api/cart/fetchCartFromDB?userId=';

export function FetchCartFromDB(userId) {

    const cartForReduxStore = axios.get(FETCH_CART_URL + userId)
        .then(response => {
            const cartForReduxStore = response.data;
            console.log('cartForReduxStore :', cartForReduxStore);
            return cartForReduxStore
        })
        .catch(error => {
            console.log(error);
            return {
                cartProducts: [],
                userId: userId,
                totalAmount: 0,
                totalPrice: 0,
            }
        })
    return cartForReduxStore;
}