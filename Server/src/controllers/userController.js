const { registerUser } = require("../services/userService.js");  // Correct the import here

async function createUser(req, res) {
    try {
        const response = await registerUser(req.body);
        return res.json({
            message: "User created successfully",
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        console.error("Error in createUser:", error);
        return res.json({
            message: error.message || "An unexpected error occurred",
            success: false,
            data: {},
            error: error
        });
    }
}

module.exports = { createUser };


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