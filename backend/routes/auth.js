const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const emailManager = require("../emailManager/emailManager");
const jsonWebToken = require("../api/jsonWebToken");
const userController = require("../controllers/userController");
const regexConstants = require('../validations/regexConstants');
const authUser = require('../middleware/authUser');
const { responseWithToken } = require('../utils/responseWithToken');



router.post("/register", async (req, res) => {
    const { firstName, lastName, email, pwd } = req.body;
    let lowerCaseEmail = email.toLowerCase();

    // Validate user inputs
    if (!regexConstants.FIRST_NAME_REGEX.test(firstName)) {
        return res.status(400).json({ message: "שם פרטי לא תקין" });
    }
    if (!regexConstants.LAST_NAME_REGEX.test(lastName)) {
        return res.status(400).json({ message: "שם משפחה לא תקין" });
    }
    if (!regexConstants.EMAIL_REGEX.test(lowerCaseEmail)) {
        return res.status(400).json({ message: "כתובת אימייל לא תקינה" });
    }
    if (!regexConstants.PASSWORD_REGEX.test(pwd)) {
        return res.status(400).json({ message: "סיסמה לא תקינה" });
    }

    //Checking if the email address is from gmail and if so it checks if there are dots before the @ and removes them

    if (/@gmail/.test(lowerCaseEmail)) {
        const [localPart, domain] = email.split('@');
        const normalizedLocalPart = localPart.replace(/\./g, '');
        lowerCaseEmail = `${normalizedLocalPart}@${domain}`;
    }

    const existingUser = await userController.findUser(lowerCaseEmail);
    if (existingUser) {
        return res.status(409).json({ message: "כתובת הדואר האלקטרוני שסיפקת כבר קיימת במערכת." });
    }

    try {

        const createdUser = await userController.createUser(firstName, lastName, email, pwd);
        
        //In the event that the user does not verify the account within 30 minutes, the account is deleted. A unique method because you don't need to send a response to the customer
        setTimeout(async function () {
            userController.deleteUserIfInactive(createdUser);
        }, 180000);


        const token = jsonWebToken.createToken(createdUser, "30m")
        emailManager.accountVerificationEmail("avner84@gmail.com", token);
        res.status(201).json(createdUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
})


router.get("/confirmAccount", async (req, res) => {

    try {
        const token = req.query.token;

        const doseTokenMatch = await jsonWebToken.checkToken(token);
        console.log('doseTokenMatch :', doseTokenMatch);
        if (doseTokenMatch) {

            const tokenUserInformation = jsonWebToken.decryptToken(token);
            console.log('tokenUserInformation :', tokenUserInformation);
            const email = tokenUserInformation.email;

            const user = await User.findOneAndUpdate(
                { email },
                { isActive: true },
                { new: true }
            );

            if (!user) {
                res.redirect('http://localhost:3000/account_unconfirmed');
            }

            const { password, ...others } = user._doc;
            console.log('others :', others);

            res.redirect('http://localhost:3000/account_confirmed');
        }
        else {
            res.redirect('http://localhost:3000/account_unconfirmed');
        }

    } catch (error) {
        console.error(error);
        res.redirect('http://localhost:3000/account_unconfirmed');
    }
});


router.post("/login", async (req, res) => {
    const { email, pwd } = req.body;
    let lowerCaseEmail = email.toLowerCase();

    if (/@gmail/.test(lowerCaseEmail)) {
        const [localPart, domain] = email.split('@');
        const normalizedLocalPart = localPart.replace(/\./g, '');
        lowerCaseEmail = `${normalizedLocalPart}@${domain}`;
    }


    try {
        const user = await User.findOne({ email: lowerCaseEmail })
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
        // const token = jsonWebToken.createToken(others, "60m")
        // res.status(200).cookie("loginVerification", token).json(others);
        responseWithToken(res, others, 60);
        console.log('user :', user);

    } catch (err) {
        res.status(500).json({ error: "שגיאה פנימית בשרת" });
    }
})

router.get("/login_by_token", authUser.checkAuthHeader, (req, res) => {

    const userFromToken = jsonWebToken.decryptToken(res.locals.token);
    const newToken = jsonWebToken.createToken(userFromToken, "60m");
    //res.status(200).cookie("loginVerification", newToken).json(userFromToken);
    responseWithToken(res, userFromToken, 60);
});





module.exports = router;