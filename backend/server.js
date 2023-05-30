// Connecting to external libraries
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

 require('dotenv').config();
const port = process.env.PORT;

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productsRouth = require("./routes/products");
const cartRouth = require("./routes/cart");
const orderRouth = require("./routes/order");

// Disable strict query mode in Mongoose
// Allows more flexibility in MongoDB queries
// Use with caution and ensure proper security measures
mongoose.set('strictQuery', false);

// Connecting to the MongoDB database
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection successfull"))
  .catch((err) => {
    console.log(err);
  });

app.use((req, res, next) => {
    console.log('got req: ', req.url, 'method :', req.method);
    next()
})

// Setting up CORS middleware
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization'
  }));

  
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//General middleware for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('שגיאת שרת פנימית');
});

// Route definitions
app.use('/images', express.static(__dirname + '/images'));
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productsRouth);
app.use("/api/cart", cartRouth);
app.use("/api/order", orderRouth);

app.listen(port || 3500, () => {
  console.log(`Server running on port ${port}`);
});