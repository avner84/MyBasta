const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');
const orderController = require('../controllers/orderController');
const ordersValidations = require('../validations/ordersValidations')


router.post('/pay', authUser.checkAuthHeader, orderController.createPayment);

router.get('/success', orderController.executePayment);

router.get('/cancel', (req, res) => res.send('Cancelled'));


router.post("/updateOrderInDB", authUser.checkAuthHeader, async (req, res) => {
    const { orders, userId } = req.body;
    console.log('userId :', userId);
    console.log('orders :', orders);

    //Validation:

    const validationError = ordersValidations.validateOrders(orders, userId);
    if (validationError) {
        console.log(validationError);
        return res.status(400).send(validationError);
    }

    try {
        const updateOrders = await orderController.updateOrdersInDB(
            orders,
            userId
        );
        res.status(200).json(updateOrders);
    } catch (error) {
        res.status(500).send(error.message || "שגיאת שרת פנימית");
    }
});

router.get("/fetchOrdersFromDB", async (req, res) => {

    const userId = req.query["userId"];

    //Validation:
    const validationErrorUsertId = ordersValidations.validUserId(userId);
    if (validationErrorUsertId) {
        console.log(validationErrorUsertId);
        return res.status(400).send(validationErrorUsertId);
    }

    try {

        const orderDetails = await orderController.fetchOrders(userId);
        console.log('orders :', orderDetails);


        return res.status(200).json(orderDetails);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server Error" });
    }
});


module.exports = router;


