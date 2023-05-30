const bcrypt = require('bcrypt');
const authValidations = require('../validations/authValidations');
const user_operations = require('../db-service/user_operations');
const jsonWebToken = require("../api/jsonWebToken");
const emailManager = require("../emailManager/emailManager");
const { responseWithToken } = require('../utils/responseWithToken');

async function registerUser(req, res) {
  const { firstName, lastName, email, pwd } = req.body;

  //In order to avoid possible errors, all email addresses are stored in the database in lowercase letters
  let lowerCaseEmail = email.toLowerCase();

  // Validate user inputs
  const validationError = authValidations.validateAuth(firstName, lastName, lowerCaseEmail, pwd)
  if (validationError) {
    console.log(validationError);
    return res.status(400).send(validationError);
  }

  //Checking if the email address is from gmail and if so it checks if there are dots before the @ and removes them
  lowerCaseEmail = authValidations.normalizeGmailEmail(lowerCaseEmail);

  const existingUser = await user_operations.findUser(lowerCaseEmail);
  if (existingUser) {
    return res.status(409).json({ message: "כתובת הדואר האלקטרוני שסיפקת כבר קיימת במערכת." });
  }

  try {

    const createdUser = await user_operations.createUser(firstName, lastName, lowerCaseEmail, pwd);

    //In the event that the user does not verify the account within 30 minutes, the account is deleted. A unique method because you don't need to send a response to the customer
    setTimeout(async function () {
      user_operations.deleteUserIfInactive(createdUser);
    }, 180000);

    const token = jsonWebToken.createToken(createdUser, "30m")
    emailManager.accountVerificationEmail("avner84@gmail.com", token);
    res.status(201).json(createdUser);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

//Endpoint for confirming user after email verification

async function confirmUser(req, res) {
  try {
    const token = req.query.token;

    // Check if the token matches
    const doseTokenMatch = await jsonWebToken.checkToken(token);
    console.log('doseTokenMatch :', doseTokenMatch);
    if (doseTokenMatch) {
      // Decrypt user information from the token
      const tokenUserInformation = jsonWebToken.decryptToken(token);
      console.log('tokenUserInformation :', tokenUserInformation);
      const email = tokenUserInformation.email;

      // Update user status to isActive: true in the database
      const user = await user_operations.updateUserStatus(email);

      // If user not found, redirect to 'account_unconfirmed' page
      if (!user) {
        res.redirect('http://localhost:3000/account_unconfirmed');
      }

      const { password, ...others } = user._doc;
      console.log('others :', others);
 // Redirect to 'account_confirmed' page after successful confirmation
      res.redirect('http://localhost:3000/account_confirmed');

    } else {
      // If token does not match, redirect to 'account_unconfirmed' page
      res.redirect('http://localhost:3000/account_unconfirmed');
    }
  } catch (error) {
    console.error(error);
     // In case of an error, redirect to 'account_unconfirmed' page
    res.redirect('http://localhost:3000/account_unconfirmed');
  }
}
// General comment for the function
// This function is used to confirm a user after they have verified their email.
// It checks the validity of the token, updates the user status to isActive: true in the database,
// and redirects the user to the appropriate page based on the result.





async function loginUser(req, res) {
  console.log("login user function called");
  const { email, pwd } = req.body;
  let lowerCaseEmail = email.toLowerCase();
  console.log('lowerCaseEmail :', lowerCaseEmail);

  //Checking if the email address is from gmail and if so it checks if there are dots before the @ and removes them
  lowerCaseEmail = authValidations.normalizeGmailEmail(lowerCaseEmail);

  try {
    const user = await user_operations.findUser(lowerCaseEmail);
    if (!user) {
      return res.status(401).json({ error: "פרטי התחברות שגויים" });
    }

    if (!user.isActive) {
      return res.status(401).json({ error: "החשבון לא אומת" });
    }

    if (user.isDeleted) {
      return res.status(404).json({ error: "חשבון זה אינו קיים יותר במערכת" });
    }
    const passwordFromClient = pwd;
    const passwordFromDB = user.password;

    const compareResult = await bcrypt.compare(passwordFromClient, passwordFromDB);
    if (!compareResult) {
      return res.status(401).json({ error: "פרטי התחברות שגויים" });
    }
    const { password, ...others } = user._doc;
    responseWithToken(res, others, 60);
    console.log('user :', user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "שגיאה פנימית בשרת" });
  }

}

function loginByTokenHandler(req, res) {
  const userFromToken = jsonWebToken.decryptToken(res.locals.token);
  responseWithToken(res, userFromToken, 60);
}
// General comment for the function
// This function receives the token extracted from the user's cookies. It checks if the token is valid and correctly formatted. If it is, the function extracts the user's details from the token and generates a new and updated token that will be valid for the next 60 minutes. This new token is then sent back to the user. The token is refreshed on every website refresh.



module.exports = { registerUser, confirmUser, loginUser, loginByTokenHandler }