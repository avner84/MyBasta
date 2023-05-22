const router = require("express").Router();
const authUser = require('../middleware/authUser');
const cartController = require("../controllers/cartController");
const cartValidations = require('../validations/cartValidations');

router.post("/updateCartInDB",  authUser.checkAuthHeader, async (req, res) => {
  const { cartProducts, userId, totalAmount, totalPrice } = req.body;

  //Validation:
const validationError = cartValidations.validateCart(cartProducts, totalAmount, totalPrice, userId);
if (validationError) {
    console.log(validationError);
    return res.status(400).send(validationError);
}
  
   
  try {
    const updatedCart = await cartController.updateCartInDB(
      cartProducts,
      userId,
      totalAmount,
      totalPrice
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).send(error.message || "שגיאת שרת פנימית");
  }
});


router.get("/fetchCartFromDB", async (req, res) => {
  
  const userId = req.query["userId"];

  //Validation:
  const validationErrorUsertId = cartValidations.validUserId(userId);
  if (validationErrorUsertId) {
      console.log(validationErrorUsertId);
      return res.status(400).send(validationErrorUsertId);
  }

  try {  
    const cart = await cartController.fetchCart(userId);
    console.log("cart :", cart);

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
});


module.exports = router;
