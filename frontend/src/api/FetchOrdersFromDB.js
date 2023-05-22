import axios from "./axios"

const FETCH_ORDERS_URL = '/api/order/fetchOrdersFromDB?userId=';

export function FetchOrdersFromDB(userId) {

    const ordersForReduxStore = axios.get(FETCH_ORDERS_URL + userId)
        .then(response => {
            const ordersForReduxStore = response.data;
            console.log('ordersForReduxStore :', ordersForReduxStore);
            return ordersForReduxStore
        })
        .catch(error => {
            console.log(error);
            return {
                orders: [],
                userId: userId,
            }
        })
    return ordersForReduxStore;
}