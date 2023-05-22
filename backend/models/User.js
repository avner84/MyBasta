const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true }
        },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isActive: { type: Boolean, default: false },
        isActive: { type: Boolean, default: false },
        isSeller: { type: Boolean, default: false },        
        isDeleted: { type: Boolean, default: false },
    },{timestamps:true}
);

module.exports = mongoose.model("User", UserSchema, "Users")