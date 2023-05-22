import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './cartSlice';
import authReducer from './authSlice'
import userReducer from './userSlice'
import productReducer from './productsSlice'
import orderReducer from './ordersSlice'

export const store = configureStore({
    reducer:{
        cart:cartReducer,
        auth: authReducer,
        user: userReducer,
        products: productReducer,
        orders: orderReducer
    },
});