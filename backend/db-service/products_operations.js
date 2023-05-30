const Product = require("../models/Product");
const multer = require('multer');
const path = require('path');

// Fetch all products that are not marked as deleted
const fetchProducts = async () => {
  try {
    const products = await Product.find({ isDeleted: false });

    // Modify the image URL to include the appropriate base URL
    products.forEach(product => {
      const imageUrl = `http://localhost:3500/images/${product.imgUrl}`;
      product.imgUrl = imageUrl;
    });

    return products;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch products');
  }
}

// Create a new product
async function createProduct(title, description, imgUrl, price, category, selerId) {
  try {
    // Create a new product document in the database
    const newProduct = await Product.create({
      title,
      description,
      imgUrl,
      price,
      category,
      selerId,
      quantity: 1,
      isDummy: true,
      isDeleted: false
    });
    console.log('newProduct :', newProduct);
    return newProduct._doc;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Edit an existing product
async function editProduct(title, description, imgUrl, price, category, productId) {
  try {
    // Find the product by its ID and update its details
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      { title, description, imgUrl, price, category },
      { new: true }
    ).exec();
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Delete a product by marking it as deleted
async function deleteProduct(productId) {
  try {
    // Find the product by its ID and mark it as deleted
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      { isDeleted: true },
      { new: true }
    ).exec();

    if (!product) {
      throw new Error("לא נמצא מוצר למחיקה");
    }

    return product;
  } catch (err) {
    console.error(err);
    throw err;
  }
}


// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'images'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = req.body.selerId + '-' + Date.now();
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Create a multer instance for handling file uploads
const upload = multer({ storage: storage })


module.exports = { deleteProduct, fetchProducts, createProduct, editProduct, upload }