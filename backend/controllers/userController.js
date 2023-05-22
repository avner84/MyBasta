const bcrypt = require('bcrypt');
const User = require("../models/User");

async function findUser(email) {
    try {
        const existingUser = await User.findOne({ email });
        return existingUser;
    } catch (error) {
        throw new Error(`An error occurred while finding user by email ${email}: ${error}`);
    }
}


async function createUser(firstName, lastName, email, pwd) {
    try {
        let lowerCaseEmail = email.toLowerCase();
        const newUser = await User.create({
            name: {
                firstName,
                lastName,
            },
            email: lowerCaseEmail,
            password: await bcrypt.hash(pwd, 10),
        });

        const { password, ...others } = newUser._doc;
        return others;
    } catch (error) {
        console.error(error);
        throw error;
    }
   
}

async function deleteUser(email){

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

async function editUser(firstName, lastName, email, pwd){
    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { name: { firstName, lastName }, password: await bcrypt.hash(pwd, 10) },
            { new: true }
        ).exec();

        const { password, ...others } = updatedUser._doc;
        return others;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { createUser, findUser, deleteUserIfInactive, deleteUser, editUser }