const Product = require("../models/Product");
const multer = require('multer');
const path = require('path');

const fetchProducts = async () => {
  try {
    const products = await Product.find({ isDeleted: false });

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


async function createProduct(title, description, imgUrl, price, category, selerId) {
  try {
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

async function editProduct(title, description, imgUrl, price, category, productId) {
  try {
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

async function deleteProduct(productId) {
  try {
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
    throw err;
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


module.exports = { deleteProduct, fetchProducts, createProduct, editProduct, upload }