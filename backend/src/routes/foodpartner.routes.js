const express = require("express");
const foodPartnerRouter = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const foodPartnerController = require("../controllers/foodPartner.controller");

foodPartnerRouter.get(
  "/:id",
  authMiddleware.authUserMiddleware,
  foodPartnerController.getFoodPartnerById,
);

module.exports = foodPartnerRouter;
