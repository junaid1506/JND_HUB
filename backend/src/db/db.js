const mongoose = require("mongoose");

function connectDb() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.error("DB connection error:", err);
    });
}

module.exports = connectDb;
