const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');

const isLoggedIn = (req, res, next) => {
    const token = req.cookies["authToken"];
    if (!token) {
        return res.status(401).json({
            success: false,
            data: {},
            error: "not authenticated",
            message: "No auth token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // user is authenticated allow the to access the controllers
        req.user = {
            // adding user details to the request object so that we can access the user details in the controllers
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };

        next(); // call the next middleware or controller

    } catch (error) {
        return res.status(401).json({
            success: false,
            data: {},
            error: "not authenticated",
            message: "Invalid token provided"  // token tampered or changed
        });
    }
}


// This function checks if the authenticated user is an admin or not
// because we will call isAdmin after isLoggedIn thats whu we will receive the user details in the request object
function isAdmin(req, res, next) {
    console.log("req.user : ", req.user);
    const loggedInUser = req.user;
    if(loggedInUser.role == "ADMIN") {
        next(); 
    } else {
        return res.status(401).json({
            success: false,
            data: {},
            error: "forbidden",
            message: "You are not authorized to access this resource"
        });
    }
}

module.exports = {
    isLoggedIn,
    isAdmin
}