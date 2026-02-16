const express = require("express");
const foodRouter = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const foodController = require("../controllers/food.controller");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

// POST /api/food/ [protected]

foodRouter.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood,
);

// POST /api/food/ [protected]
foodRouter.get('/', )

module.exports = foodRouter;
