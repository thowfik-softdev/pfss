const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("./dbConnect");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api", userRoutes);

app.listen(5000, () => console.log("Server is running on the port 5000..."));
