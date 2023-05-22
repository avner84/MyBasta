const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {

        title: { type: String, required: true },
        description: { type: String, required: true },
        imgUrl: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String },
        selerId: { type: String, required: true },
        quantity: { type: Number, required: true },
        isDummy: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
    }, { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema, "Products")