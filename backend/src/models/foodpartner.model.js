const mongoose = require("mongoose");

const foodpartnerSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
    },

    contactPerson: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const foodpartnerModel = mongoose.model("foodpartner", foodpartnerSchema);
module.exports = foodpartnerModel;
