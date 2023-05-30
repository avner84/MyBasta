const router = require("express").Router();
const authUser = require('../middleware/authUser');
const cartController = require("../controllers/cartController");
const cartValidations = require('../validations/cartValidations');
const { updateCartInDBHandler, fetchCartFromDBHandler } = require('../controllers/cartController');

// Route for updating the cart in the database (requires authentication)
router.post("/updateCartInDB", authUser.checkAuthHeader, updateCartInDBHandler);

// Route for fetching the cart from the database
router.get("/fetchCartFromDB", fetchCartFromDBHandler);

module.exports = router;
