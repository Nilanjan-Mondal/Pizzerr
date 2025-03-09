const { loginUser } = require("../services/authService");

async function login (req, res) {
    try {
        const loginPayLoad = req.body;
        const response = await loginUser(loginPayLoad);

        res.cookie("authToken", response.token, { 

            //this is used to make sure that the cookie or the jwt is not accessible by the client side javascript

            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message: "User logged in successfully",
            success: true,
            data: {
                role: response.role
            },
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