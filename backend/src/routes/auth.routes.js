const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");

// User Auth Routes
authRouter.post("/user/register", authController.registerUser);
authRouter.post("/user/login", authController.loginUser);
authRouter.get("/user/logout", authController.logoutUser);

// Food Partner Routes
authRouter.post("/foodpartner/register", authController.registerFoodpartner);
authRouter.post("/foodpartner/login", authController.loginFoodpartner);
authRouter.get("/foodpartner/logout", authController.logoutFoodpartner);

module.exports = authRouter;
