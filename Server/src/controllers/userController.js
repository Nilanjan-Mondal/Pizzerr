const { registerUser, findUserByEmailAndMobileNumber } = require("../services/userService.js");  // Correct the import here

async function createUser(req, res) {
    try {
        const response = await registerUser(req.body);
        return res.status(201).json({
            message: "User created successfully",
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        console.error("Error in createUser:", error);
        return res.status(error.statusCode).json({
            message: error.message || "An unexpected error occurred",
            success: false,
            data: {},
            error: error
        });
    }
}

async function getUser(req, res) {
    try {
        const user = await findUserByEmailAndMobileNumber(req.params);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                data: {},
                error: {}
            });
        }

        return res.status(200).json({
            message: "User fetched successfully",
            success: true,
            data: user,
            error: {}
        });

    } catch (error) {
        console.error("Error in getUser:", error);
        return res.status(error.statusCode || 500).json({
            message: error.message || "An unexpected error occurred",
            success: false,
            data: {},
            error: error
        });
    }
}

module.exports = { createUser, getUser };


// the below oops code does the same thing as the abov code


// const userRepository = require("../repositories/userRepository.js");
// const userService = require("../services/userService.js");

// async function createUser (req, res) {
//     console.log("Create user controller called");
//     console.log(req.body);
//     // TODO: Register the user

//     const UserService = new userService(new userRepository());

//     try {
//         const response = await UserService.registerUser(req.body);
//         return res.json({
//             message: "User created successfully",
//             success: true,
//             data: response,
//             error: {}
//         });
//     } catch (error) {
//         return res.json({
//             message: error.reason,
//             success: false,
//             data: {},
//             error: error
//         });
//     }
// }

// module.exports = { createUser };