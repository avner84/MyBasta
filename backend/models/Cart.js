const mongoose = require("mongoose");

// Define the Cart schema
const CartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true }, // User ID associated with the cart
        cartProducts: { type: Array, required: true }, // Array of cart products
        totalAmount: { type: Number, required: true }, // Total quantity of products in the cart
        totalPrice: { type: Number, required: true } // Total price of all products in the cart
    },
    { timestamps: true } // Add timestamps for createdAt and updatedAt fields
);

// Export the Cart model
module.exports = mongoose.model("Cart", CartSchema, "Carts");
