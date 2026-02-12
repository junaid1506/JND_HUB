const express = require("express");
const foodRouter = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const foodController = require("../controllers/food.controller");

// POST /api/food/ [protected]

foodRouter.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  foodController.createFood,
);

module.exports = foodRouter;
