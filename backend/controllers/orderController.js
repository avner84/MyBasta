const paypal = require('paypal-rest-sdk');
const dotenv = require('dotenv').config();
const ordersValidations = require('../validations/ordersValidations');
const order_operations = require('../db-service/order_operations')

// Configure PayPal SDK
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.SECRET_ID
});

// Create payment with PayPal
const createPayment = async (req, res) => {
    try {
        console.log("req.body: ", req.body);
        const { cartProducts, totalAmount, totalPrice, userId } = req.body;
        req.query.userId = userId;
        //Validation:
        if (typeof totalPrice !== 'number' || totalPrice < 1) {
            console.log('הסכום שהוזן לתשלום אינו תקין');
            return res.status(400).send('הסכום שהוזן לתשלום אינו תקין');
        }

        const total = totalPrice.toFixed(2).toString();
        console.log('total :', total);

        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/success",
                "cancel_url": "http://localhost:3000/cancel"
            },
            "transactions": [{
                "amount": {
                    "currency": "ILS",
                    "total": totalPrice
                },
                "description": "רכישה מאתר מיי-בסטה"
            }]
        };

        paypal.payment.create(create_payment_json, async function (error, payment) {
            try {
                if (error) {
                    throw error;
                } else {
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            res.json({ forwardLink: payment.links[i].href });
                        }
                    }
                }
            } catch (error) {
                console.error(error);
                res.status(500).send('An error occurred while creating the payment');
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing the payment request');
    }
};

// Execute payment with PayPal

const executePayment = async (req, res) => {
    try {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        console.log(payerId)
        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "ILS",
                    "total": total
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
                res.json({ success: true });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing the payment');
    }
};

// Update orders in the database
async function updateOrderInDBHandler(req, res){
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
        const updateOrders = await order_operations.updateOrdersInDB(
            orders,
            userId
        );
        res.status(200).json(updateOrders);
    } catch (error) {
        res.status(500).send(error.message || "שגיאת שרת פנימית");
    }
}


// Fetch orders from the database
async function fetchOrdersFromDBHandler(req, res){

    const userId = req.query["userId"];

    //Validation:
    const validationErrorUsertId = ordersValidations.validUserId(userId);
    if (validationErrorUsertId) {
        console.log(validationErrorUsertId);
        return res.status(400).send(validationErrorUsertId);
    }

    try {

        const orderDetails = await order_operations.fetchOrders(userId);
        console.log('orders :', orderDetails);


        return res.status(200).json(orderDetails);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server Error" });
    }
}

module.exports = {
    createPayment,
    executePayment,
    updateOrderInDBHandler,
    fetchOrdersFromDBHandler
};