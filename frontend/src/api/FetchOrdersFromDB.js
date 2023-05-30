import axios from "./axios"

const FETCH_ORDERS_URL = '/api/order/fetchOrdersFromDB?userId=';

// Function to fetch orders data from the server and return it for Redux store
export function FetchOrdersFromDB(userId) {
    const ordersForReduxStore = axios.get(FETCH_ORDERS_URL + userId)
        .then(response => {
            // If successful response, extract the orders data
            const ordersForReduxStore = response.data;
            console.log('ordersForReduxStore :', ordersForReduxStore);
            return ordersForReduxStore;
        })
        .catch(error => {
            console.log(error);
            // If error, return default orders data
            return {
                orders: [],
                userId: userId,
            };
        });
    return ordersForReduxStore;
}
