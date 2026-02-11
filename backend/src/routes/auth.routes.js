const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");

authRouter.post("/user/register", authController.registerUser);
authRouter.post("/user/login" , authController.loginUser)
authRouter.get('/user/logout' ,authController.logoutUser)

module.exports = authRouter;
