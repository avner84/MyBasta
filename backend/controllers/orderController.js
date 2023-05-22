const paypal = require('paypal-rest-sdk');
const dotenv = require('dotenv').config();
const Orders = require("../models/Orders");

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.SECRET_ID
});

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

//=====

const updateOrdersInDB = async (orders, userId) => {
    try {
        const existingOrders = await Orders.findOne({ userId });

        if (!existingOrders) {
            const newOrders = await Orders.create({
                userId,
                orders
            });

            return newOrders;
        }

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
            return existingOrders;
        }
        else {
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
    createPayment,
    executePayment,
    updateOrdersInDB,
    fetchOrders
};