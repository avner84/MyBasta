const mongoose = require("mongoose");

// Define the Order schema
const OrderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true }, // User ID associated with the orders
        orders: [], // Array to store the order details
    },
    { timestamps: true } // Add timestamps for createdAt and updatedAt fields
);

// Export the Order model
module.exports = mongoose.model("Orders", OrderSchema);
