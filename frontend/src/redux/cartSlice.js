import { createSlice } from "@reduxjs/toolkit";
import UpdateCartInDB from '../api/UpdateCartInDB';

const initialState = {
    cartProducts: [],
    totalAmount: 0,
    totalPrice: 0,
    userId: null,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {

            state.userId = action.payload.userId;

            const product = action.payload.product;
            const quantity = action.payload.quantity;


            const existingProduct = state.cartProducts.find(
                (p) => p._id === product._id
            );
            if (existingProduct) {
                existingProduct.amount += quantity;

            } else {
                const newProduct = { ...product, amount: quantity };

                state.cartProducts.push(newProduct);
            }

            //=====
            let amount = 0;
            let total = 0;
            state.cartProducts.forEach((product) => {
                amount += product.amount;
                total += product.amount * product.price;
            });
            state.totalAmount = amount;
            state.totalPrice = total;

            const userId = state.userId;
            const totalAmount = state.totalAmount;
            const totalPrice = state.totalPrice;
            const cartProducts = { ...state.cartProducts }
            console.log('cartProducts (UpdateCartInDB) :', cartProducts);
            UpdateCartInDB({ cartProducts, userId, totalAmount, totalPrice });

        },
        updateProductAmount: (state, action) => {
            const product = action.payload.product;
            const quantity = action.payload.quantity;

            const existingProduct = state.cartProducts.find(
                (p) => p._id === product._id
            );

            if (existingProduct) {
                existingProduct.amount = quantity;
                let amount = 0;
                let total = 0;
                state.cartProducts.forEach((product) => {
                    amount += product.amount;
                    total += product.amount * product.price;
                });
                state.totalAmount = amount;
                state.totalPrice = total;

            }

            const userId = state.userId;
            const totalAmount = state.totalAmount;
            const totalPrice = state.totalPrice;
            const cartProducts = { ...state.cartProducts }
            UpdateCartInDB({ cartProducts, userId, totalAmount, totalPrice });
        },
        removeProduct: (state, action) => {
            const productId = action.payload;
            state.cartProducts = state.cartProducts.filter(product => product._id !== productId);
            if (state.cartProducts.length > 0) {
                let amount = 0;
                let total = 0;
                state.cartProducts.forEach((product) => {
                    amount += product.amount;
                    total += product.amount * product.price;
                });
                state.totalAmount = amount;
                state.totalPrice = total;
            }

            else {
                state.totalAmount = 0;
                state.totalPrice = 0;
            }
            const userId = state.userId;
            const totalAmount = state.totalAmount;
            const totalPrice = state.totalPrice;
            const cartProducts = { ...state.cartProducts }
            UpdateCartInDB({ cartProducts, userId, totalAmount, totalPrice });
        },
        setCartProducts: (state, action) => {
            state.userId = action.payload.userId;
            state.totalAmount = action.payload.totalAmount;
            state.totalPrice = action.payload.totalPrice;
            state.cartProducts = action.payload.cartProducts;

           
        },
        emptyCart: (state) => {
            state.cartProducts = [];
            state.totalAmount = 0;
            state.totalPrice = 0;
           

            const userId = state.userId;
            const totalAmount = state.totalAmount;
            const totalPrice = state.totalPrice;
            const cartProducts = { ...state.cartProducts }
            UpdateCartInDB({ cartProducts, userId, totalAmount, totalPrice });
        }

    }
})


export const { addProduct, updateProductAmount, removeProduct, setCartProducts, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;


