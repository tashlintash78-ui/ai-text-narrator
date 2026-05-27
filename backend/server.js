require("dotenv").config();

const express = require("express");
const cors = require("cors");

const narratorRoutes = require("./routes/narratorRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", narratorRoutes);

app.listen(5000, () => {
  console.log("Server running");
});