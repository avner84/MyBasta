const router = require('express').Router();
const userController = require("../controllers/userController");

const regexConstants = require('../validations/regexConstants');
const userValidations = require('../validations/userValidations');
const authUser = require('../middleware/authUser');



router.put("/delete",authUser.checkAuthHeader, async (req, res) => {
    const { email } = req.body;
    
//validation:
    const validationErrorUserEmail = userValidations.validUserEmail(email);
  if (validationErrorUserEmail) {
    console.log(validationErrorUserEmail);
    return res.status(400).send(validationErrorUserEmail);
  }
    
    try {
        const user = await userController.deleteUser(email);
        if (!user){
            return res.status(404).send('לא נמצא משתמש למחיקה'); 
        } 
        const { password, ...others } = user._doc;
        console.log('others :', others);
        return res.status(200).json(others);
    } catch (error) {
        console.error(err);
        return res.status(500).send('שגיאת שרת פנימית');
    }
    
    

})


router.put("/editing",authUser.checkAuthHeader, async (req, res) => {
    const { firstName, lastName, email, pwd } = req.body;

    // Validate user inputs
    if (!regexConstants.FIRST_NAME_REGEX.test(firstName)) {
        return res.status(400).json({ message: "שם פרטי לא תקין" });
    }
    if (!regexConstants.LAST_NAME_REGEX.test(lastName)) {
        return res.status(400).json({ message: "שם משפחה לא תקין" });
    }

    if (!regexConstants.PASSWORD_REGEX.test(pwd)) {
        return res.status(400).json({ message: "סיסמה לא תקינה" });
    }
   

    try {
        const updatedUser = await userController.editUser(firstName, lastName, email, pwd);
     
        if (!updatedUser) {
            return res.status(404).send('לא נמצא משתמש לעדכון');
        }
     
        return res.status(200).json(updatedUser);

    } catch (err) {

        console.error(err);
        return res.status(500).send('שגיאת שרת פנימית');

    }

})

module.exports = router;