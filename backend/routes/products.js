const router = require('express').Router();
const productController = require("../controllers/productController")
const authUser = require('../middleware/authUser');
const {upload} = require("../controllers/productController");
const productValidations = require('../validations/productValidations');
const validateFile = require('../validations/validateFile');


router.get("/fetchProducts", async (req, res) => {
  try {
    const products = await productController.fetchProducts();
    res.json(products);
    console.log("A fetchProducts request was received");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});



router.post("/createProduct", authUser.checkAuthHeader, upload.single('file'), validateFile, async (req, res) => {
  console.log('Axios POST body: ', req.body);
  console.log('req.file:', req.file);
  const { title, description, price, category, selerId } = req.body;

  //Validation:

  const validationError = productValidations.validateProduct(title, description, price, category, selerId);
  if (validationError) {
    console.log(validationError);
    return res.status(400).send(validationError);
  }

  const imgUrl = req.file.filename;

  try {
  const createdProduct = await productController.createProduct(title, description, imgUrl, price, category, selerId);
  
  res.status(201).json(createdProduct);
  } catch (err) {
  res.status(400).json("Error: " + err);
  }
  })


router.put("/deleteProduct", authUser.checkAuthHeader, async (req, res) => {
  const { productId } = req.body;
  console.log('productId :', productId);

  //Validation:
  const validationErrorProductId = productValidations.validProductId(productId);
  if (validationErrorProductId) {
    console.log(validationErrorProductId);
    return res.status(400).send(validationErrorProductId);
  }

  try {
    const product = await productController.deleteProduct(productId);

    console.log("product :", product._doc);
    return res.status(200).json(product._doc);
  } catch (err) {
    console.error(err);
    return res.status(500).send("שגיאת שרת פנימית");
  }
});


router.put('/editProduct', authUser.checkAuthHeader, upload.single('file'),validateFile, async (req, res) => {
  console.log('Axios POST body: ', req.body);
  console.log('req.file:', req.file);
  const { title, description, price, category , productId } = req.body;
  const imgUrl = req.file.filename;

  //Validation:
  const validationError = productValidations.validateEditProduct(title, description, price, category, productId);
  if (validationError) {
    console.log(validationError);
    return res.status(400).send(validationError);
  }

  try { 

    const editedProduct =  await productController.editProduct(title, description, imgUrl, price, category, productId);
    
    if (!editedProduct) {
      return res.status(404).send('לא נמצא מוצר לעדכון');
    }
    
    console.log('editedProduct :', editedProduct._doc);
    return res.status(200).json(editedProduct._doc);
    
  } catch (err) {
    console.error(err);
    return res.status(500).send('שגיאת שרת פנימית');
  }
});


module.exports = router;