const user = require("../schema/userSchema.js");

async function findUser(parameters) {
    // Find user by provided parameters (email and mobile number)
    const response = await user.findOne({ ...parameters });
    return response;
}

async function createUser(userDetails) {
    // Create a new user document in the database
    const response = await user.create(userDetails);
    return response;
}

module.exports = {
    findUser,
    createUser
};


// oops code below does the same thing as the code above

// const user = require("../schema/userSchema.js");

// class userRepository {
//     async findUser (parameters) {
//         const response = await user.findOne({ ...parameters });
//         return response;
//     }
//     async createUser (userDetails) {
//         const response = await user.create(userDetails);
//         return response;
//     }
// }

// module.exports = userRepository;