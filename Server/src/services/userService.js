const { createCart } = require("../repositories/cartRepository.js");
const { findUser, createUser } = require("../repositories/userRepository.js");

async function registerUser(userDetails) {
    // It will create a brand new user in the database
    // 1. We need to check if the user with this email and mobile number already exists ot not

    const user = await findUser({
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber
    });

    if (user) {
        throw {
            reason: "User already exists with this email and mobile number",
            statusCode: 400
        }
    }

    // 2. If not then create the user in the database

    const newUser = await createUser({
        email: userDetails.email,
        password: userDetails.password,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        mobileNumber: userDetails.mobileNumber,
        role: userDetails.role
    });

    if(!newUser) {
        throw {
            reason: "Something went wront, cannot create user",
            statusCode: 500
        }
    }

    await createCart(newUser._id);

    // 3. Return the details of the created user

    return newUser;

}

module.exports = {
    registerUser
};



// const { findUser, createUserInDb } = require("../repositories/userRepository.js");

// async function registerUser(userDetails) {
//     const user = await findUser({
//         email: userDetails.email,
//         mobileNumber: userDetails.mobileNumber
//     });

//     if (user) {
//         throw new Error("User already exists with this email and mobile number");
//     }

//     const newUser = await createUserInDb({
//         email: userDetails.email,
//         password: userDetails.password,
//         firstName: userDetails.firstName,
//         lastName: userDetails.lastName,
//         mobileNumber: userDetails.mobileNumber
//     });

//     if (!newUser) {
//         throw new Error("Something went wrong, cannot create user");
//     }

//     return newUser;
// }

// // Make sure registerUser is exported
// module.exports = {
//     registerUser
// };



// the below oops code does the same as the code above


// class userService {

//     constructor(_userRepository) {
//         this.userRepository = _userRepository; // this creates a new instance of the userRepository class in userRepository.js file. now a new variavle is created in this class called userRepository (this.userRepository)
//     }

//     async registerUser(userDetails) {
//         // It will create a brand new user in the database
//         // 1. We need to check if the user with this email and mobile number already exists ot not

//         const user = await this.userRepository.findUser({
//             email: userDetails.email,
//             mobileNumber: userDetails.mobileNumber
//         });

//         if (user) {
//             throw {
//                 reason: "User already exists with this email and mobile number",
//                 statusCode: 400
//             }
//         }

//         // 2. If not then create the user in the database

//         const newUser = await this.userRepository.createUser({
//             email: userDetails.email,
//             password: userDetails.password,
//             firstName: userDetails.firstName,
//             lastName: userDetails.lastName,
//             mobileNumber: userDetails.mobileNumber
//         });

//         if(!newUser) {
//             throw {
//                 reason: "Something went wront, cannot create user",
//                 statusCode: 500
//             }
//         }

//         // 3. Return the details of the created user

//         return newUser;

//     }
// }

// module.exports = userService;