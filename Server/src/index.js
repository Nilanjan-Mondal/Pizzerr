const express = require('express');
const cookieParser = require('cookie-parser')
const fs = require('fs/promises');
const cors = require('cors');

const ServerConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const user = require('./schema/userSchema');
const userRouter = require('./routes/userRoute.js');
const cartRouter = require('./routes/cartRoute.js');
const authRouter = require('./routes/authRoute.js');
const { isLoggedIn } = require('./validation/authValidator.js');
const uploader = require('./middlewares/multerMiddleware.js');
const cloudinary = require('./config/cloudinaryConfig.js');
const productRouter = require('./routes/productRoute.js');


const app = express();

app.use(cors({
    //origin: "https://pizzer.vercel.app", // Replace with your client's origin for production
    origin: "http://localhost:5173", // Replace with your client's origin for localhost
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add the methods you need
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/carts', cartRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);

app.get('/ping', isLoggedIn, (req, res) => {
    // controller
    console.log(req.body);
    console.log(req.cookies);
    return res.json({message: "pong"});
})

app.post('/photo', uploader.single('incomingFile'), async (req, res) => {
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("result from cloudinary", result);
    await fs.unlink(req.file.path); // delete the file from the server after uploading to cloudinary
    return res.json({
        message: "photo uploaded successfully"
    });
})

// for production
// Handle CORS preflight requests (OPTIONS)
app.options('*', cors());  // Allow preflight for all routes

// Global error handler to ensure CORS headers are sent on error
app.use((err, req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://pizzer.vercel.app");  // Ensure CORS header is set
    res.status(err.status || 500).json({ error: err.message });
});

//server starts here
app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT}...!!`);

    // const newUser2 = await user.create({
    //     firstName: "Johnnniga",
    //     lastName: "Doeeeeiga",
    //     mobileNumber: "1234567990",
    //     email: "a@vx.com",
    //     password: "passwordxxx"
    // });
    // console.log("New user created successfully");
    // console.log(newUser2);
});



