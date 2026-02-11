const mongoose = require("mongoose");

function connectDb() {
  mongoose
    .connect(
      "mongodb+srv://root:root@cluster0.mmtvrxq.mongodb.net/jndhub?appName=Cluster0",
    )
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.error("DB connection error:", err);
    });
}

module.exports = connectDb;
