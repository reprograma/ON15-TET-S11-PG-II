const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const drinksRoutes = require("./routes/drinksRoutes.js");

app.use("/sangriadrinks", drinksRoutes);

module.exports = app

