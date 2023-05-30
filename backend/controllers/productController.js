const multer = require('multer');
const path = require('path');

const products_operations = require('../db-service/products_operations');
const productValidations = require('../validations/productValidations')



//// Fetch products from the database
async function fetchProductsHandler(req, res) {
  try {
    const products = await products_operations.fetchProducts();
    res.json(products);
    console.log("A fetchProducts request was received");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}


// Create a new product
async function createProductHandler(req, res) {
  const { title, description, price, category, selerId } = req.body;

  //Validation:
  const validationError = productValidations.validateProduct(title, description, price, category, selerId);
  if (validationError) {
    console.log(validationError);
    return res.status(400).send(validationError);
  }

  const imgUrl = req.file.filename;

  try {
    const createdProduct = await products_operations.createProduct(title, description, imgUrl, price, category, selerId);

    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
}

// Delete a product
async function deleteProductHandler(req, res) {
  const { productId } = req.body;
  console.log('productId :', productId);

  //Validation:
  const validationErrorProductId = productValidations.validProductId(productId);
  if (validationErrorProductId) {
    console.log(validationErrorProductId);
    return res.status(400).send(validationErrorProductId);
  }

  try {
    const product = await products_operations.deleteProduct(productId);

    console.log("product :", product._doc);
    return res.status(200).json(product._doc);
  } catch (err) {
    console.error(err);
    return res.status(500).send("שגיאת שרת פנימית");
  }

}


// Edit a product
async function editProductHandler(req, res) {
  const { title, description, price, category, productId } = req.body;
  const imgUrl = req.file.filename;

  //Validation:
  const validationError = productValidations.validateEditProduct(title, description, price, category, productId);
  if (validationError) {
    console.log(validationError);
    return res.status(400).send(validationError);
  }

  try {

    const editedProduct = await products_operations.editProduct(title, description, imgUrl, price, category, productId);

    if (!editedProduct) {
      return res.status(404).send('לא נמצא מוצר לעדכון');
    }

    console.log('editedProduct :', editedProduct._doc);
    return res.status(200).json(editedProduct._doc);

  } catch (err) {
    console.error(err);
    return res.status(500).send('שגיאת שרת פנימית');
  }

}




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'images'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = req.body.selerId + '-' + Date.now();
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});


const upload = multer({ storage: storage })

// Configure storage options for multer.
// It specifies the destination directory and the file naming logic.

// The destination function determines the directory where uploaded files will be stored.
// In this case, it is set to the 'images' directory located in the parent folder of the current file.

// The filename function determines the name of the uploaded file.
// It appends a unique suffix based on the selerId and the current timestamp to the original file name.

// The 'storage' object is passed to multer to create the upload middleware.

// The upload middleware can be used to handle file uploads in routes or handlers.



module.exports = { fetchProductsHandler, createProductHandler, deleteProductHandler, editProductHandler, upload }