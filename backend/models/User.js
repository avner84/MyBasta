const mongoose = require("mongoose");

// Define the User schema
const UserSchema = new mongoose.Schema(
    {
        name: {
            firstName: { type: String, required: true }, // First name of the user
            lastName: { type: String, required: true } // Last name of the user
        },
        email: { type: String, required: true, unique: true }, // Email of the user (must be unique)
        password: { type: String, required: true }, // Password of the user
        isActive: { type: Boolean, default: false }, // Flag indicating if the user is active
        isSeller: { type: Boolean, default: false }, // Flag indicating if the user is a seller
        isDeleted: { type: Boolean, default: false }, // Flag indicating if the user is deleted
    },
    { timestamps: true } // Add timestamps for createdAt and updatedAt fields
);

// Export the User model
module.exports = mongoose.model("User", UserSchema, "Users");
