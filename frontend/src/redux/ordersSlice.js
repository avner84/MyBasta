import { createSlice } from "@reduxjs/toolkit";

import UpdateOrderInDB from '../api/UpdateOrdersInDB';

const initialState = {
orders: [],
userId: null,
}

const ordersSlice = createSlice({
name: 'orders',
initialState,
reducers: {
addOrder: (state, action) => {
state.userId = action.payload.userId;
const order = action.payload.order;
state.orders = state.orders.concat(order);
// state.orders.push(...order)

const userId = state.userId;
const orders = state.orders;
UpdateOrderInDB({userId, orders})

},
setOrders: (state, action) => {
state.userId = action.payload.userId;
state.orders = action.payload.orders;
},
}
})

export const { addOrder, setOrders } = ordersSlice.actions;

export default ordersSlice.reducer;