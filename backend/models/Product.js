const mongoose = require("mongoose");

// Define the Product schema
const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true }, // Title of the product
        description: { type: String, required: true }, // Description of the product
        imgUrl: { type: String, required: true }, // URL of the product image
        price: { type: Number, required: true }, // Price of the product
        category: { type: String }, // Category of the product
        selerId: { type: String, required: true }, // Seller ID associated with the product
        quantity: { type: Number, required: true }, // Quantity of the product
        isDummy: { type: Boolean, default: false }, // Flag indicating if the product is a dummy product
        isDeleted: { type: Boolean, default: false }, // Flag indicating if the product is deleted
    },
    { timestamps: true } // Add timestamps for createdAt and updatedAt fields
);

// Export the Product model
module.exports = mongoose.model("Product", ProductSchema, "Products");
