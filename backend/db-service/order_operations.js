const Orders = require("../models/Orders");


const updateOrdersInDB = async (orders, userId) => {
    try {
        const existingOrders = await Orders.findOne({ userId });

        if (!existingOrders) {
            // If no existing orders are found, create a new order document
            const newOrders = await Orders.create({
                userId,
                orders
            });

            return newOrders;
        }

        // If existing orders are found, update the orders array
        const updatedOrders = await Orders.findOneAndUpdate(
            { userId },
            { orders },
            { new: true }
        );

        return updatedOrders;
    } catch (error) {
        throw new Error(error.message || "שגיאת שרת פנימית");
    }
};


const fetchOrders = async (userId) => {
    try {
        let existingOrders = await Orders.findOne({ userId });

        if (existingOrders) {
            // If existing orders are found, return the orders document
            return existingOrders;
        }
        else {
            // If no existing orders are found, create a new order object with empty values
            return existingOrders = {
                orders: [],
                userId: userId,
            }
        }

    } catch (error) {
        console.error(error);
        throw new Error("Server Error");
    }

}



module.exports = {
    updateOrdersInDB,
    fetchOrders
};