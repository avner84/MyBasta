const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');
const { createPayment, executePayment, updateOrderInDBHandler, fetchOrdersFromDBHandler } = require('../controllers/orderController');
const ordersValidations = require('../validations/ordersValidations');

// Route for initiating the payment process (requires authentication)
router.post('/pay', authUser.checkAuthHeader, createPayment);

// Route for handling successful payment execution
router.get('/success', executePayment);

// Route for handling cancelled payment
router.get('/cancel', (req, res) => res.send('Cancelled'));

// Route for updating the order in the database (requires authentication)
router.post("/updateOrderInDB", authUser.checkAuthHeader, updateOrderInDBHandler);

// Route for fetching orders from the database
router.get("/fetchOrdersFromDB", fetchOrdersFromDBHandler);

module.exports = router;
