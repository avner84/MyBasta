const Cart = require("../models/Cart");

const updateCartInDB = async (cartProducts, userId, totalAmount, totalPrice) => {
  try {
    const existingCart = await Cart.findOne({ userId });

    if (!existingCart) {
      const newCart = await Cart.create({
        cartProducts,
        userId,
        totalAmount,
        totalPrice,
      });

      return newCart;
    }

    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { cartProducts, totalAmount, totalPrice },
      { new: true }
    );

    return updatedCart;
  } catch (error) {
    throw new Error(error.message || "שגיאת שרת פנימית");
  }
};




const fetchCart = async (userId) => {
  try {
    const existingCart = await Cart.findOne({ userId });

    let cart = {};

    if (existingCart) {
      //For some reason, the database stores the shopping cart as an object with numeric keys instead of an array of objects, so to get back to normal the next loop turns the shopping cart back into an array:
      let arr = [];
      for (let key in existingCart.cartProducts[0]) {
        arr[key] = existingCart.cartProducts[0][key];
      }

      cart = {
        cartProducts: arr,
        userId: existingCart.userId,
        totalAmount: existingCart.totalAmount,
        totalPrice: existingCart.totalPrice,
      };
    } else {
      cart = {
        cartProducts: [],
        userId: userId,
        totalAmount: 0,
        totalPrice: 0,
      };
    }

    return cart;
  } catch (error) {
    console.error(error);
    throw new Error("Server Error");
  }
};

module.exports = {
  updateCartInDB, fetchCart
};