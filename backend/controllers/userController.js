const userValidations = require('../validations/userValidations');
const user_operations = require('../db-service/user_operations');

async function deleteUser(req, res) {
    const { email } = req.body;

    //validation:
    const validationErrorUserEmail = userValidations.validUserEmail(email);
    if (validationErrorUserEmail) {
        console.log(validationErrorUserEmail);
        return res.status(400).send(validationErrorUserEmail);
    }

    try {
        const user = await user_operations.deleteUser(email);
        if (!user) {
            return res.status(404).send('לא נמצא משתמש למחיקה');
        }
        const { password, ...others } = user._doc;
        console.log('others :', others);
        return res.status(200).json(others);
    } catch (error) {
        console.error(err);
        return res.status(500).send('שגיאת שרת פנימית');
    }
}

async function editUser(req, res){
    const { firstName, lastName, email, pwd } = req.body;

    // Validate user inputs
    const validationErrorUser = userValidations.validate_UserDetails( firstName, lastName, pwd);
    if (validationErrorUser) {
        console.log(validationErrorUser);
        return res.status(400).send(validationErrorUser);
    }
    
   
    try {
        const updatedUser = await user_operations.editUser(firstName, lastName, email, pwd);
     
        if (!updatedUser) {
            return res.status(404).send('לא נמצא משתמש לעדכון');
        }
     
        return res.status(200).json(updatedUser);

    } catch (err) {

        console.error(err);
        return res.status(500).send('שגיאת שרת פנימית');

    }
}

module.exports = { deleteUser, editUser}