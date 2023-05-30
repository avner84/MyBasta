const router = require('express').Router();
const authUser = require('../middleware/authUser');
const { upload } = require("../controllers/productController");
const validateFile = require('../validations/validateFile');
const {
  fetchProductsHandler,
  createProductHandler,
  deleteProductHandler,
  editProductHandler
} = require('../controllers/productController');

// Route for fetching products
router.get("/fetchProducts", fetchProductsHandler);

// Route for creating a new product (requires authentication and file upload)
router.post("/createProduct", authUser.checkAuthHeader, upload.single('file'), validateFile, createProductHandler);

// Route for deleting a product (requires authentication)
router.put("/deleteProduct", authUser.checkAuthHeader, deleteProductHandler);

// Route for editing a product (requires authentication and file upload)
router.put('/editProduct', authUser.checkAuthHeader, upload.single('file'), validateFile, editProductHandler);

module.exports = router;
