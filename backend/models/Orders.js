const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        orders:[],
            }, { timestamps: true }
);

module.exports = mongoose.model("Orders", OrderSchema)