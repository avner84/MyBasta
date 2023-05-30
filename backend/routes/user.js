const router = require('express').Router();
const authUser = require('../middleware/authUser');
const { deleteUser, editUser } = require('../controllers/userController');

// Route for deleting a user (requires authentication)
router.put("/delete", authUser.checkAuthHeader, deleteUser);

// Route for editing a user (requires authentication)
router.put("/editing", authUser.checkAuthHeader, editUser);

module.exports = router;
