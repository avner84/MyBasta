const bcrypt = require('bcrypt');
const User = require("../models/User");

// Find a user by email
async function findUser(email) {
    try {
        const existingUser = await User.findOne({ email });
        return existingUser;
    } catch (error) {
        throw new Error(`An error occurred while finding user by email ${email}: ${error}`);
    }
}

// Create a new user
async function createUser(firstName, lastName, email, pwd) {
    try {
        const newUser = await User.create({
            name: {
                firstName,
                lastName,
            },
            email,
            password: await bcrypt.hash(pwd, 10),
        });

        // Exclude the password field from the returned user data
        const { password, ...others } = newUser._doc;
        return others;
    } catch (error) {
        console.error(error);
        throw error;
    }

}

// Delete a user by marking it as deleted
async function deleteUser(email) {

    try {
        const user = await User.findOneAndUpdate(
            { email },
            { isDeleted: true },
            { new: true }
        ).exec();
        return user;
    } catch (err) {
        console.error(err);
        throw err;
    }

}

//The userDeleteByServer function handles the deletion of a user by calling the deleteUser function.
//It returns an object with the deleted user's data (excluding the password) if the deletion is successful.
//Otherwise, it returns an error message.
async function userDeleteByServer(email) {
    try {
        const user = await deleteUser(email);

        if (!user) {
            return { error: "No user found" };
        }

        const { password, ...others } = user._doc;
        console.log("others :", others);
        return "delete Successful";
    } catch (err) {
        console.log(err);
        return err;
    }
}

// Perform user deletion if the user is inactive
async function deleteUserIfInactive(newUser) {
    console.log('newUser :', newUser);
    try {
        const user = await findUser(newUser.email)

        if (!user) { throw error }
        if (user.isActive === false) {
            const resultUserDeleteByServer = await userDeleteByServer(newUser.email)
            console.log('resultUserDeleteByServer :', resultUserDeleteByServer);
        }

    } catch (error) {
        console.log(error);
    }

}

// Edit an existing user's details
async function editUser(firstName, lastName, email, pwd) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { name: { firstName, lastName }, password: await bcrypt.hash(pwd, 10) },
            { new: true }
        ).exec();

        // Exclude the password field from the returned user data
        const { password, ...others } = updatedUser._doc;
        return others;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Update the status of a user to active
async function updateUserStatus(email) {
    try {
        const user = await User.findOneAndUpdate(
            { email },
            { isActive: true },
            { new: true }
        );

        return user;
    } catch (err) {
        console.error(err);
        throw new Error('שגיאה בעדכון סטטוס המשתמש');
    }
}

module.exports = { createUser, findUser, deleteUserIfInactive, deleteUser, editUser, updateUserStatus }