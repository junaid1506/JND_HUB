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

module.exports = { createFood };
