const foodpartnerModel = require("../models/foodpartner.model");
// const foodPartnerModel = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Please Login First",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await foodpartnerModel.findById(decoded.id);
    if (!foodPartner) {
      return res.status(401).json({
        message: "Login as a FoodPartner",
      });
    }

    req.foodPartner = foodPartner;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Tokenn",
    });
  }
}

async function authUserMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Please login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "Login as a user",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  authFoodPartnerMiddleware,
  authUserMiddleware,
};
