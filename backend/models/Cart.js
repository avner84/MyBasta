const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        cartProducts: { type: Array, required: true },
        totalAmount: { type: Number, required: true },
        totalPrice: { type: Number, required: true }
    }, { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema, "Carts")