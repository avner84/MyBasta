const router = require('express').Router();
const authUser = require('../middleware/authUser');
const { registerUser, confirmUser, loginUser, loginByTokenHandler } = require('../controllers/authController')

// Route for user registration
router.post("/register", registerUser);

// Route for confirming user account
router.get("/confirmAccount", confirmUser);

// Route for user login
router.post("/login", loginUser);

// Route for login using token (requires authentication)
router.get("/login_by_token", authUser.checkAuthHeader, loginByTokenHandler);

module.exports = router;