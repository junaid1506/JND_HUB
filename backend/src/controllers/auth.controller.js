const userModel = require("../models/user.model");
const foodpartnerModel = require("../models/foodpartner.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;
  const isUserAlreadyExist = await userModel.findOne({ email });
  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "User is already exist",
    });
  }
  const hashedPassword = await bcryptjs.hash(password, 10);
  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token);

  return res.status(201).json({
    message: "User Register Successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}
async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User Login Successfully",
    userId: user._id,
    email: user.email,
    fullName: user.fullName,
  });
}
function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User Logged out successfully",
  });
}

async function registerFoodpartner(req, res) {
  const { fullName, email, password } = req.body;
  const isFoodPartnerAlreadyExist = await foodpartnerModel.findOne({ email });
  console.log(isFoodPartnerAlreadyExist);
  if (isFoodPartnerAlreadyExist) {
    return res.status(400).json({
      message: "User Already Exist ",
    });
  }
  const hashedPassword = await bcryptjs.hash(password, 10);

  const foodpartner = await foodpartnerModel.create({
    fullName,
    email,
    password: hashedPassword,
  });
  console.log(foodpartner);
  const token = jwt.sign(
    {
      id: foodpartner._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token);

  return res.status(201).json({
    message: "Foodpartner Register Successfully",
    foodpartner: {
      _id: foodpartner._id,
      email: foodpartner.email,
      fullName: foodpartner.fullName,
    },
  });
}
async function loginFoodpartner(req, res) {
  const { email, password } = req.body;
  const foodpartner = await foodpartnerModel.findOne({ email });
  if (!foodpartner) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }
  const isMatch = await bcryptjs.compare(password, foodpartner.password);
  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: foodpartner._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "Foodpartner Login Successfully",
    userId: foodpartner._id,
    email: foodpartner.email,
    fullName: foodpartner.fullName,
  });
}
function logoutFoodpartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Foodpartner Logged out successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodpartner,
  loginFoodpartner,
  logoutFoodpartner,
};  

