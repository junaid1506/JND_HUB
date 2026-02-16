const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  const { name, description } = req.body;
  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid(),
  );
  const foodItem = await foodModel.create({
    name,
    video: fileUploadResult.url,
    description,
    foodPartner: req.foodPartner._id,
  });

  res.status(201).json({
    message: "Food create Succesfully ",
    food: foodItem,
  });
}

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find();
  res.status(200).json({
    message: "All Food Fetched Successfully",
    foodItems: foodItems,
  });
}

module.exports = { createFood, getFoodItems };
