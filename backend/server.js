const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]); // Forces Node to use Google and Cloudflare DNS
// Start Servers
const mongoose = require("mongoose");
const app = require("./src/app");
const connectDb = require("./src/db/db");

connectDb();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
