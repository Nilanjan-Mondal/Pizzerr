const { findUser } = require("../repositories/userRepository.js");
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config/serverConfig.js");

async function loginUser (authDetails) {
    const email = authDetails.email;
    const plainPassword = authDetails.password;


    // 1. check if the user exists with the given email
    const user = await findUser({ email });

    if(!user) {
        throw {
            message: "User not found with the email",
            statusCode: 404
        }
    }

    // 2. If user is found we need to compare the plainIncomingPassword with the hashedPassword
    
    const isPasswordValidated = await bcrypt.compare(plainPassword, user.password);

    if(! isPasswordValidated) {
        throw {
            message: "Password is incorrect, please try again",
            statusCode: 400
        }
    }

    // 3. If the password is correct we will create a token and return it to the user

    const userRole = user.role ? user.role : "USER";

    const token = jwt.sign({email: user.email, id: user._id, role: userRole}, JWT_SECRET, {expiresIn: "60h"});

    return token;
}

async function logoutUser (req, res) {
    try {
        return res.status(200).cookie("authToken", "", {maxAge: 0}).json({
            message: "User logged out successfully",
            success: true,
            data: {},
            error: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to logout"
        })
    }
}

module.exports = {
    loginUser,
    logoutUser
}