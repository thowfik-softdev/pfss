const mongoose = require("mongoose");

  mongoose.connect("mongodb://localhost:27017", {
    dbName: "UserDetails"
  });

// To check the database is connected to the backend
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

module.exports = db;
