import { createSlice } from "@reduxjs/toolkit";

import UpdateOrderInDB from '../api/UpdateOrdersInDB';


const initialState = {
  orders: [],
  userId: null,
  isDataLoaded: false // isDataLoaded variable is used to track whether the necessary data has been loaded or not. In some cases,  might have data that needs to be fetched or loaded asynchronously before it can be used in application.
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      // Update the userId from the action payload
      state.userId = action.payload.userId;

      const order = action.payload.order;
      // Add the new order to the existing orders array
      state.orders = state.orders.concat(order);

      // Call the API to update the orders in the database
      const userId = state.userId;
      const orders = state.orders;
      UpdateOrderInDB({ userId, orders })

    },
    setOrders: (state, action) => {
      // Update the userId and orders from the action payload
      state.userId = action.payload.userId;
      state.orders = action.payload.orders;
    },
    setIsDataLoaded: (state) => {
      state.isDataLoaded = true; // Set isDataLoaded to true when the data is loaded
    },
    resetIsDataLoaded: (state) => {
      state.isDataLoaded = false; // Reset isDataLoaded to false when the data needs to be reloaded
    },
  }
})

export const { addOrder, setOrders, setIsDataLoaded, resetIsDataLoaded } = ordersSlice.actions;

export default ordersSlice.reducer;