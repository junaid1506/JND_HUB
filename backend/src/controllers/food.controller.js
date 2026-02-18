const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  try {
    console.log("BODY:", req.body);

    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        message: "Name and description are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Video file is required",
      });
    }

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
      message: "Food created successfully",
      food: foodItem,
    });
  } catch (error) {
    console.error("Create Food Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
}

async function getFoodItems(req, res) {
  try {
    const foodItems = await foodModel
      .find({})
      .populate("foodPartner", "businessName"); // yahan populate lagao

    res.status(200).json({
      success: true,
      message: "All Food Fetched Successfully",
      foodItems,
    });
  } catch (error) {
    console.error("Get Food Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error. Unable to fetch food items.",
    });
  }
}

module.exports = { createFood, getFoodItems };
