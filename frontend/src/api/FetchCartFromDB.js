import axios from "./axios"

const FETCH_CART_URL = '/api/cart/fetchCartFromDB?userId=';

// Function to fetch cart data from the server and return it for Redux store
export function FetchCartFromDB(userId) {
    const cartForReduxStore = axios.get(FETCH_CART_URL + userId)
        .then(response => {
            // If successful response, extract the cart data
            const cartForReduxStore = response.data;
            console.log('cartForReduxStore :', cartForReduxStore);
            return cartForReduxStore;
        })
        .catch(error => {
            console.log(error);
            // If error, return default cart data
            return {
                cartProducts: [],
                userId: userId,
                totalAmount: 0,
                totalPrice: 0,
            };
        });
    return cartForReduxStore;
}
