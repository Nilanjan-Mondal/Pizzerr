const { loginUser } = require("../services/authService");

async function login (req, res) {
    try {
        const loginPayLoad = req.body;
        const responseToken = await loginUser(loginPayLoad);

        res.cookie("authToken", responseToken, { 

            //this is used to make sure that the cookie or the jwt is not accessible by the client side javascript

            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message: "User logged in successfully",
            success: true,
            data: {},
            error: {}
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            data: {},
            error: error,
            message: error.message || "An unexpected error occurred"
        })
    }
}

module.exports = login;