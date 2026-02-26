const foodPartnerModel = require("../models/foodpartner.model");
const foodModel = require("../models/food.model");

async function getFoodPartnerById(req, res) {
  const foodPartnerId = req.params.id;
  console.log(foodPartnerId);
  const foodPartner = await foodPartnerModel.findById(foodPartnerId);
  const foodItems = await foodModel.find({ foodPartner: foodPartnerId });

  if (!foodPartner) {
    return res.status(404).json({
      message: "Food Partner not found",
    });
  }
  res.status(200).json({
    partner: foodPartner,
    foods: foodItems,
  });
}

module.exports = {
  getFoodPartnerById,
};
